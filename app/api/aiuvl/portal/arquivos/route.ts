import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/aiuvl";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { CategoriaArquivo } from "@/lib/generated/aiuvl";
import { prazoCandidatosAiuvlEncerrado, prazoEleitoresAiuvlEncerrado, periodoDocComplementarAbertoAiuvl } from "@/lib/config";

// campo → categoria (full map for PUT uploads)
const CATEGORIA_MAP: Record<string, CategoriaArquivo> = {
  candEntRequerimento:          "CAND_ENT_REQUERIMENTO",
  candEntDeclaracaoAtuacao:     "CAND_ENT_DECLARACAO_ATUACAO",
  candEntEstatuto:              "CAND_ENT_ESTATUTO",
  candEntAtaEleicao:            "CAND_ENT_ATA_ELEICAO",
  candEntCnpj:                  "CAND_ENT_CNPJ",
  candEntDeclaracaoIdoneidade:  "CAND_ENT_DECLARACAO_IDONEIDADE",
  repIdentidade:                "CAND_REP_IDENTIDADE",
  repCpfDoc:                    "CAND_REP_CPF",
  repTituloEleitor:             "CAND_REP_TITULO_ELEITOR",
  repComprovanteResidencia:     "CAND_REP_COMPROVANTE_RESIDENCIA",
  titularIdentidade:            "CAND_CAN_IDENTIDADE",
  titularCpfDoc:                "CAND_CAN_CPF",
  titularFoto:                  "CAND_CAN_FOTO",
  titularTituloEleitor:         "CAND_CAN_TITULO_ELEITOR",
  titularResidencia:            "CAND_CAN_COMPROVANTE_RESIDENCIA",
  titularDeclaracao:            "CAND_CAN_DECLARACAO",
  suplenteIdentidade:           "CAND_CAN_IDENTIDADE",
  suplenteCpfDoc:               "CAND_CAN_CPF",
  suplenteFoto:                 "CAND_CAN_FOTO",
  suplenteTituloEleitor:        "CAND_CAN_TITULO_ELEITOR",
  suplenteResidencia:           "CAND_CAN_COMPROVANTE_RESIDENCIA",
  suplenteDeclaracao:           "CAND_CAN_DECLARACAO",
  eleitEntRequerimento:         "ELEIT_ENT_REQUERIMENTO",
  eleitEntDeclaracaoAtuacao:    "ELEIT_ENT_DECLARACAO_ATUACAO",
  eleitEntEstatuto:             "ELEIT_ENT_ESTATUTO",
  eleitEntAtaEleicao:           "ELEIT_ENT_ATA_ELEICAO",
  eleitEntCnpj:                 "ELEIT_ENT_CNPJ",
  eleitEntDeclaracaoIdoneidade: "ELEIT_ENT_DECLARACAO_IDONEIDADE",
  eleitRepIdentidade:           "ELEIT_REP_IDENTIDADE",
  eleitRepCpfDoc:               "ELEIT_REP_CPF",
  eleitRepTituloEleitor:        "ELEIT_REP_TITULO_ELEITOR",
  eleitRepResidencia:           "ELEIT_REP_COMPROVANTE_RESIDENCIA",
};

// Inverse maps per storage context (for GET reconstruction)
const ORG_CAND_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  CAND_ENT_REQUERIMENTO:         "candEntRequerimento",
  CAND_ENT_DECLARACAO_ATUACAO:   "candEntDeclaracaoAtuacao",
  CAND_ENT_ESTATUTO:             "candEntEstatuto",
  CAND_ENT_ATA_ELEICAO:          "candEntAtaEleicao",
  CAND_ENT_CNPJ:                 "candEntCnpj",
  CAND_ENT_DECLARACAO_IDONEIDADE:"candEntDeclaracaoIdoneidade",
};
const CAND_REP_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  CAND_REP_IDENTIDADE:            "repIdentidade",
  CAND_REP_CPF:                   "repCpfDoc",
  CAND_REP_TITULO_ELEITOR:        "repTituloEleitor",
  CAND_REP_COMPROVANTE_RESIDENCIA:"repComprovanteResidencia",
};
const TITULAR_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  CAND_CAN_IDENTIDADE:            "titularIdentidade",
  CAND_CAN_CPF:                   "titularCpfDoc",
  CAND_CAN_FOTO:                  "titularFoto",
  CAND_CAN_TITULO_ELEITOR:        "titularTituloEleitor",
  CAND_CAN_COMPROVANTE_RESIDENCIA:"titularResidencia",
  CAND_CAN_DECLARACAO:            "titularDeclaracao",
};
const SUPLENTE_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  CAND_CAN_IDENTIDADE:            "suplenteIdentidade",
  CAND_CAN_CPF:                   "suplenteCpfDoc",
  CAND_CAN_FOTO:                  "suplenteFoto",
  CAND_CAN_TITULO_ELEITOR:        "suplenteTituloEleitor",
  CAND_CAN_COMPROVANTE_RESIDENCIA:"suplenteResidencia",
  CAND_CAN_DECLARACAO:            "suplenteDeclaracao",
};
const ORG_ELEIT_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  ELEIT_ENT_REQUERIMENTO:         "eleitEntRequerimento",
  ELEIT_ENT_DECLARACAO_ATUACAO:   "eleitEntDeclaracaoAtuacao",
  ELEIT_ENT_ESTATUTO:             "eleitEntEstatuto",
  ELEIT_ENT_ATA_ELEICAO:          "eleitEntAtaEleicao",
  ELEIT_ENT_CNPJ:                 "eleitEntCnpj",
  ELEIT_ENT_DECLARACAO_IDONEIDADE:"eleitEntDeclaracaoIdoneidade",
};
const ELEIT_REP_TO_CAMPO: Partial<Record<CategoriaArquivo, string>> = {
  ELEIT_REP_IDENTIDADE:            "eleitRepIdentidade",
  ELEIT_REP_CPF:                   "eleitRepCpfDoc",
  ELEIT_REP_TITULO_ELEITOR:        "eleitRepTituloEleitor",
  ELEIT_REP_COMPROVANTE_RESIDENCIA:"eleitRepResidencia",
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

  const reg = (
    inversMap: Partial<Record<CategoriaArquivo, string>>,
    arquivos: { id: string; nome: string; tamanho: number; categoria: CategoriaArquivo }[],
  ) => {
    for (const arq of arquivos) {
      const campo = inversMap[arq.categoria];
      if (campo && !arquivosAtuais[campo]) {
        arquivosAtuais[campo] = { id: arq.id, nome: arq.nome, tamanho: arq.tamanho };
      }
    }
  };

  if (usuario.candidatura) {
    const cand = usuario.candidatura;
    reg(CAND_REP_TO_CAMPO, cand.arquivos);
    reg(ORG_CAND_TO_CAMPO, cand.organizacao?.arquivos ?? []);
    const titular = cand.candidatos.find((c) => c.tipoCandidato === "TITULAR");
    const suplente = cand.candidatos.find((c) => c.tipoCandidato === "SUPLENTE");
    if (titular) reg(TITULAR_TO_CAMPO, titular.arquivos);
    if (suplente) reg(SUPLENTE_TO_CAMPO, suplente.arquivos);
  }
  if (usuario.eleitor) {
    reg(ELEIT_REP_TO_CAMPO, usuario.eleitor.arquivos);
    reg(ORG_ELEIT_TO_CAMPO, usuario.eleitor.organizacao?.arquivos ?? []);
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

  const usuario = await db.usuario.findUnique({
    where: { id: session.user.id as string },
    include: {
      candidatura: {
        include: { organizacao: true, candidatos: true },
      },
      eleitor: {
        include: { organizacao: true },
      },
    },
  });

  if (!usuario) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const candidatura = usuario.candidatura;
  const eleitor = usuario.eleitor;

  const isCandidato = !!candidatura;
  const statusAtual = candidatura?.status ?? eleitor?.status;

  if (statusAtual === "DEFERIDO") {
    return NextResponse.json({ error: "Inscrição deferida. Não é possível alterar documentos." }, { status: 400 });
  }

  const prazoEncerrado = isCandidato ? prazoCandidatosAiuvlEncerrado() : prazoEleitoresAiuvlEncerrado();
  if (prazoEncerrado) {
    if (!periodoDocComplementarAbertoAiuvl() || statusAtual !== "INDEFERIDO") {
      return NextResponse.json({ error: "Prazo de envio de documentos encerrado." }, { status: 400 });
    }
  }

  const formData = await request.formData();
  const uploadDir = join(
    process.cwd(), "uploads", "aiuvl",
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
      const isCandEnt = categoria.startsWith("CAND_ENT_");
      const isCandRep = categoria.startsWith("CAND_REP_");
      const isTitular = campo.startsWith("titular");
      const isSuplente = campo.startsWith("suplente");

      if (isCandEnt && candidatura.organizacao) {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { orgCandidataId: candidatura.organizacao!.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, orgCandidataId: candidatura.organizacao!.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      } else if (isCandRep) {
        await db.$transaction(async (tx) => {
          await tx.arquivo.deleteMany({ where: { candidaturaId: candidatura.id, categoria } });
          const criado = await tx.arquivo.create({
            data: { nome: value.name, tipo: value.type, tamanho: value.size, caminho, candidaturaId: candidatura.id, categoria },
          });
          atualizados[campo] = { id: criado.id, nome: criado.nome, tamanho: criado.tamanho };
        });
      } else if (isTitular || isSuplente) {
        const tipo = isTitular ? "TITULAR" : "SUPLENTE";
        const candidato = candidatura.candidatos.find((c) => c.tipoCandidato === tipo);
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
