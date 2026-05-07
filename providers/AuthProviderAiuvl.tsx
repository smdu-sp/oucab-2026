'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AuthProviderAiuvl({ children }: { children: ReactNode }) {
  return (
    <SessionProvider basePath="/api/auth-aiuvl">
      {children}
    </SessionProvider>
  );
}
