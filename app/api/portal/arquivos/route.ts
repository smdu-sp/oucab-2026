import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { PRAZO_INSCRICAO } from "@/lib/config";

async function getCandidatura(usuarioId: string) {
  return db.candidatura.findUnique({
    where: { usuarioId },
    select: { id: true, status: true },
  });
}

export async function GET() {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  const arquivos = await db.arquivo.findMany({
    where: { candidaturaId: candidatura.id },
    select: { id: true, nome: true, tamanho: true },
  });

  return NextResponse.json({ arquivos, status: candidatura.status });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (new Date() > PRAZO_INSCRICAO) {
    return NextResponse.json({ error: "Prazo de inscrições encerrado." }, { status: 400 });
  }

  const candidatura = await getCandidatura(session.user.id as string);
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
  if (candidatura.status === "DEFERIDO") {
    return NextResponse.json({ error: "Inscrição deferida. Não é possível alterar documentos." }, { status: 400 });
  }

  const formData = await request.formData();
  const arquivos: File[] = [];
  let index = 0;
  while (formData.get(`arquivos[${index}]`)) {
    const f = formData.get(`arquivos[${index}]`) as File;
    if (f && f.size > 0) arquivos.push(f);
    index++;
  }

  if (arquivos.length === 0) return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  if (arquivos.length > 10) return NextResponse.json({ error: "Máximo de 10 arquivos permitidos." }, { status: 400 });
  const totalSize = arquivos.reduce((s, f) => s + f.size, 0);
  if (totalSize > 250 * 1024 * 1024) return NextResponse.json({ error: "Tamanho total excede 250 MB." }, { status: 400 });

  const uploadDir = join(process.cwd(), "uploads", candidatura.id);
  try { await rm(uploadDir, { recursive: true, force: true }); } catch {}

  if (!existsSync(join(process.cwd(), "uploads"))) {
    await mkdir(join(process.cwd(), "uploads"), { recursive: true });
  }
  await mkdir(uploadDir, { recursive: true });

  const novosArquivos: { nome: string; tipo: string; tamanho: number; caminho: string }[] = [];
  for (const arquivo of arquivos) {
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${arquivo.name}`;
    const caminho = join(uploadDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await arquivo.arrayBuffer()));
    novosArquivos.push({ nome: arquivo.name, tipo: arquivo.type, tamanho: arquivo.size, caminho });
  }

  await db.arquivo.deleteMany({ where: { candidaturaId: candidatura.id } });
  const criados = await Promise.all(
    novosArquivos.map((a) =>
      db.arquivo.create({ data: { ...a, candidaturaId: candidatura.id, categoria: "OUTRO" } })
    )
  );

  return NextResponse.json({ arquivos: criados.map(({ id, nome, tamanho }) => ({ id, nome, tamanho })) });
}
