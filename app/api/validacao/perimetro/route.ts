import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import JSZip from "jszip";

function parseKMLCoordinates(kmlContent: string): [number, number][][] {
  const polygons: [number, number][][] = [];
  const coordRegex = /<coordinates>([\s\S]*?)<\/coordinates>/gi;
  let match;

  while ((match = coordRegex.exec(kmlContent)) !== null) {
    const coordString = match[1].trim();
    const coords = coordString
      .split(/\s+/)
      .filter(Boolean)
      .map((coord) => {
        const parts = coord.split(",");
        if (parts.length >= 2) {
          const lng = parseFloat(parts[0]);
          const lat = parseFloat(parts[1]);
          if (!isNaN(lng) && !isNaN(lat)) return [lng, lat] as [number, number];
        }
        return null;
      })
      .filter((c): c is [number, number] => c !== null);

    if (coords.length > 2) polygons.push(coords);
  }

  return polygons;
}

function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

async function loadKMZPolygons(filename: string): Promise<[number, number][][]> {
  const filePath = join(process.cwd(), "public", "shapes", filename);
  const fileBuffer = await readFile(filePath);
  const zip = await JSZip.loadAsync(fileBuffer);

  for (const name of Object.keys(zip.files)) {
    if (name.endsWith(".kml")) {
      const kmlContent = await zip.files[name].async("string");
      return parseKMLCoordinates(kmlContent);
    }
  }
  return [];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: "Coordenadas inválidas" }, { status: 400 });
  }

  try {
    const [adesaoPolygons, expandidoPolygons] = await Promise.all([
      loadKMZPolygons("perimetro_adesao.kmz"),
      loadKMZPolygons("perimetro_expandido.kmz"),
    ]);

    const point: [number, number] = [lng, lat];

    if (adesaoPolygons.some((polygon) => isPointInPolygon(point, polygon))) {
      return NextResponse.json({ valid: true, area: "ADESAO" });
    }
    if (expandidoPolygons.some((polygon) => isPointInPolygon(point, polygon))) {
      return NextResponse.json({ valid: true, area: "EXPANDIDO" });
    }

    return NextResponse.json({ valid: false, area: null });
  } catch (error) {
    console.error("Erro ao validar perímetro:", error);
    return NextResponse.json({ error: "Erro na validação" }, { status: 500 });
  }
}
