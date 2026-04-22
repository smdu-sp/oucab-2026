import { auth } from "@/auth/aiusce";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ login: string }> },
) {
  const session = await auth();
  if (!session) return Response.json({ error: "Não autorizado" }, { status: 401 });
  const { login } = await params;
  return fetch(`${process.env.AUTH_SERVER}ldap/buscar-por-login/${login}?secretarias=SMUL,SPURBANISMO`);
}
