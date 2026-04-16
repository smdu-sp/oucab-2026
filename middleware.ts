import { auth as oucabAuth } from "@/auth/middleware-oucab";
import { auth as aiusceAuth } from "@/auth/middleware-aiusce";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware OUCAB — protege /oucab/portal/*, /oucab/candidaturas/*, /oucab/usuarios/*, /oucab/perfil/*
const oucabMiddleware = oucabAuth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Área do inscrito (externo)
  if (pathname.startsWith("/oucab/portal")) {
    if (!session || session.user?.tipo !== "externo") {
      return NextResponse.redirect(new URL("/oucab/login", req.url));
    }
    if (session.user?.primeiroAcesso && pathname !== "/oucab/portal/alterar-senha") {
      return NextResponse.redirect(new URL("/oucab/portal/alterar-senha", req.url));
    }
  }

  // Área admin OUCAB
  if (
    pathname.startsWith("/oucab/candidaturas") ||
    pathname.startsWith("/oucab/usuarios") ||
    pathname.startsWith("/oucab/perfil")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/oucab/login", req.url));
    }
  }

  // Redireciona login já autenticado
  if (pathname === "/oucab/login" && session) {
    if (session.user?.tipo === "externo") {
      if (session.user?.primeiroAcesso) {
        return NextResponse.redirect(new URL("/oucab/portal/alterar-senha", req.url));
      }
      return NextResponse.redirect(new URL("/oucab/portal/minha-inscricao", req.url));
    }
    return NextResponse.redirect(new URL("/oucab/usuarios", req.url));
  }

  return NextResponse.next();
});

// Middleware AIUSCE — protege /aiusce/portal/*, /aiusce/candidaturas/*, /aiusce/eleitores/*
const aiusceMiddleware = aiusceAuth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/aiusce/portal")) {
    if (!session || session.user?.tipo !== "externo") {
      return NextResponse.redirect(new URL("/aiusce/login", req.url));
    }
    if (session.user?.primeiroAcesso && pathname !== "/aiusce/portal/alterar-senha") {
      return NextResponse.redirect(new URL("/aiusce/portal/alterar-senha", req.url));
    }
  }

  if (
    pathname.startsWith("/aiusce/candidaturas") ||
    pathname.startsWith("/aiusce/eleitores") ||
    pathname.startsWith("/aiusce/usuarios")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/aiusce/login", req.url));
    }
    const permissao = session.user?.permissao;
    if (!permissao || !["DEV", "ADM"].includes(permissao.toString())) {
      return NextResponse.redirect(new URL("/aiusce/login", req.url));
    }
  }

  if (pathname === "/aiusce/login" && session) {
    const permissao = session.user?.permissao;
    if (permissao && ["DEV", "ADM"].includes(permissao.toString())) {
      return NextResponse.redirect(new URL("/aiusce/candidaturas", req.url));
    }
    if (session.user?.tipo === "externo") {
      if (session.user?.primeiroAcesso) {
        return NextResponse.redirect(new URL("/aiusce/portal/alterar-senha", req.url));
      }
      return NextResponse.redirect(new URL("/aiusce/portal/minha-inscricao", req.url));
    }
    // Autenticado mas sem permissão adequada — limpa a sessão AIUSCE
    const res = NextResponse.redirect(new URL("/aiusce/login", req.url));
    res.cookies.delete("aiusce.session-token");
    return res;
  }

  return NextResponse.next();
});

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/aiusce/portal") ||
    pathname.startsWith("/aiusce/candidaturas") ||
    pathname.startsWith("/aiusce/eleitores") ||
    pathname.startsWith("/aiusce/usuarios") ||
    pathname === "/aiusce/login"
  ) {
    return (aiusceMiddleware as any)(req);
  }
  return (oucabMiddleware as any)(req);
}

export const config = {
  matcher: [
    "/oucab/portal/:path*",
    "/oucab/candidaturas/:path*",
    "/oucab/usuarios/:path*",
    "/oucab/perfil/:path*",
    "/oucab/login",
    "/aiusce/portal/:path*",
    "/aiusce/candidaturas/:path*",
    "/aiusce/eleitores/:path*",
    "/aiusce/usuarios/:path*",
    "/aiusce/login",
  ],
};
