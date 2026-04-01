import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Rotas do portal externo (/portal/* exceto /portal/login)
  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    if (!session || session.user?.tipo !== "externo") {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }
    // Força troca de senha no primeiro acesso (exceto se já está na página)
    if (session.user?.primeiroAcesso && pathname !== "/portal/alterar-senha") {
      return NextResponse.redirect(new URL("/portal/alterar-senha", req.url));
    }
  }

  // Se já está autenticado como votante e tenta acessar /portal/login, redireciona
  if (pathname === "/portal/login" && session?.user?.tipo === "externo") {
    if (session.user?.primeiroAcesso) {
      return NextResponse.redirect(new URL("/portal/alterar-senha", req.url));
    }
    return NextResponse.redirect(new URL("/portal/minha-inscricao", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*"],
};
