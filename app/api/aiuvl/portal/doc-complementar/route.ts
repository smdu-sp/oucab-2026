import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/aiuvl";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { periodoDocComplementarAbertoAiuvl, periodoDocComplementarEleitorAbertoAiuvl } from "@/lib/config";

const MAX_ARQUIVO = 50 * 1024 * 1024;
const MAX_TOTAL   = 200 * 1024 * 1024;

async function getInscricao(usuarioId: string) {
  const candidatura = await db.candidatura.findFirst({
    where: { usuarioId },
    orderBy: { rodada: "desc" },
    select: {
      id: true,
      status: true,
      arquivos: {
        where: { categoria: "COMPLEMENTAR" },
        select: { id: true, nome: true, tamanho: true, criadoEm: true },
        orderBy: { criadoEm: "asc" },
      },
    },
  });
  if (candidatura) return { tipo: "candidatura" as const, inscricao: candidatura };

  const eleitor = await db.eleitor.findUnique({
    where: { usuarioId },
    select: {
      id: true,
      status: true,
      arquivos: {
        where: { categoria: "COMPLEMENTAR" },
        select: { id: true, nome: true, tamanho: true, criadoEm: true },
        orderBy: { criadoEm: "asc" },
      },
    },
  });
  if (eleitor) return { tipo: "eleitor" as const, inscricao: eleitor };

  return null;
}

function getPeriodoAberto(tipo: "candidatura" | "eleitor"): boolean {
  return tipo === "candidatura"
    ? periodoDocComplementarAbertoAiuvl()
    : periodoDocComplementarEleitorAbertoAiuvl();
}

export async function GET() {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const resultado = await getInscricao(session.user.id as string);
  if (!resultado) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  return NextResponse.json({
    status: resultado.inscricao.status,
    periodoAberto: getPeriodoAberto(resultado.tipo),
    arquivos: resultado.inscricao.arquivos,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const resultado = await getInscricao(session.user.id as string);
  if (!resultado) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  if (!getPeriodoAberto(resultado.tipo)) {
    return NextResponse.json({ error: "Fora do período de envio de documentação complementar." }, { status: 400 });
  }

  if (resultado.inscricao.status !== "INDEFERIDO") {
    return NextResponse.json({ error: "Sua inscrição não está indeferida. Não é possível enviar documentação complementar." }, { status: 400 });
  }

  const formData = await request.formData();
  const files = formData.getAll("arquivos") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  for (const file of files) {
    if (file.size > MAX_ARQUIVO) {
      return NextResponse.json({ error: `O arquivo "${file.name}" excede o limite de 50 MB.` }, { status: 400 });
    }
    const tipo = file.type;
    if (!tipo.startsWith("image/") && tipo !== "application/pdf") {
      return NextResponse.json({ error: `O arquivo "${file.name}" não é uma imagem ou PDF.` }, { status: 400 });
    }
  }

  const tamanhoExistente = resultado.inscricao.arquivos.reduce((sum, a) => sum + a.tamanho, 0);
  const tamanhoNovos = files.reduce((sum, f) => sum + f.size, 0);
  if (tamanhoExistente + tamanhoNovos > MAX_TOTAL) {
    return NextResponse.json({ error: "O tamanho total dos arquivos ultrapassa 200 MB." }, { status: 400 });
  }

  const pasta = resultado.tipo === "candidatura"
    ? `candidatura-${resultado.inscricao.id}`
    : `eleitor-${resultado.inscricao.id}`;
  const uploadDir = join(process.cwd(), "uploads", "aiuvl", pasta, "complementar");
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

  const criados = [];
  for (const file of files) {
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
    const caminho = join(uploadDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await file.arrayBuffer()));

    const data =
      resultado.tipo === "candidatura"
        ? { nome: file.name, tipo: file.type, tamanho: file.size, caminho, categoria: "COMPLEMENTAR" as const, candidaturaId: resultado.inscricao.id }
        : { nome: file.name, tipo: file.type, tamanho: file.size, caminho, categoria: "COMPLEMENTAR" as const, eleitorId: resultado.inscricao.id };

    const criado = await db.arquivo.create({ data });
    criados.push({ id: criado.id, nome: criado.nome, tamanho: criado.tamanho, criadoEm: criado.criadoEm });
  }

  return NextResponse.json({ criados });
}
