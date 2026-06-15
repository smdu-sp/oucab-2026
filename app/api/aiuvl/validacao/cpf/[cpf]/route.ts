import { NextRequest, NextResponse } from "next/server";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ cpf: string }> },
) {
  try {
    const { cpf } = await context.params;
    if (!cpf) {
      return NextResponse.json({ error: "CPF é obrigatório" }, { status: 400 });
    }

    const cpfLimpo = cpf.replace(/[^\d]/g, "");

    // Verifica apenas na rodada atual (permite re-inscrição de candidatos de rodadas anteriores)
    const { AIUVL_RODADA_CANDIDATOS } = await import("@/lib/config");
    const candidatoExistente = await db.candidato.findFirst({
      where: { cpf: cpfLimpo, candidatura: { rodada: AIUVL_RODADA_CANDIDATOS } },
    });
    const existente = !!candidatoExistente;

    return NextResponse.json({
      disponivel: !existente,
      message: existente ? "CPF já cadastrado" : "CPF disponível",
    });
  } catch (error) {
    console.error("Erro ao validar CPF:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
