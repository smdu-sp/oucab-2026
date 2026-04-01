/** @format */

import { db } from "@/lib/prisma";
import { verificarSenha } from "@/lib/password";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        login: {},
        senha: {},
      },
      authorize: async (credentials) => {
        const { login, senha } = credentials ?? {};
        if (!login || !senha) return null;

        // Tenta encontrar usuário INTERNO pelo campo login
        const buscarUsuario = await db.usuario.findFirst({ 
          where: {
            OR: [{
              login: login as string,
            }, {
              email: login as string,
            }]
          }
        });
        if (buscarUsuario) {
          if (process.env.ENVIRONMENT !== "local") {
            if (buscarUsuario.tipo === "INTERNO") {
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
            if (buscarUsuario.tipo === "EXTERNO" && buscarUsuario.senha) {
              const senhaCorreta = await verificarSenha(senha as string, buscarUsuario.senha);
              if (!senhaCorreta) return null;
            }
          }
          return {
            id: buscarUsuario.id,
            email: buscarUsuario.email,
            nome: buscarUsuario.nome,
            login: buscarUsuario.login || undefined,
            permissao: buscarUsuario.permissao ?? undefined,
            avatar: buscarUsuario.avatar || undefined,
            status: buscarUsuario.status,
            tipo: buscarUsuario.tipo === "INTERNO" ? ("admin" as const) : ("externo" as const),
          };
        }

        return null;
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
        token.cnpj = user.cnpj;
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
      session.user.cnpj = token.cnpj;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
};
