"use server";

import { cookies } from "next/headers";

export async function signOutAiusce() {
  (await cookies()).delete("aiusce.session-token");
}
