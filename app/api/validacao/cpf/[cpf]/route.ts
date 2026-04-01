import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ cpf: string }> }
) {
  try {
    const { cpf } = await context.params;
    if (!cpf) {
      return NextResponse.json(
        { error: "CPF é obrigatório" },
        { status: 400 }
      );
    }

    // Remove formatação do CPF
    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF já existe no banco (eleitor ou candidato)
    const eleitorExistente = await db.eleitor.findUnique({ where: { cpf: cpfLimpo } });
    const candidatoExistente = await db.candidato.findUnique({ where: { cpf: cpfLimpo } });
    const existente = !!eleitorExistente || !!candidatoExistente;

    return NextResponse.json({
      disponivel: !existente,
      message: existente ? "CPF já cadastrado" : "CPF disponível"
    });

  } catch (error) {
    console.error("Erro ao validar CPF:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}