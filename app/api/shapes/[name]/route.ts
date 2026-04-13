import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import JSZip from "jszip";

const ALLOWED_SHAPES = ["perimetro_adesao", "perimetro_expandido"];

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;

  if (!ALLOWED_SHAPES.includes(name)) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  try {
    const shapesDir = join(process.cwd(), "public", "shapes");
    let kmlContent: string | null = null;

    // Tenta KML direto primeiro, depois KMZ
    try {
      kmlContent = await readFile(join(shapesDir, `${name}.kml`), "utf-8");
    } catch {
      const fileBuffer = await readFile(join(shapesDir, `${name}.kmz`));
      const zip = await JSZip.loadAsync(fileBuffer);
      for (const filename of Object.keys(zip.files)) {
        if (filename.endsWith(".kml")) {
          kmlContent = await zip.files[filename].async("string");
          break;
        }
      }
    }

    if (!kmlContent) {
      return NextResponse.json({ error: "KML não encontrado" }, { status: 500 });
    }

    return new NextResponse(kmlContent, {
      headers: {
        "Content-Type": "application/vnd.google-earth.kml+xml",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar shape:", error);
    return NextResponse.json({ error: "Erro ao carregar arquivo de perímetro" }, { status: 500 });
  }
}
