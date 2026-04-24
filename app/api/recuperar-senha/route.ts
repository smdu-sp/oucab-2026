/** @format */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { gerarSenha, hashSenha } from "@/lib/password";
import { sendEmail, emailRecuperacaoSenha } from "@/lib/email";

const RESPOSTA_PADRAO = {
  message:
    "Caso esse e-mail esteja cadastrado, você receberá uma mensagem com a nova senha.",
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: RESPOSTA_PADRAO.message });
    }

    const usuario = await db.usuario.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, nome: true, email: true, tipo: true, senha: true },
    });

    // Resposta neutra independente de o usuário existir
    if (!usuario || usuario.tipo !== "EXTERNO" || !usuario.senha) {
      return NextResponse.json(RESPOSTA_PADRAO);
    }

    const novaSenha = gerarSenha();
    const hash = await hashSenha(novaSenha);

    await db.usuario.update({
      where: { id: usuario.id },
      data: { senha: hash, primeiroAcesso: true },
    });

    const portalUrl = `${process.env.APP_URL ?? ""}/oucab/login`;
    const { html, text } = emailRecuperacaoSenha({
      nome: usuario.nome,
      senha: novaSenha,
      portalUrl,
      sistemaLabel: "OUCAB 2026",
    });

    await sendEmail({
      to: usuario.email,
      subject: "Recuperação de senha — OUCAB 2026",
      html,
      text,
    });

    return NextResponse.json(RESPOSTA_PADRAO);
  } catch (error) {
    console.error("[recuperar-senha]", error);
    // Retorna resposta neutra mesmo em caso de erro interno
    return NextResponse.json(RESPOSTA_PADRAO);
  }
}
