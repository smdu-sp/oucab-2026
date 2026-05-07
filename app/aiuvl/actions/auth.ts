"use server";

import { signOut } from "@/auth/aiuvl";

export async function signOutAiuvl() {
  await signOut({ redirectTo: "/aiuvl/login" });
}
