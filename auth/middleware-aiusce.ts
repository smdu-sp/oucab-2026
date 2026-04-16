/**
 * Instância leve de auth para uso exclusivo no middleware.
 * Não importa providers nem banco de dados — só verifica o JWT.
 */
import NextAuth from 'next-auth';

export const { auth } = NextAuth({
	session: { strategy: 'jwt' },
	basePath: '/api/auth-aiusce',
	cookies: { sessionToken: { name: 'aiusce.session-token' } },
	providers: [],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.tipo = user.tipo;
				token.id = user.id;
				token.nome = user.nome;
				token.permissao = user.permissao;
				token.primeiroAcesso = user.primeiroAcesso;
			}
			return token;
		},
		async session({ session, token }: any) {
			session.user.tipo = token.tipo;
			session.user.id = token.id;
			session.user.nome = token.nome;
			session.user.permissao = token.permissao;
			session.user.primeiroAcesso = token.primeiroAcesso;
			return session;
		},
	},
	trustHost: true,
});
