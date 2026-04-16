"use server";

import { signOut } from "@/auth/aiusce";

export async function signOutAiusce() {
  await signOut({ redirectTo: "/aiusce/login" });
}
