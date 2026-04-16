import { NextResponse } from "next/server";
import { dbAiusce as db } from "@/lib/prisma-aiusce";

// Consulta pública do status de inscrição por CPF
export async function GET(
  _request: Request,
  context: { params: Promise<{ cpf: string }> }
) {
  try {
    const { cpf } = await context.params;
    const cpfLimpo = (cpf || "").replace(/\D/g, "");

    if (!cpfLimpo || cpfLimpo.length !== 11) {
      return NextResponse.json(
        { message: "CPF inválido", found: false },
        { status: 400 }
      );
    }

    const candidato = await db.candidato.findUnique({
      where: { cpf: cpfLimpo },
      select: {
        cpf: true,
        nome: true,
        candidatura: {
          select: { status: true, criadoEm: true, atualizadoEm: true },
        },
      },
    });

    if (!candidato) {
      return NextResponse.json({ found: false, status: null }, { status: 404 });
    }

    return NextResponse.json(
      {
        found: true,
        cpf: candidato.cpf,
        nome: candidato.nome,
        status: candidato.candidatura.status,
        criadoEm: candidato.candidatura.criadoEm,
        atualizadoEm: candidato.candidatura.atualizadoEm,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao consultar CPF:", error);
    return NextResponse.json(
      { message: "Erro interno ao consultar CPF" },
      { status: 500 }
    );
  }
}
