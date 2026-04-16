/**
 * Instância leve de auth para uso exclusivo no middleware.
 * Não importa providers nem banco de dados — só verifica o JWT.
 */
import NextAuth from 'next-auth';

export const { auth } = NextAuth({
	session: { strategy: 'jwt' },
	basePath: '/api/auth',
	cookies: { sessionToken: { name: 'oucab.session-token' } },
	providers: [],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.tipo = user.tipo;
				token.id = user.id;
				token.nome = user.nome;
				token.primeiroAcesso = user.primeiroAcesso;
			}
			return token;
		},
		async session({ session, token }: any) {
			session.user.tipo = token.tipo;
			session.user.id = token.id;
			session.user.nome = token.nome;
			session.user.primeiroAcesso = token.primeiroAcesso;
			return session;
		},
	},
	trustHost: true,
});
