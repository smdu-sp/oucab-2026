import { NextRequest, NextResponse } from "next/server";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "ID do arquivo é obrigatório" }, { status: 400 });
    }

    const arquivo = await db.arquivo.findUnique({ where: { id } });
    if (!arquivo) {
      return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
    }

    let filePath = arquivo.caminho;
    const normalized = filePath.replace(/\\/g, "/");
    const parts = normalized.split("/uploads/");
    if (parts.length > 1) {
      filePath = join(process.cwd(), "uploads", parts[1]);
    }
    const buffer = await readFile(filePath);

    const headers = new Headers();
    const tipo = arquivo.tipo || "application/octet-stream";
    const inline = tipo.startsWith("image/") || tipo === "application/pdf";
    headers.set("Content-Type", tipo);
    headers.set(
      "Content-Disposition",
      `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(arquivo.nome)}"`
    );

    return new NextResponse(buffer as unknown as BodyInit, { status: 200, headers });
  } catch (error) {
    console.error("Erro ao baixar arquivo:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}