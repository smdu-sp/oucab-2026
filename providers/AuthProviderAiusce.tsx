'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AuthProviderAiusce({ children }: { children: ReactNode }) {
	return (
		<SessionProvider basePath="/api/auth-aiusce">
			{children}
		</SessionProvider>
	);
}
