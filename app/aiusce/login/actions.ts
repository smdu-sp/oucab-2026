"use server";

import { signIn } from "@/auth/aiusce";
import { AuthError } from "next-auth";

export async function loginAiusce(login: string, senha: string): Promise<{ error: string } | void> {
  try {
    await signIn("credentials", {
      login,
      senha,
      redirectTo: "/aiusce/candidaturas",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciais incorretas." };
    }
    // NEXT_REDIRECT precisa propagar para o Next.js processar o redirect
    throw error;
  }
}
