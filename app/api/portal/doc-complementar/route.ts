import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { periodoDocComplementarAberto, periodoDocComplementarEleitorAberto } from "@/lib/config";

const MAX_ARQUIVO         = 50 * 1024 * 1024;   // 50 MB por arquivo
const MAX_TOTAL_CANDIDATO = 200 * 1024 * 1024;  // 200 MB total — candidatos
const MAX_TOTAL_ELEITOR   = 100 * 1024 * 1024;  // 100 MB total — eleitores

async function getCandidatura(usuarioId: string) {
  return db.candidatura.findUnique({
    where: { usuarioId },
    select: {
      id: true,
      status: true,
      tipoCadastro: true,
      arquivos: {
        where: { categoria: "COMPLEMENTAR" },
        select: { id: true, nome: true, tamanho: true, criadoEm: true },
        orderBy: { criadoEm: "asc" },
      },
    },
  });
}

export async function GET() {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  const isEleitor = candidatura.tipoCadastro === "ELEITOR";
  const periodoAberto = isEleitor ? periodoDocComplementarEleitorAberto() : periodoDocComplementarAberto();

  return NextResponse.json({
    status: candidatura.status,
    periodoAberto,
    arquivos: candidatura.arquivos,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  const isEleitor = candidatura.tipoCadastro === "ELEITOR";
  const periodoAberto = isEleitor ? periodoDocComplementarEleitorAberto() : periodoDocComplementarAberto();

  if (!periodoAberto) {
    return NextResponse.json({ error: "Fora do período de envio de documentação complementar." }, { status: 400 });
  }

  if (!isEleitor && candidatura.status !== "AGUARDANDO_DOCUMENTACAO") {
    return NextResponse.json({ error: "Sua inscrição não está aguardando documentação complementar." }, { status: 400 });
  }

  if (isEleitor && candidatura.status !== "INDEFERIDO") {
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
    const isImagem = tipo.startsWith("image/");
    const isPdf = tipo === "application/pdf";
    const isZip = isEleitor && (
      tipo === "application/zip" ||
      tipo === "application/x-zip-compressed" ||
      tipo === "application/x-zip" ||
      file.name.toLowerCase().endsWith(".zip")
    );
    if (!isImagem && !isPdf && !isZip) {
      const msg = isEleitor
        ? `O arquivo "${file.name}" não é uma imagem, PDF ou ZIP.`
        : `O arquivo "${file.name}" não é uma imagem ou PDF.`;
      return NextResponse.json({ error: msg }, { status: 400 });
    }
  }

  const MAX_TOTAL = isEleitor ? MAX_TOTAL_ELEITOR : MAX_TOTAL_CANDIDATO;
  const limiteLabel = isEleitor ? "100 MB" : "200 MB";
  const tamanhoExistente = candidatura.arquivos.reduce((sum, a) => sum + a.tamanho, 0);
  const tamanhoNovos = files.reduce((sum, f) => sum + f.size, 0);
  if (tamanhoExistente + tamanhoNovos > MAX_TOTAL) {
    return NextResponse.json({ error: `O tamanho total dos arquivos ultrapassa ${limiteLabel}.` }, { status: 400 });
  }

  const uploadDir = join(process.cwd(), "uploads", candidatura.id, "complementar");
  if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

  const criados = [];
  for (const file of files) {
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
    const caminho = join(uploadDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await file.arrayBuffer()));
    const criado = await db.arquivo.create({
      data: {
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        caminho,
        categoria: "COMPLEMENTAR",
        candidaturaId: candidatura.id,
      },
    });
    criados.push({ id: criado.id, nome: criado.nome, tamanho: criado.tamanho, criadoEm: criado.criadoEm });
  }

  return NextResponse.json({ criados });
}
