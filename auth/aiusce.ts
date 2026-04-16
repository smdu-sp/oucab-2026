import NextAuth from 'next-auth';
import { authAiusceConfig } from './aiusce-config';

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
	session: { strategy: 'jwt' },
	basePath: '/api/auth-aiusce',
	cookies: { sessionToken: { name: 'aiusce.session-token' } },
	...authAiusceConfig,
});
