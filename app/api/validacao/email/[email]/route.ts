import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await context.params;
    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }
    const usuarioExistente = await db.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });
    return NextResponse.json({
      disponivel: !usuarioExistente,
      message: usuarioExistente ? "Email já cadastrado" : "Email disponível"
    });
  } catch (error) {
    console.error("Erro ao validar email:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}