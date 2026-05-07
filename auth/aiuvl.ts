import NextAuth from 'next-auth';
import { authAiuvlConfig } from './aiuvl-config';

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
	session: { strategy: 'jwt' },
	basePath: '/api/auth-aiuvl',
	cookies: { sessionToken: { name: 'aiuvl.session-token' } },
	...authAiuvlConfig,
});
