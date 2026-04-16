import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { PRAZO_INSCRICAO_AIUSCE } from "@/lib/config";
import type { CategoriaArquivo } from "@/lib/generated/aiusce";

// Mapeia campo de formulário → categoria do banco AIUSCE
const CATEGORIA_MAP: Record<string, CategoriaArquivo> = {
  candEntRequerimento:         "CAND_ENT_REQUERIMENTO",
  candEntDeclaracaoAtuacao:    "CAND_ENT_DECLARACAO_ATUACAO",
  candEntEstatuto:             "CAND_ENT_ESTATUTO",
  candEntAtaEleicao:           "CAND_ENT_ATA_ELEICAO",
  candEntCnpj:                 "CAND_ENT_CNPJ",
  candEntDeclaracaoIdoneidade: "CAND_ENT_DECLARACAO_IDONEIDADE",
  titularIdentidade:           "CAND_REP_IDENTIDADE",
  titularTituloEleitor:        "CAND_REP_TITULO_ELEITOR",
  titularCpf:                  "CAND_REP_CPF",
  titularFoto:                 "CAND_REP_FOTO",
  titularNaoImpedimento:       "CAND_REP_NAO_IMPEDIMENTO",
  suplenteIdentidade:          "CAND_REP_IDENTIDADE",
  suplenteTituloEleitor:       "CAND_REP_TITULO_ELEITOR",
  suplenteCpf:                 "CAND_REP_CPF",
  suplenteFoto:                "CAND_REP_FOTO",
  suplenteNaoImpedimento:      "CAND_REP_NAO_IMPEDIMENTO",
  chapaRequerimento:           "CAND_CHAPA_REQUERIMENTO",
  eleitEntRequerimento:        "ELEIT_ENT_REQUERIMENTO",
  eleitEntDeclaracaoAtuacao:   "ELEIT_ENT_DECLARACAO_ATUACAO",
  eleitEntEstatuto:            "ELEIT_ENT_ESTATUTO",
  eleitEntAtaEleicao:          "ELEIT_ENT_ATA_ELEICAO",
  eleitEntCnpj:                "ELEIT_ENT_CNPJ",
  eleitEntDeclaracaoIdoneidade:"ELEIT_ENT_DECLARACAO_IDONEIDADE",
  eleitRepIdentidade:          "ELEIT_REP_IDENTIDADE",
  eleitRepTituloEleitor:       "ELEIT_REP_TITULO_ELEITOR",
  eleitRepCpf:                 "ELEIT_REP_CPF",
  eleitProcProcuracao:         "ELEIT_PROC_PROCURACAO",
  eleitProcRequerimento:       "ELEIT_PROC_REQUERIMENTO",
};

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const usuario = await db.usuario.findUnique({
    where: { id: session.user.id as string },
    include: {
      candidatura: {
        include: {
          organizacao: { include: { arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } } } },
          candidatos: { include: { arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } } } },
          arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } },
        },
      },
      eleitor: {
        include: {
          organizacao: { include: { arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } } } },
          arquivos: { select: { id: true, nome: true, tamanho: true, categoria: true } },
        },
      },
    },
  });

  if (!usuario) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const arquivosAtuais: Record<string, { id: string; nome: string; tamanho: number }> = {};

  // Reconstrói mapa campo → arquivo pela categoria (simplificado)
  const registrarArquivos = (
    arquivos: { id: string; nome: string; tamanho: number; categoria: CategoriaArquivo }[],
  ) => {
    for (const arq of arquivos) {
      const campo = Object.entries(CATEGORIA_MAP).find(([, cat]) => cat === arq.categoria)?.[0];
      if (campo && !arquivosAtuais[campo]) {
        arquivosAtuais[campo] = { id: arq.id, nome: arq.nome, tamanho: arq.tamanho };
      }
    }
  };

  if (usuario.candidatura) {
    registrarArquivos(usuario.candidatura.arquivos);
    registrarArquivos(usuario.candidatura.organizacao?.arquivos ?? []);
    for (const c of usuario.candidatura.candidatos) registrarArquivos(c.arquivos);
  }
  if (usuario.eleitor) {
    registrarArquivos(usuario.eleitor.arquivos);
    registrarArquivos(usuario.eleitor.organizacao?.arquivos ?? []);
  }

  return NextResponse.json({
    tipoInscricao: usuario.candidatura ? "CANDIDATO" : "ELEITOR",
    status: usuario.candidatura?.status ?? usuario.eleitor?.status,
    arquivosAtuais,
  });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  if (new Date() > PRAZO_INSCRICAO_AIUSCE) {
    return NextResponse.json({ error: "Prazo de inscrições encerrado." }, { status: 400 });
  }

  const usuario = await db.usuario.findUnique({
    where: { id: session.user.id as string },
    include: {
      candidatura: {
        include: {
          organizacao: true,
          candidatos: true,
        },
      },
      eleitor: {
        include: { organizacao: true },
      },
    },
  });

  if (!usuario) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const candidatura = usuario.candidatura;
  const eleitor = usuario.eleitor;

  if (candidatura?.status === "DEFERIDO" || eleitor?.status === "DEFERIDO") {
    return NextResponse.json({ error: "Inscrição deferida. Não é possível alterar documentos." }, { status: 400 });
  }

  const formData = await request.formData();
  const uploadDir = join(
    process.cwd(), "uploads", "aiusce",
    candidatura ? `candidatura-${candidatura.id}` : `eleitor-${eleitor?.id}`,
  );
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

  const atualizados: Record<string, { id: string; nome: string; tamanho: number }> = {};

  for (const [campo, value] of formData.entries()) {
    if (!(value instanceof File) || value.size === 0) continue;
    const categoria = CATEGORIA_MAP[campo];
    if (!categoria) continue;

    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).slice(2)}-${value.name}`;
    const caminho = join(uploadDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await value.arrayBuffer()));

    if (candidatura) {
      const isCandEntDoc = categoria.startsWith("CAND_ENT_") || categoria === "CAND_CHAPA_REQUERIMENTO";
      const isTitularDoc = campo.startsWith("titular");
      const isSuplenteDoc = campo.startsWith("suplente");

      if (isCandEntDoc && candidatura.organizacao) {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { orgCandidataId: candidatura.organizacao!.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, orgCandidataId: candidatura.organizacao!.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      } else if (campo === "chapaRequerimento") {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { candidaturaId: candidatura.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, candidaturaId: candidatura.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      } else {
        const candidato = candidatura.candidatos.find(c =>
          (isTitularDoc && c.tipoCandidato === "TITULAR") ||
          (isSuplenteDoc && c.tipoCandidato === "SUPLENTE"),
        );
        if (candidato) {
          await db.$transaction(async (tx) => {
            await tx.arquivo.deleteMany({ where: { candidatoId: candidato.id, categoria } });
            const criado = await tx.arquivo.create({
              data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, candidatoId: candidato.id, categoria },
            });
            atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
          });
        }
      }
    } else if (eleitor) {
      const isEntDoc = categoria.startsWith("ELEIT_ENT_");
      if (isEntDoc && eleitor.organizacao) {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { orgEleitoraId: eleitor.organizacao!.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, orgEleitoraId: eleitor.organizacao!.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      } else {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { eleitorId: eleitor.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, eleitorId: eleitor.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      }
    }
  }

  return NextResponse.json({ atualizados });
}
