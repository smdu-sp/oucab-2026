/** @format */

import NextAuth from 'next-auth';
import { authConfig } from './config';

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
	session: { strategy: 'jwt' },
	basePath: '/api/auth',
	cookies: { sessionToken: { name: 'oucab.session-token' } },
	...authConfig,
});
