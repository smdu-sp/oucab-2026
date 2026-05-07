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

    const candidatoExistente = await db.candidato.findUnique({ where: { cpf: cpfLimpo } });
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
