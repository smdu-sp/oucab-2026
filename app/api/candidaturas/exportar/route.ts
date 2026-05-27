import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { exportarCandidaturas } from "@/services/candidaturas";
import { validaUsuario } from "@/services/usuario";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  EM_ANALISE: "Em Análise",
  DEFERIDO: "Deferido",
  INDEFERIDO: "Indeferido",
  AGUARDANDO_DOCUMENTACAO: "Aguardando Documentação",
};

const tipoInscricaoLabel: Record<string, string> = {
  MORADOR: "Morador",
  TRABALHADOR: "Trabalhador",
  REP_MORADIA: "Rep. de Moradia",
  REP_ONGS: "Rep. de ONGs",
  REP_PROFISSIONAIS: "Rep. de Profissionais",
  REP_EMPRESARIAIS: "Rep. Empresariais",
};

const tipoCadastroLabel: Record<string, string> = {
  ELEITOR: "Eleitor",
  CANDIDATO: "Candidato",
};

const generoLabel: Record<string, string> = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  OUTRO: "Outro / Autodeclarado",
};

const areaPerimetroLabel: Record<string, string> = {
  ADESAO: "Adesão",
  EXPANDIDO: "Expandido",
  NAO_APLICA: "Não Aplica",
};

export async function GET(request: NextRequest) {
  const usuario = await validaUsuario();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { searchParams } = request.nextUrl;
  const busca = searchParams.get("busca") ?? undefined;
  const tipoInscricao = searchParams.get("tipoInscricao") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const areaPerimetro = searchParams.get("areaPerimetro") ?? undefined;
  const grupos = (searchParams.get("grupos") ?? "inscricao,usuario,endereco,organizacao,candidato,suplente").split(",");

  const candidaturas = await exportarCandidaturas(busca, tipoInscricao, status, areaPerimetro);

  const linhas = candidaturas.map((c) => {
    const row: Record<string, unknown> = {};

    if (grupos.includes("inscricao")) {
      row["Data de Inscrição"] = format(new Date(c.criadoEm), "dd/MM/yyyy HH:mm", { locale: ptBR });
      row["Status"] = statusLabel[c.status] ?? c.status;
      row["Tipo de Inscrição"] = tipoInscricaoLabel[c.tipoInscricao] ?? c.tipoInscricao;
      row["Tipo de Cadastro"] = tipoCadastroLabel[c.tipoCadastro] ?? c.tipoCadastro;
    }

    if (grupos.includes("usuario")) {
      row["Nome"] = c.usuario.nome;
      row["E-mail"] = c.usuario.email;
    }

    if (grupos.includes("endereco") && c.endereco) {
      row["Logradouro"] = c.endereco.logradouro;
      row["Número"] = c.endereco.numero ?? "";
      row["Complemento"] = c.endereco.complemento ?? "";
      row["Bairro"] = c.endereco.bairro;
      row["Cidade"] = c.endereco.cidade;
      row["Estado"] = c.endereco.estado;
      row["CEP"] = c.endereco.cep;
      row["Perímetro"] = areaPerimetroLabel[c.endereco.areaPerimetro] ?? c.endereco.areaPerimetro;
    }

    if (grupos.includes("organizacao") && c.organizacao) {
      row["Razão Social"] = c.organizacao.razaoSocial;
      row["CNPJ"] = c.organizacao.cnpj;
      row["Forma Chapa"] = c.organizacao.formaChapa ? "Sim" : "Não";
      row["CNPJ Chapa"] = c.organizacao.chapaCNPJ ?? "";
      row["Razão Social Chapa"] = c.organizacao.chapaRazaoSocial ?? "";
    }

    const individual = c.candidatos.find((cd) => cd.tipoCandidato === "INDIVIDUAL");
    const titular = c.candidatos.find((cd) => cd.tipoCandidato === "TITULAR") ?? individual;
    const suplente = c.candidatos.find((cd) => cd.tipoCandidato === "SUPLENTE");

    if (grupos.includes("candidato") && titular) {
      row["Candidato Nome"] = titular.nome;
      row["Candidato Nome Social"] = titular.nomeSocial ?? "";
      row["Candidato CPF"] = titular.cpf;
      row["Candidato E-mail"] = titular.email;
      row["Candidato Telefone"] = titular.telefone ?? "";
      row["Candidato Nascimento"] = formatDateBR(titular.dataNascimento);
      row["Candidato Gênero"] = generoLabel[titular.genero] ?? titular.genero;
      row["Candidato Empresa"] = titular.nomeEmpresa ?? "";
    }

    if (grupos.includes("suplente") && suplente) {
      row["Suplente Nome"] = suplente.nome;
      row["Suplente Nome Social"] = suplente.nomeSocial ?? "";
      row["Suplente CPF"] = suplente.cpf;
      row["Suplente E-mail"] = suplente.email;
      row["Suplente Telefone"] = suplente.telefone ?? "";
      row["Suplente Nascimento"] = formatDateBR(suplente.dataNascimento);
      row["Suplente Gênero"] = generoLabel[suplente.genero] ?? suplente.genero;
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
      "Content-Disposition": `attachment; filename="candidaturas-oucab.xlsx"`,
    },
  });
}
