import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import { periodoDocComplementarAbertoAiusce } from "@/lib/config";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ arquivoId: string }> },
) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!periodoDocComplementarAbertoAiusce()) {
    return NextResponse.json({ error: "Fora do período de envio. Não é possível excluir arquivos." }, { status: 400 });
  }

  const { arquivoId } = await params;

  const candidatura = await db.candidatura.findUnique({
    where: { usuarioId: session.user.id as string },
    select: { id: true },
  });
  if (!candidatura) return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });

  const arquivo = await db.arquivo.findUnique({ where: { id: arquivoId } });
  if (!arquivo || arquivo.candidaturaId !== candidatura.id || arquivo.categoria !== "COMPLEMENTAR") {
    return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }

  await db.arquivo.delete({ where: { id: arquivoId } });
  if (existsSync(arquivo.caminho)) {
    await unlink(arquivo.caminho).catch(console.error);
  }

  return NextResponse.json({ ok: true });
}
