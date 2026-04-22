import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import type { Permissao } from "@/lib/generated/aiusce";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return Response.json({ error: "Não autorizado" }, { status: 401 });

  const admin = await db.usuario.findUnique({ where: { id: session.user?.id } });
  if (!admin?.permissao || !["DEV", "ADM"].includes(admin.permissao)) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { email, login, nome, permissao } = await request.json();
  if (!login || !nome || !email) {
    return Response.json({ error: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const usuarioNovo = await db.usuario.upsert({
    where: { login },
    create: { email, login, nome, permissao: (permissao as Permissao) ?? "ADM", tipo: "INTERNO" },
    update: { permissao: permissao as Permissao },
  });

  return Response.json({ usuarioNovo }, { status: 201 });
}
