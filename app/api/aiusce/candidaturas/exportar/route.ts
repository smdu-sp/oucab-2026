import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { exportarCandidaturasAiusce } from "@/services/candidaturas-aiusce";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  EM_ANALISE: "Em Análise",
  DEFERIDO: "Deferido",
  INDEFERIDO: "Indeferido",
  AGUARDANDO_DOCUMENTACAO: "Aguardando Documentação",
};

const segmentoLabel: Record<string, string> = {
  ONG_CULTURAL: "ONG Cultural",
  ENTIDADE_URB_AMB: "Entidade Urb. e Amb.",
};

const generoLabel: Record<string, string> = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  OUTRO: "Outro / Autodeclarado",
};

export async function GET(request: NextRequest) {
  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { searchParams } = request.nextUrl;
  const busca = searchParams.get("busca") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const grupos = (searchParams.get("grupos") ?? "inscricao,entidade,representante,titular,suplente").split(",");

  const candidaturas = await exportarCandidaturasAiusce(busca, status);

  const linhas = candidaturas.map((c) => {
    const row: Record<string, unknown> = {};

    if (grupos.includes("inscricao")) {
      row["Data de Inscrição"] = format(new Date(c.criadoEm), "dd/MM/yyyy HH:mm", { locale: ptBR });
      row["Status"] = statusLabel[c.status] ?? c.status;
    }

    if (grupos.includes("entidade") && c.organizacao) {
      row["Razão Social"] = c.organizacao.razaoSocial;
      row["CNPJ"] = c.organizacao.cnpj;
      row["Segmento"] = segmentoLabel[c.organizacao.segmento] ?? c.organizacao.segmento;
      row["E-mail da Entidade"] = c.organizacao.emailEntidade;
      row["Telefone"] = c.organizacao.telefone ?? "";
      row["Sede"] = c.organizacao.sede;
      row["Data de Abertura"] = formatDateBR(c.organizacao.dataAbertura);
      row["Forma Chapa"] = c.organizacao.formaChapa ? "Sim" : "Não";
      row["CNPJ Chapa"] = c.organizacao.cnpjChapa ?? "";
    }

    if (grupos.includes("representante") && c.organizacao) {
      row["Nome do Representante"] = c.organizacao.repNome;
      row["CPF do Representante"] = c.organizacao.repCpf;
    }

    const titular = c.candidatos.find((cd) => cd.tipoCandidato === "TITULAR");
    const suplente = c.candidatos.find((cd) => cd.tipoCandidato === "SUPLENTE");

    if (grupos.includes("titular") && titular) {
      row["Titular Nome"] = titular.nome;
      row["Titular Nome Social"] = titular.nomeSocial ?? "";
      row["Titular CPF"] = titular.cpf;
      row["Titular E-mail"] = titular.email;
      row["Titular Telefone"] = titular.telefone ?? "";
      row["Titular Nascimento"] = formatDateBR(titular.dataNascimento);
      row["Titular Gênero"] = generoLabel[titular.genero] ?? titular.genero;
      row["Titular Título de Eleitor"] = titular.tituloEleitor ?? "";
      row["Titular Domicílio Eleitoral"] = titular.domicilioEleitoral ?? "";
    }

    if (grupos.includes("suplente") && suplente) {
      row["Suplente Nome"] = suplente.nome;
      row["Suplente Nome Social"] = suplente.nomeSocial ?? "";
      row["Suplente CPF"] = suplente.cpf;
      row["Suplente E-mail"] = suplente.email;
      row["Suplente Telefone"] = suplente.telefone ?? "";
      row["Suplente Nascimento"] = formatDateBR(suplente.dataNascimento);
      row["Suplente Gênero"] = generoLabel[suplente.genero] ?? suplente.genero;
      row["Suplente Título de Eleitor"] = suplente.tituloEleitor ?? "";
      row["Suplente Domicílio Eleitoral"] = suplente.domicilioEleitoral ?? "";
    }

    return row;
  });

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Candidaturas");
  if (linhas.length > 0) {
    ws.columns = Object.keys(linhas[0]).map((key) => ({ header: key, key, width: 25 }));
    linhas.forEach((linha) => ws.addRow(linha));
  }
  const buf = Buffer.from(await wb.xlsx.writeBuffer());

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="candidaturas-aiusce.xlsx"`,
    },
  });
}
