import { NextRequest, NextResponse } from "next/server";
import { atualizarStatusCandidaturaAiuvl } from "@/services/candidaturas-aiuvl";
import type { Status } from "@/lib/generated/aiuvl";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const novoStatus = body.status as Status;
  const motivo = body.motivo as string | undefined;

  if (!["EM_ANALISE", "DEFERIDO", "INDEFERIDO"].includes(novoStatus)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const resultado = await atualizarStatusCandidaturaAiuvl(id, novoStatus, motivo);
  if (!resultado) {
    return NextResponse.json({ error: "Não foi possível atualizar o status" }, { status: 403 });
  }

  return NextResponse.json(resultado);
}
