import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/aiuvl";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import { periodoDocComplementarAbertoAiuvl, periodoDocComplementarEleitorAbertoAiuvl } from "@/lib/config";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ arquivoId: string }> },
) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { arquivoId } = await params;
  const usuarioId = session.user.id as string;

  const candidatura = await db.candidatura.findUnique({
    where: { usuarioId },
    select: { id: true },
  });
  const eleitor = candidatura
    ? null
    : await db.eleitor.findUnique({ where: { usuarioId }, select: { id: true } });

  if (!candidatura && !eleitor) {
    return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
  }

  const periodoAberto = candidatura
    ? periodoDocComplementarAbertoAiuvl()
    : periodoDocComplementarEleitorAbertoAiuvl();

  if (!periodoAberto) {
    return NextResponse.json({ error: "Fora do período de envio. Não é possível excluir arquivos." }, { status: 400 });
  }

  const arquivo = await db.arquivo.findUnique({ where: { id: arquivoId } });
  const pertence = candidatura
    ? arquivo?.candidaturaId === candidatura.id
    : arquivo?.eleitorId === eleitor!.id;

  if (!arquivo || !pertence || arquivo.categoria !== "COMPLEMENTAR") {
    return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }

  await db.arquivo.delete({ where: { id: arquivoId } });
  if (existsSync(arquivo.caminho)) {
    await unlink(arquivo.caminho).catch(console.error);
  }

  return NextResponse.json({ ok: true });
}
