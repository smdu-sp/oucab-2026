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

async function loadShapePolygons(name: string): Promise<[number, number][][]> {
  const shapesDir = join(process.cwd(), "public", "oucab", "shapes");

  // Tenta KML direto primeiro, depois KMZ
  try {
    const kmlContent = await readFile(join(shapesDir, `${name}.kml`), "utf-8");
    return parseKMLCoordinates(kmlContent);
  } catch {
    const fileBuffer = await readFile(join(shapesDir, `${name}.kmz`));
    const zip = await JSZip.loadAsync(fileBuffer);
    for (const filename of Object.keys(zip.files)) {
      if (filename.endsWith(".kml")) {
        const kmlContent = await zip.files[filename].async("string");
        return parseKMLCoordinates(kmlContent);
      }
    }
    return [];
  }
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
      loadShapePolygons("perimetro_adesao"),
      loadShapePolygons("perimetro_expandido"),
    ]);

    const point: [number, number] = [lng, lat];

    if (adesaoPolygons.some((polygon: [number, number][]) => isPointInPolygon(point, polygon))) {
      return NextResponse.json({ valid: true, area: "ADESAO" });
    }
    if (expandidoPolygons.some((polygon: [number, number][]) => isPointInPolygon(point, polygon))) {
      return NextResponse.json({ valid: true, area: "EXPANDIDO" });
    }

    return NextResponse.json({ valid: false, area: null });
  } catch (error) {
    console.error("Erro ao validar perímetro:", error);
    return NextResponse.json({ error: "Erro na validação" }, { status: 500 });
  }
}
