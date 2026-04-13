import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { PRAZO_INSCRICAO } from "@/lib/config";
import type { CategoriaArquivo } from "@prisma/client";

// Mapeia campo → (owner, categoria) — espelho do CATEGORIA_MAP da rota de inscrição
const CAMPO_OWNER_MAP: Record<string, { owner: "individual" | "titular" | "suplente" | "org"; categoria: CategoriaArquivo }> = {
  docRequerimento:          { owner: "individual", categoria: "REQUERIMENTO" },
  docIdentidade:            { owner: "individual", categoria: "DOCUMENTO_IDENTIDADE" },
  docCPF:                   { owner: "individual", categoria: "CPF" },
  docTituloEleitor:         { owner: "individual", categoria: "TITULO_ELEITOR" },
  docComprovante:           { owner: "individual", categoria: "COMPROVANTE_RESIDENCIA" },
  docFoto3x4:               { owner: "individual", categoria: "FOTO" },
  docDeclaracao:             { owner: "individual", categoria: "DECLARACAO" },
  orgDocRequerimento:       { owner: "org", categoria: "REQUERIMENTO" },
  orgDocDeclaracaoAtuacao:  { owner: "org", categoria: "DECLARACAO_ATUACAO" },
  orgDocEstatutoSocial:     { owner: "org", categoria: "ESTATUTO_SOCIAL" },
  orgDocAtaEleicao:         { owner: "org", categoria: "ATA_ELEICAO" },
  orgDocCertidaoCNPJ:       { owner: "org", categoria: "CERTIDAO_CNPJ" },
  orgDocComprovanteCNPJ:    { owner: "org", categoria: "OUTRO" },
  titularDocRequerimento:   { owner: "titular", categoria: "REQUERIMENTO" },
  titularDocIdentidade:     { owner: "titular", categoria: "DOCUMENTO_IDENTIDADE" },
  titularDocCPF:            { owner: "titular", categoria: "CPF" },
  titularDocTituloEleitor:  { owner: "titular", categoria: "TITULO_ELEITOR" },
  titularDocComprovante:    { owner: "titular", categoria: "COMPROVANTE_RESIDENCIA" },
  titularDocFoto3x4:        { owner: "titular", categoria: "FOTO" },
  titularDocDeclaracao:     { owner: "titular", categoria: "DECLARACAO" },
  suplenteDocRequerimento:  { owner: "suplente", categoria: "REQUERIMENTO" },
  suplenteDocIdentidade:    { owner: "suplente", categoria: "DOCUMENTO_IDENTIDADE" },
  suplenteDocCPF:           { owner: "suplente", categoria: "CPF" },
  suplenteDocTituloEleitor: { owner: "suplente", categoria: "TITULO_ELEITOR" },
  suplenteDocComprovante:   { owner: "suplente", categoria: "COMPROVANTE_RESIDENCIA" },
  suplenteDocFoto3x4:       { owner: "suplente", categoria: "FOTO" },
  suplenteDocDeclaracao:    { owner: "suplente", categoria: "DECLARACAO" },
};

// Mapeia (owner, categoria) → campo — para reconstruir o campo a partir do DB
const OWNER_CAT_TO_CAMPO: Record<string, string> = Object.fromEntries(
  Object.entries(CAMPO_OWNER_MAP).map(([campo, { owner, categoria }]) => [
    `${owner}:${categoria}`, campo,
  ])
);

async function getCandidaturaCompleta(usuarioId: string) {
  return db.candidatura.findUnique({
    where: { usuarioId },
    select: {
      id: true,
      status: true,
      tipoInscricao: true,
      candidatos: {
        select: {
          id: true,
          tipoCandidato: true,
          arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } },
        },
      },
      organizacao: {
        select: {
          id: true,
          arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } },
        },
      },
    },
  });
}

export async function GET() {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const candidatura = await getCandidaturaCompleta(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  // Reconstrói mapa campo → arquivo
  const arquivosAtuais: Record<string, { id: string; nome: string; tamanho: number }> = {};

  for (const candidato of candidatura.candidatos) {
    const ownerType =
      candidato.tipoCandidato === "TITULAR" ? "titular"
      : candidato.tipoCandidato === "SUPLENTE" ? "suplente"
      : "individual";

    for (const arq of candidato.arquivos) {
      const key = `${ownerType}:${arq.categoria}`;
      const campo = OWNER_CAT_TO_CAMPO[key];
      if (campo) arquivosAtuais[campo] = { id: arq.id, nome: arq.nome, tamanho: arq.tamanho };
    }
  }

  if (candidatura.organizacao) {
    for (const arq of candidatura.organizacao.arquivos) {
      const key = `org:${arq.categoria}`;
      const campo = OWNER_CAT_TO_CAMPO[key];
      if (campo) arquivosAtuais[campo] = { id: arq.id, nome: arq.nome, tamanho: arq.tamanho };
    }
  }

  return NextResponse.json({
    tipoInscricao: candidatura.tipoInscricao,
    status: candidatura.status,
    arquivosAtuais,
  });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (new Date() > PRAZO_INSCRICAO) {
    return NextResponse.json({ error: "Prazo de inscrições encerrado." }, { status: 400 });
  }

  const candidatura = await getCandidaturaCompleta(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
  if (candidatura.status === "DEFERIDO") {
    return NextResponse.json({ error: "Inscrição deferida. Não é possível alterar documentos." }, { status: 400 });
  }

  const individual = candidatura.candidatos.find((c) => c.tipoCandidato === "INDIVIDUAL");
  const titular    = candidatura.candidatos.find((c) => c.tipoCandidato === "TITULAR");
  const suplente   = candidatura.candidatos.find((c) => c.tipoCandidato === "SUPLENTE");
  const orgId      = candidatura.organizacao?.id;

  const formData = await request.formData();
  const uploadDir = join(process.cwd(), "uploads", candidatura.id);
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

  const atualizados: Record<string, { id: string; nome: string; tamanho: number }> = {};

  for (const [campo, value] of formData.entries()) {
    if (!(value instanceof File) || value.size === 0) continue;

    const mapeamento = CAMPO_OWNER_MAP[campo];
    if (!mapeamento) continue;

    const { owner, categoria } = mapeamento;

    // Resolve o ID do owner
    let candidatoId: string | undefined;
    let organizacaoId: string | undefined;
    if (owner === "individual") candidatoId = individual?.id;
    else if (owner === "titular") candidatoId = titular?.id;
    else if (owner === "suplente") candidatoId = suplente?.id;
    else if (owner === "org") organizacaoId = orgId;

    if (!candidatoId && !organizacaoId) continue; // owner não existe nesta inscrição

    // Salva arquivo no disco
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${value.name}`;
    const caminho = join(uploadDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await value.arrayBuffer()));

    // Substitui no banco: remove arquivo anterior com mesma (categoria, owner), cria novo
    await db.$transaction(async (tx) => {
      if (candidatoId) {
        await tx.arquivo.deleteMany({ where: { candidatoId, categoria } });
        const criado = await tx.arquivo.create({
          data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, candidatoId, categoria },
        });
        atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
      } else if (organizacaoId) {
        await tx.arquivo.deleteMany({ where: { organizacaoId, categoria } });
        const criado = await tx.arquivo.create({
          data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, organizacaoId, categoria },
        });
        atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
      }
    });
  }

  return NextResponse.json({ atualizados });
}
