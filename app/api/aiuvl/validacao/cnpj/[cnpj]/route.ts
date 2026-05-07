import { NextRequest, NextResponse } from "next/server";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";

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

    const orgCandidataExistente = await db.organizacaoCandidata.findUnique({
      where: { cnpj: cnpjLimpo },
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
