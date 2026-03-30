import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { PRAZO_INSCRICAO } from "@/lib/config";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.tipo !== "votante") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const votante = await db.votante.findUnique({
    where: { id: session.user?.id as string },
    select: { status: true, arquivos: { select: { id: true, nome: true, tamanho: true } } },
  });

  if (!votante) return NextResponse.json({ error: "Votante não encontrado" }, { status: 404 });

  return NextResponse.json({ arquivos: votante.arquivos, status: votante.status });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.tipo !== "votante") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (new Date() > PRAZO_INSCRICAO) {
    return NextResponse.json({ error: "Prazo de inscrições encerrado." }, { status: 400 });
  }

  const votanteId = session.user?.id as string;
  const votante = await db.votante.findUnique({ where: { id: votanteId }, select: { status: true } });

  if (!votante) return NextResponse.json({ error: "Votante não encontrado" }, { status: 404 });
  if (votante.status === "DEFERIDO") {
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
  if (arquivos.length > 5) return NextResponse.json({ error: "Máximo de 5 arquivos permitidos." }, { status: 400 });
  const totalSize = arquivos.reduce((s, f) => s + f.size, 0);
  if (totalSize > 30 * 1024 * 1024) return NextResponse.json({ error: "Tamanho total excede 30 MB." }, { status: 400 });

  // Remover arquivos antigos
  const votanteDir = join(process.cwd(), "uploads", votanteId);
  try { await rm(votanteDir, { recursive: true, force: true }); } catch {}

  if (!existsSync(join(process.cwd(), "uploads"))) {
    await mkdir(join(process.cwd(), "uploads"), { recursive: true });
  }
  await mkdir(votanteDir, { recursive: true });

  const novosArquivos: { nome: string; tipo: string; tamanho: number; caminho: string }[] = [];
  for (const arquivo of arquivos) {
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2)}-${arquivo.name}`;
    const caminho = join(votanteDir, nomeArquivo);
    await writeFile(caminho, Buffer.from(await arquivo.arrayBuffer()));
    novosArquivos.push({ nome: arquivo.name, tipo: arquivo.type, tamanho: arquivo.size, caminho });
  }

  await db.arquivo.deleteMany({ where: { votanteId } });
  const criados = await Promise.all(
    novosArquivos.map((a) => db.arquivo.create({ data: { ...a, votanteId } }))
  );

  return NextResponse.json({ arquivos: criados.map(({ id, nome, tamanho }) => ({ id, nome, tamanho })) });
}
