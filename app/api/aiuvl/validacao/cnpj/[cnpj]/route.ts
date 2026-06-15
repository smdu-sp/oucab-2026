import { NextRequest, NextResponse } from "next/server";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { AIUVL_RODADA_CANDIDATOS } from "@/lib/config";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ cnpj: string }> },
) {
  try {
    const { cnpj } = await context.params;
    if (!cnpj) {
      return NextResponse.json({ error: "CNPJ é obrigatório" }, { status: 400 });
    }

    const cnpjLimpo = cnpj.replace(/[^\d]/g, "");

    // Verifica apenas na rodada atual (permite re-inscrição de rodadas anteriores)
    const orgCandidataExistente = await db.organizacaoCandidata.findFirst({
      where: { cnpj: cnpjLimpo, candidatura: { rodada: AIUVL_RODADA_CANDIDATOS } },
    });
    const orgEleitoraExistente = await db.organizacaoEleitora.findUnique({
      where: { cnpj: cnpjLimpo },
    });

    const existente = !!(orgCandidataExistente || orgEleitoraExistente);

    return NextResponse.json({
      disponivel: !existente,
      message: existente ? "CNPJ já cadastrado" : "CNPJ disponível",
    });
  } catch (error) {
    console.error("Erro ao validar CNPJ:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
