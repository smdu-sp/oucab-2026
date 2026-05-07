"use server";

import { signIn } from "@/auth/aiuvl";
import { AuthError } from "next-auth";

export async function loginAiuvl(login: string, senha: string): Promise<{ error: string } | void> {
  try {
    await signIn("credentials", {
      login,
      senha,
      redirectTo: "/aiuvl/candidaturas",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciais incorretas." };
    }
    throw error;
  }
}
