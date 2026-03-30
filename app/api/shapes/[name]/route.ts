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
    const filePath = join(process.cwd(), "public", "shapes", `${name}.kmz`);
    const fileBuffer = await readFile(filePath);
    const zip = await JSZip.loadAsync(fileBuffer);

    let kmlContent: string | null = null;
    for (const filename of Object.keys(zip.files)) {
      if (filename.endsWith(".kml")) {
        kmlContent = await zip.files[filename].async("string");
        break;
      }
    }

    if (!kmlContent) {
      return NextResponse.json({ error: "KML não encontrado no arquivo KMZ" }, { status: 500 });
    }

    return new NextResponse(kmlContent, {
      headers: {
        "Content-Type": "application/vnd.google-earth.kml+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar KMZ:", error);
    return NextResponse.json({ error: "Erro ao carregar arquivo de perímetro" }, { status: 500 });
  }
}
