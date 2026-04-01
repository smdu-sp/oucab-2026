import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { verificarSenha, hashSenha } from "@/lib/password";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.tipo !== "externo") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // session.user.id é o Usuario.id diretamente
  const usuarioId = session.user.id as string;
  const { senhaAtual, novaSenha } = await request.json();

  if (!senhaAtual || !novaSenha) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }
  if (novaSenha.length < 8) {
    return NextResponse.json({ error: "A nova senha deve ter pelo menos 8 caracteres." }, { status: 400 });
  }

  const usuario = await db.usuario.findUnique({
    where: { id: usuarioId },
    select: { senha: true },
  });
  if (!usuario?.senha) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  const senhaValida = await verificarSenha(senhaAtual, usuario.senha);
  if (!senhaValida) {
    return NextResponse.json({ error: "Senha atual incorreta." }, { status: 400 });
  }

  const novoHash = await hashSenha(novaSenha);
  await db.usuario.update({
    where: { id: usuarioId },
    data: { senha: novoHash, primeiroAcesso: false },
  });

  return NextResponse.json({ ok: true });
}
