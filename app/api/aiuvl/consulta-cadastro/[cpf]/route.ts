import { NextResponse } from "next/server";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";

export async function GET(
  _request: Request,
  context: { params: Promise<{ cpf: string }> },
) {
  try {
    const { cpf } = await context.params;
    const cpfLimpo = (cpf || "").replace(/\D/g, "");

    if (!cpfLimpo || cpfLimpo.length !== 11) {
      return NextResponse.json({ message: "CPF inválido", found: false }, { status: 400 });
    }

    const candidato = await db.candidato.findFirst({
      where: { cpf: cpfLimpo },
      orderBy: { candidatura: { rodada: "desc" } },
      select: {
        cpf: true,
        nome: true,
        candidatura: {
          select: { status: true, criadoEm: true, atualizadoEm: true },
        },
      },
    });

    if (candidato) {
      return NextResponse.json({
        found: true,
        tipo: "candidato",
        cpf: candidato.cpf,
        nome: candidato.nome,
        status: candidato.candidatura.status,
        criadoEm: candidato.candidatura.criadoEm,
        atualizadoEm: candidato.candidatura.atualizadoEm,
      });
    }

    const eleitor = await db.eleitor.findFirst({
      where: { organizacao: { repCpf: cpfLimpo } },
      select: {
        status: true,
        criadoEm: true,
        atualizadoEm: true,
        organizacao: { select: { repCpf: true, repNome: true } },
      },
    });

    if (eleitor) {
      return NextResponse.json({
        found: true,
        tipo: "eleitor",
        cpf: eleitor.organizacao?.repCpf ?? cpfLimpo,
        nome: eleitor.organizacao?.repNome ?? null,
        status: eleitor.status,
        criadoEm: eleitor.criadoEm,
        atualizadoEm: eleitor.atualizadoEm,
      });
    }

    return NextResponse.json({ found: false, status: null }, { status: 404 });
  } catch (error) {
    console.error("Erro ao consultar CPF:", error);
    return NextResponse.json({ message: "Erro interno ao consultar CPF" }, { status: 500 });
  }
}
