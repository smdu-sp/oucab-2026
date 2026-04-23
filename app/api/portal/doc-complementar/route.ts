import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { periodoDocComplementarAberto } from "@/lib/config";

const MAX_ARQUIVO = 50 * 1024 * 1024;   // 50 MB por arquivo
const MAX_TOTAL   = 200 * 1024 * 1024;  // 200 MB total

async function getCandidatura(usuarioId: string) {
  return db.candidatura.findUnique({
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
}

export async function GET() {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  return NextResponse.json({
    status: candidatura.status,
    periodoAberto: periodoDocComplementarAberto(),
    arquivos: candidatura.arquivos,
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!periodoDocComplementarAberto()) {
    return NextResponse.json({ error: "Fora do período de envio de documentação complementar." }, { status: 400 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
  if (candidatura.status !== "AGUARDANDO_DOCUMENTACAO") {
    return NextResponse.json({ error: "Sua inscrição não está aguardando documentação complementar." }, { status: 400 });
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

  const tamanhoExistente = candidatura.arquivos.reduce((sum, a) => sum + a.tamanho, 0);
  const tamanhoNovos = files.reduce((sum, f) => sum + f.size, 0);
  if (tamanhoExistente + tamanhoNovos > MAX_TOTAL) {
    return NextResponse.json({ error: "O tamanho total dos arquivos ultrapassa 200 MB." }, { status: 400 });
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
