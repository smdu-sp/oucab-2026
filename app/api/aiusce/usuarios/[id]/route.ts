import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import type { Permissao } from "@/lib/generated/aiusce";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Não autorizado" }, { status: 401 });

  const admin = await db.usuario.findUnique({ where: { id: session.user?.id } });
  if (!admin?.permissao || !["DEV", "ADM"].includes(admin.permissao)) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  const { id } = await params;
  const { permissao } = await request.json();

  const atualizado = await db.usuario.update({
    where: { id },
    data: { permissao: permissao as Permissao },
  });

  return Response.json(atualizado);
}
