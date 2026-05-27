import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { readFile } from "fs/promises";
import { join } from "path";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import { buscarCandidaturaAiuscePorId } from "@/services/candidaturas-aiusce";
import type { Arquivo } from "@/lib/generated/aiusce";

function normalizarCaminho(caminho: string): string {
  const normalized = caminho.replace(/\\/g, "/");
  const parts = normalized.split("/uploads/");
  if (parts.length > 1) return join(process.cwd(), "uploads", parts[1]);
  return caminho;
}

function nomeUnico(nomes: Set<string>, nome: string): string {
  if (!nomes.has(nome)) { nomes.add(nome); return nome; }
  const ext = nome.lastIndexOf(".") > 0 ? nome.slice(nome.lastIndexOf(".")) : "";
  const base = nome.slice(0, nome.length - ext.length);
  let i = 2;
  while (nomes.has(`${base}-${i}${ext}`)) i++;
  const result = `${base}-${i}${ext}`;
  nomes.add(result);
  return result;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { id } = await params;
  const candidatura = await buscarCandidaturaAiuscePorId(id);
  if (!candidatura) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  type ArquivoEntry = { caminho: string; nome: string; pasta: string };
  const arquivos: ArquivoEntry[] = [
    ...candidatura.arquivos.map((a: Arquivo) => ({ caminho: a.caminho, nome: a.nome, pasta: "inscricao" })),
    ...(candidatura.organizacao?.arquivos ?? ([] as Arquivo[])).map((a: Arquivo) => ({ caminho: a.caminho, nome: a.nome, pasta: "entidade" })),
    ...candidatura.candidatos.flatMap((c) =>
      c.arquivos.map((a: Arquivo) => ({ caminho: a.caminho, nome: a.nome, pasta: `candidatos/${c.tipoCandidato.toLowerCase()}` })),
    ),
  ];

  const zip = new JSZip();
  const nomesUsados = new Map<string, Set<string>>();

  for (const arq of arquivos) {
    try {
      const buffer = await readFile(normalizarCaminho(arq.caminho));
      if (!nomesUsados.has(arq.pasta)) nomesUsados.set(arq.pasta, new Set());
      const nomeArq = nomeUnico(nomesUsados.get(arq.pasta)!, arq.nome);
      zip.file(`${arq.pasta}/${nomeArq}`, buffer);
    } catch {
      // arquivo físico ausente — ignora
    }
  }

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const nomeBase = (candidatura.organizacao?.razaoSocial ?? id).replace(/[^a-zA-Z0-9À-ÿ\s-]/g, "").trim();

  return new NextResponse(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(`arquivos-${nomeBase}.zip`)}"`,
    },
  });
}
