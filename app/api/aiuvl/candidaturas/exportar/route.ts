import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { exportarCandidaturasAiuvl } from "@/services/candidaturas-aiuvl";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";

const segmentoLabel: Record<string, string> = {
  ONG: "ONG",
  ASSOCIACAO_BAIRRO: "Associação de Bairro",
  ENTIDADE_ACADEMICA: "Entidade Acadêmica",
  REP_EMPRESARIAL: "Setor Empresarial",
};

export async function GET(request: NextRequest) {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { searchParams } = request.nextUrl;
  const busca = searchParams.get("busca") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const segmento = searchParams.get("segmento") ?? undefined;

  const candidaturas = await exportarCandidaturasAiuvl(busca, status, segmento);

  const linhas = candidaturas.map((c) => {
    const titular = c.candidatos.find((cd) => cd.tipoCandidato === "TITULAR");
    const suplente = c.candidatos.find((cd) => cd.tipoCandidato === "SUPLENTE");
    return {
      "Nome da Entidade": c.organizacao?.razaoSocial ?? "",
      CNPJ: c.organizacao?.cnpj ?? "",
      Segmento: segmentoLabel[c.organizacao?.segmento ?? ""] ?? c.organizacao?.segmento ?? "",
      "Nome do Representante": c.organizacao?.repNome ?? "",
      "Nome do Titular": titular?.nome ?? "",
      "Nome do Suplente": suplente?.nome ?? "",
    };
  });

  const ws = XLSX.utils.json_to_sheet(linhas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Candidaturas");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="candidaturas-aiuvl.xlsx"`,
    },
  });
}
