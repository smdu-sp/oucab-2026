import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const { to, subject, html, text } = await request.json();
    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Campos obrigatórios: to, subject, html" }, { status: 400 });
    }
    await sendEmail({ to, subject, html, text });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[dev/email-test]", error);
    return NextResponse.json({ error: error?.message ?? "Erro interno" }, { status: 500 });
  }
}
