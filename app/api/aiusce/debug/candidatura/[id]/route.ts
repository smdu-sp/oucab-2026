import { NextRequest, NextResponse } from "next/server";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const usuario = await validaUsuarioAiusce();
  if (usuario?.permissao !== "DEV") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const { id } = await params;

  const candidatura = await db.candidatura.findUnique({
    where: { id },
    include: {
      organizacao: { include: { arquivos: true } },
      candidatos: { include: { arquivos: true } },
      arquivos: true,
    },
  });

  if (!candidatura) {
    return NextResponse.json({ error: "Candidatura não encontrada" }, { status: 404 });
  }

  return NextResponse.json({
    id: candidatura.id,
    status: candidatura.status,
    orgArquivosCount: candidatura.organizacao?.arquivos?.length ?? 0,
    orgArquivos: candidatura.organizacao?.arquivos?.map((a) => ({
      id: a.id,
      nome: a.nome,
      categoria: a.categoria,
      orgCandidataId: (a as any).orgCandidataId,
    })),
    candidaturaArquivosCount: candidatura.arquivos.length,
    candidaturaArquivos: candidatura.arquivos.map((a) => ({
      id: a.id,
      nome: a.nome,
      categoria: a.categoria,
    })),
    candidatos: candidatura.candidatos.map((c) => ({
      id: c.id,
      nome: c.nome,
      arquivosCount: c.arquivos.length,
      arquivos: c.arquivos.map((a) => ({ id: a.id, nome: a.nome, categoria: a.categoria })),
    })),
  });
}
