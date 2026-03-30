/** @format */

import { db } from "@/lib/prisma";
import { verificarSenha } from "@/lib/password";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    // Provider para usuários administrativos (LDAP)
    Credentials({
      id: "admin",
      name: "credentials",
      credentials: {
        login: {},
        senha: {},
      },
      authorize: async (credentials) => {
        const { login, senha } = credentials ?? {};
        if (!login || !senha) return null;
        const usuario = await db.usuario.findUnique({ where: { login: login as string } });
        if (!usuario || usuario.tipo !== "INTERNO") return null;
        if (process.env.ENVIRONMENT !== "local") {
          const response = await fetch(`${process.env.AUTH_SERVER}ldap/autenticar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: login as string, senha: senha as string }),
          });
          if (response.status !== 200) {
            const responseJson = await response.json();
            throw new Error(responseJson.message || "Erro ao autenticar usuário");
          }
        }
        return {
          id: usuario.id,
          email: usuario.email,
          nome: usuario.nome,
          login: usuario.login || undefined,
          permissao: usuario.permissao,
          avatar: usuario.avatar || undefined,
          status: usuario.status,
          tipo: "admin" as const,
        };
      },
    }),

    // Provider para votantes/candidatos (portal externo)
    Credentials({
      id: "votante",
      name: "portal",
      credentials: {
        cpf: {},
        senha: {},
      },
      authorize: async (credentials) => {
        const { cpf, senha } = credentials ?? {};
        if (!cpf || !senha) return null;
        const cpfLimpo = (cpf as string).replace(/\D/g, "");
        const votante = await db.votante.findUnique({
          where: { cpf: cpfLimpo },
          include: { usuario: true },
        });
        if (!votante || !votante.usuario || !votante.usuario.senha) return null;
        const senhaCorreta = await verificarSenha(senha as string, votante.usuario.senha);
        if (!senhaCorreta) return null;
        return {
          id: votante.id,
          email: votante.usuario.email,
          nome: votante.usuario.nome,
          cpf: votante.cpf,
          tipoCadastro: votante.tipoCadastro,
          tipoInscricao: votante.tipoInscricao,
          primeiroAcesso: votante.usuario.primeiroAcesso,
          status: votante.status,
          tipo: "votante" as const,
        };
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.tipo = user.tipo;
        token.id = user.id;
        token.email = user.email;
        token.nome = user.nome;
        // campos admin
        token.login = user.login;
        token.permissao = user.permissao;
        token.avatar = user.avatar;
        // campos votante
        token.cpf = user.cpf;
        token.tipoCadastro = user.tipoCadastro;
        token.tipoInscricao = user.tipoInscricao;
        token.primeiroAcesso = user.primeiroAcesso;
        token.status = user.status;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.user.tipo = token.tipo;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.nome = token.nome;
      // campos admin
      session.user.login = token.login;
      session.user.permissao = token.permissao;
      session.user.avatar = token.avatar;
      // campos votante
      session.user.cpf = token.cpf;
      session.user.tipoCadastro = token.tipoCadastro;
      session.user.tipoInscricao = token.tipoInscricao;
      session.user.primeiroAcesso = token.primeiroAcesso;
      session.user.status = token.status;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
};
