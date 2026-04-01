"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, SkipForward } from "lucide-react";

import {
  formularioInscricaoSchema,
  type FormularioInscricaoData,
} from "@/lib/schemas/formulario-inscricao";

import EtapaTipoCadastro from "./etapas/etapa-tipo-cadastro";
import EtapaTipoInscricao from "./etapas/etapa-tipo-inscricao";
import EtapaDadosVotante from "./etapas/etapa-dados-votante";
import EtapaEndereco from "./etapas/etapa-endereco";
import EtapaRevisaoDados from "./etapas/etapa-revisao-dados";
import EtapaDadosOrganizacao from "./etapas/etapa-dados-organizacao";
import EtapaDadosTitular from "./etapas/etapa-dados-titular";
import EtapaDadosSuplente from "./etapas/etapa-dados-suplente";

import { criarEtapaDocumento } from "./etapas/etapa-arquivo-unico";
import { toast } from "sonner";
import { isWithinOUCABPerimeter } from "@/lib/utils/polygon-validation";
import { BASE_PATH } from "@/lib/config";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

type StepType =
  | "tipoCadastro"
  | "tipoInscricao"
  | "dadosPessoais"
  | "endereco"
  | "orgDados"
  | "titularDados"
  | "suplenteDados"
  | "revisao"
  | "doc"; // etapas de documento (genéricas)

type StepDef = {
  titulo: string;
  descricao: string;
  component: React.ComponentType;
  type: StepType;
  // Para etapas de documento:
  docField?: keyof FormularioInscricaoData;
  docObrigatorio?: boolean;
};

// ---------------------------------------------------------------------------
// Definições de documentos reutilizáveis
// ---------------------------------------------------------------------------

// Descrições genéricas dos documentos para cada campo
const DOCS_INDIVIDUAIS = {
  docRequerimento: criarEtapaDocumento(
    "docRequerimento",
    "Requerimento de Inscrição (Anexo I)",
    "Requerimento de inscrição para candidata/o a representante no Grupo de Gestão da OUCAB, conforme modelo constante do Anexo I do Edital.",
    ["O modelo do Anexo I está disponível no site da SMUL", "Deve ser assinado pelo/a candidato/a"],
  ),
  docIdentidade: criarEtapaDocumento(
    "docIdentidade",
    "Documento de Identificação com Foto",
    "Cópia simples de documento de identificação oficial com foto do/a candidato/a inscrito/a, expedido por autoridade nacional ou estrangeira.",
    ["RG, CNH, Passaporte ou equivalente", "O documento deve estar dentro da validade"],
  ),
  docCPF: criarEtapaDocumento(
    "docCPF",
    "Cópia do CPF",
    "Cópia simples do Cadastro de Pessoa Física (CPF), caso o número não conste no documento de identificação apresentado.",
    ["Este documento é dispensável se o número do CPF já constar no RG ou outro documento apresentado"],
    false, // opcional
  ),
  docTituloEleitor: criarEtapaDocumento(
    "docTituloEleitor",
    "Título de Eleitor",
    "Cópia simples do Título Eleitoral em situação regular e com domicílio eleitoral na cidade de São Paulo/SP.",
    ["O título deve estar em situação regular junto à Justiça Eleitoral", "O domicílio eleitoral deve ser no Município de São Paulo"],
  ),
  docComprovanteResidencia: criarEtapaDocumento(
    "docComprovante",
    "Comprovante de Residência",
    "Comprovante de residência com data anterior de no máximo 60 dias a contar da publicação do Edital, e/ou declaração de residência cujo modelo consta do Anexo I do Edital.",
    ["Data máxima de emissão: 60 dias antes da publicação do Edital", "Conta de água, luz, gás, telefone ou extrato bancário com endereço"],
  ),
  docComprovanteTrabalho: criarEtapaDocumento(
    "docComprovante",
    "Comprovante de Trabalho",
    "Comprovante de trabalho com data anterior de no máximo 60 dias a contar da publicação do Edital, e/ou declaração de trabalho cujo modelo consta do Anexo I do Edital.",
    ["Data máxima de emissão: 60 dias antes da publicação do Edital", "Carteira de trabalho, contracheque, declaração do empregador ou equivalente"],
  ),
  docFoto3x4: criarEtapaDocumento(
    "docFoto3x4",
    "Fotografia 3×4 Recente",
    "01 (uma) fotografia 3×4 recente, individual, com fundo claro, para identificação visual do/a candidato/a pelo/a eleitor/a no momento da votação.",
    ["A foto deve ser recente, individual e com fundo claro", "Envie como arquivo de imagem (JPG ou PNG)"],
  ),
  docDeclaracao: criarEtapaDocumento(
    "docDeclaracao",
    "Declaração de Não Impedimento (Anexo IV)",
    "Declaração do/a candidato/a de que não incorre nas vedações constantes do artigo 1º do Decreto municipal nº 53.177/2012 (não é detentor de cargo público ou mandato eletivo), conforme modelo do Anexo IV do Edital.",
    ["O modelo do Anexo IV está disponível no site da SMUL", "Deve ser assinada pelo/a candidato/a"],
  ),
};

const DOCS_ORG_MORADIA = {
  orgDocRequerimento: criarEtapaDocumento(
    "orgDocRequerimento",
    "Requerimento de Inscrição da Entidade (Anexo II)",
    "Requerimento indicando os/as candidatos/as a titular e suplente, firmado por representante legal da entidade, conforme modelo do Anexo II do Edital.",
    ["O modelo do Anexo II está disponível no site da SMUL", "Deve ser assinado pelo representante legal da entidade"],
  ),
  orgDocDeclaracaoAtuacao: criarEtapaDocumento(
    "orgDocDeclaracaoAtuacao",
    "Declaração de Atuação na Região (Anexo II)",
    "Declaração de atuação, por pelo menos os últimos 2 (dois) anos, contados retroativamente da publicação do Edital, na região abrangida pelo perímetro e/ou perímetro expandido da OUCAB, conforme modelo do Anexo II.",
    ["Deve comprovar 2 anos de atuação na região da OUCAB", "O modelo está disponível no Anexo II do Edital"],
  ),
  orgDocEstatutoSocial: criarEtapaDocumento(
    "orgDocEstatutoSocial",
    "Estatuto Social da Entidade",
    "Estatuto Social, devidamente registrado, comprovando ao menos 02 (dois) anos de existência, contados retroativamente da publicação do Edital.",
    ["O estatuto deve estar registrado em cartório ou órgão competente", "Deve comprovar ao menos 2 anos de existência da entidade"],
  ),
  orgDocAtaEleicao: criarEtapaDocumento(
    "orgDocAtaEleicao",
    "Ata da Última Eleição dos Representantes Legais",
    "Ata da última eleição dos/as representantes legais com mandato em vigor, devidamente registrada.",
    ["O mandato dos representantes legais deve estar em vigor", "A ata deve estar devidamente registrada"],
  ),
  orgDocCertidaoCNPJ: criarEtapaDocumento(
    "orgDocCertidaoCNPJ",
    "Certidão de Regularidade do CNPJ",
    "Certidão de regularidade do CNPJ, comprovando sede no Município de São Paulo, obtida no site da Receita Federal (www.receita.fazenda.gov.br).",
    ["Deve ser obtida no site da Receita Federal", "Deve comprovar sede no Município de São Paulo"],
  ),
  orgDocComprovanteCNPJ: criarEtapaDocumento(
    "orgDocComprovanteCNPJ",
    "Comprovante de Inscrição e Situação Cadastral do CNPJ (Opcional)",
    "Comprovante de Inscrição e de Situação Cadastral do CNPJ, emitido nos 30 dias anteriores ao prazo de inscrição, demonstrando nome compatível ao Estatuto, sede em São Paulo, ao menos 2 anos de existência e situação cadastral ativa.",
    ["Documento opcional, mas recomendado pelo Edital", "Deve ser emitido nos 30 dias anteriores ao prazo de inscrição", "Disponível no site da Receita Federal"],
    false, // opcional
  ),
};

const DOCS_ORG_OUTROS = {
  orgDocRequerimento: criarEtapaDocumento(
    "orgDocRequerimento",
    "Requerimento de Inscrição da Entidade (Anexo I)",
    "Requerimento indicando os/as candidatos/as a titular e suplente, firmado por representante legal da entidade, conforme modelo do Anexo I do Edital.",
    ["O modelo do Anexo I está disponível no site da SMUL", "Deve ser assinado pelo representante legal da entidade"],
  ),
  orgDocDeclaracaoAtuacao: criarEtapaDocumento(
    "orgDocDeclaracaoAtuacao",
    "Declaração de Atuação na Região ou nas Temáticas Urbana e Ambiental (Anexos II e III)",
    "Declaração de atuação, por pelo menos os últimos 2 (dois) anos, na região abrangida pelo perímetro da OUCAB ou nas temáticas urbana e ambiental, conforme modelos dos Anexos II e III do Edital.",
    ["Deve comprovar 2 anos de atuação na região ou nas temáticas", "Os modelos estão disponíveis nos Anexos II e III do Edital"],
  ),
  orgDocEstatutoSocial: criarEtapaDocumento(
    "orgDocEstatutoSocial",
    "Estatuto Social da Entidade (Registrado em Cartório)",
    "Estatuto Social, devidamente registrado em cartório, comprovando ao menos 02 (dois) anos de existência, contados retroativamente da publicação do Edital.",
    ["O estatuto deve estar registrado em cartório", "Deve comprovar ao menos 2 anos de existência da entidade"],
  ),
  orgDocAtaEleicao: criarEtapaDocumento(
    "orgDocAtaEleicao",
    "Ata da Última Eleição dos Representantes Legais (Registrada em Cartório)",
    "Ata da última eleição dos/as representantes legais com mandato em vigor, devidamente registrada em cartório.",
    ["O mandato dos representantes legais deve estar em vigor", "A ata deve estar registrada em cartório"],
  ),
  orgDocCertidaoCNPJ: criarEtapaDocumento(
    "orgDocCertidaoCNPJ",
    "Certidão de Regularidade do CNPJ (Últimos 30 dias)",
    "Certidão de regularidade do CNPJ atualizada nos últimos 30 dias, comprovando sede no Município de São Paulo, obtida no site da Receita Federal.",
    ["Deve ser emitida nos últimos 30 dias", "Deve comprovar sede no Município de São Paulo"],
  ),
  orgDocComprovanteCNPJ: criarEtapaDocumento(
    "orgDocComprovanteCNPJ",
    "Comprovante de Inscrição e Situação Cadastral do CNPJ (Opcional)",
    "Comprovante de Inscrição e de Situação Cadastral do CNPJ, emitido nos 30 dias anteriores ao prazo de inscrição, demonstrando nome compatível ao Estatuto, sede em São Paulo, ao menos 2 anos de existência e situação cadastral ativa.",
    ["Documento opcional, mas recomendado pelo Edital", "Deve ser emitido nos 30 dias anteriores ao prazo de inscrição"],
    false, // opcional
  ),
};

const DOCS_TITULAR_MORADIA = {
  titularDocRequerimento: criarEtapaDocumento(
    "titularDocRequerimento",
    "Requerimento de Inscrição do Titular (Anexo II)",
    "Requerimento de inscrição para candidato/a titular a representante no Grupo de Gestão da OUCAB, conforme modelo do Anexo II do Edital.",
    ["O modelo do Anexo II está disponível no site da SMUL"],
  ),
  titularDocIdentidade: criarEtapaDocumento(
    "titularDocIdentidade",
    "Documento de Identificação com Foto — Titular",
    "Cópia simples de documento de identificação oficial com foto do/a candidato/a titular.",
    ["RG, CNH, Passaporte ou equivalente"],
  ),
  titularDocCPF: criarEtapaDocumento(
    "titularDocCPF",
    "Cópia do CPF — Titular (Opcional)",
    "Cópia simples do CPF do/a candidato/a titular, caso o número não conste no documento de identificação.",
    ["Dispensável se o número do CPF constar no documento de identificação apresentado"],
    false,
  ),
  titularDocTituloEleitor: criarEtapaDocumento(
    "titularDocTituloEleitor",
    "Título de Eleitor — Titular",
    "Cópia simples do Título Eleitoral em situação regular e com domicílio eleitoral em São Paulo/SP do/a candidato/a titular.",
    ["Domicílio eleitoral deve ser no Município de São Paulo"],
  ),
  titularDocComprovante: criarEtapaDocumento(
    "titularDocComprovante",
    "Comprovante de Residência ou Trabalho — Titular",
    "Comprovante de residência ou trabalho do/a candidato/a titular, com data anterior de no máximo 60 dias a contar da publicação do Edital, e/ou declaração de residência ou trabalho conforme modelo do Anexo II do Edital.",
    ["Data máxima de emissão: 60 dias antes da publicação do Edital (31/03/2026)", "Conta de água, luz, gás, telefone, contracheque, declaração do empregador ou equivalente"],
  ),
  titularDocFoto3x4: criarEtapaDocumento(
    "titularDocFoto3x4",
    "Fotografia 3×4 — Titular",
    "01 (uma) fotografia 3×4 recente do/a candidato/a titular, individual, com fundo claro, para identificação visual no momento da votação.",
    ["A foto deve ser recente, individual e com fundo claro", "Envie como arquivo de imagem (JPG ou PNG)"],
  ),
  titularDocDeclaracao: criarEtapaDocumento(
    "titularDocDeclaracao",
    "Declaração de Não Impedimento — Titular (Anexo IV)",
    "Declaração do/a candidato/a titular de que não incorre nas vedações do art. 1º do Decreto nº 53.177/2012, conforme modelo do Anexo IV do Edital.",
    ["O modelo do Anexo IV está disponível no site da SMUL"],
  ),
};

const DOCS_TITULAR_OUTROS = {
  titularDocIdentidade: criarEtapaDocumento(
    "titularDocIdentidade",
    "Documento de Identificação com CPF — Titular",
    "Cópias simples de documento de identificação pessoal e de comprovante de inscrição no CPF do/a candidato/a titular.",
    ["RG, CNH ou equivalente", "CPF caso não conste no documento de identificação"],
  ),
  titularDocCPF: criarEtapaDocumento(
    "titularDocCPF",
    "Comprovante de CPF — Titular (Opcional)",
    "Cópia simples do comprovante de inscrição no CPF do/a candidato/a titular, caso não conste no documento de identificação.",
    ["Dispensável se o número do CPF constar no documento de identificação apresentado"],
    false,
  ),
  titularDocTituloEleitor: criarEtapaDocumento(
    "titularDocTituloEleitor",
    "Título de Eleitor — Titular",
    "Cópia simples do Título Eleitoral em situação regular e com domicílio eleitoral em São Paulo/SP do/a candidato/a titular.",
    ["Domicílio eleitoral deve ser no Município de São Paulo"],
  ),
  titularDocFoto3x4: criarEtapaDocumento(
    "titularDocFoto3x4",
    "Fotografia 3×4 — Titular",
    "01 (uma) fotografia 3×4 recente do/a candidato/a titular, individual, com fundo branco.",
    ["A foto deve ser recente, individual e com fundo branco", "Envie como arquivo de imagem (JPG ou PNG)"],
  ),
  titularDocDeclaracao: criarEtapaDocumento(
    "titularDocDeclaracao",
    "Declaração de Não Impedimento — Titular (Anexo IV)",
    "Declaração do/a candidato/a titular de que não incorre nas vedações do art. 1º do Decreto nº 53.177/2012, conforme modelo do Anexo IV do Edital.",
    ["O modelo do Anexo IV está disponível no site da SMUL"],
  ),
};

const DOCS_SUPLENTE_MORADIA = {
  suplenteDocRequerimento: criarEtapaDocumento(
    "suplenteDocRequerimento",
    "Requerimento de Inscrição do Suplente (Anexo II)",
    "Requerimento de inscrição para candidato/a suplente a representante no Grupo de Gestão da OUCAB, conforme modelo do Anexo II do Edital.",
    ["O modelo do Anexo II está disponível no site da SMUL"],
  ),
  suplenteDocIdentidade: criarEtapaDocumento(
    "suplenteDocIdentidade",
    "Documento de Identificação com Foto — Suplente",
    "Cópia simples de documento de identificação oficial com foto do/a candidato/a suplente.",
    ["RG, CNH, Passaporte ou equivalente"],
  ),
  suplenteDocCPF: criarEtapaDocumento(
    "suplenteDocCPF",
    "Cópia do CPF — Suplente (Opcional)",
    "Cópia simples do CPF do/a candidato/a suplente, caso o número não conste no documento de identificação.",
    ["Dispensável se o número do CPF constar no documento de identificação apresentado"],
    false,
  ),
  suplenteDocTituloEleitor: criarEtapaDocumento(
    "suplenteDocTituloEleitor",
    "Título de Eleitor — Suplente",
    "Cópia simples do Título Eleitoral em situação regular e com domicílio eleitoral em São Paulo/SP do/a candidato/a suplente.",
    ["Domicílio eleitoral deve ser no Município de São Paulo"],
  ),
  suplenteDocComprovante: criarEtapaDocumento(
    "suplenteDocComprovante",
    "Comprovante de Residência ou Trabalho — Suplente",
    "Comprovante de residência ou trabalho do/a candidato/a suplente, com data anterior de no máximo 60 dias a contar da publicação do Edital, e/ou declaração de residência ou trabalho conforme modelo do Anexo II do Edital.",
    ["Data máxima de emissão: 60 dias antes da publicação do Edital (31/03/2026)", "Conta de água, luz, gás, telefone, contracheque, declaração do empregador ou equivalente"],
  ),
  suplenteDocFoto3x4: criarEtapaDocumento(
    "suplenteDocFoto3x4",
    "Fotografia 3×4 — Suplente",
    "01 (uma) fotografia 3×4 recente do/a candidato/a suplente, individual, com fundo claro, para identificação visual no momento da votação.",
    ["A foto deve ser recente, individual e com fundo claro", "Envie como arquivo de imagem (JPG ou PNG)"],
  ),
  suplenteDocDeclaracao: criarEtapaDocumento(
    "suplenteDocDeclaracao",
    "Declaração de Não Impedimento — Suplente (Anexo IV)",
    "Declaração do/a candidato/a suplente de que não incorre nas vedações do art. 1º do Decreto nº 53.177/2012, conforme modelo do Anexo IV do Edital.",
    ["O modelo do Anexo IV está disponível no site da SMUL"],
  ),
};

const DOCS_SUPLENTE_OUTROS = {
  suplenteDocIdentidade: criarEtapaDocumento(
    "suplenteDocIdentidade",
    "Documento de Identificação com CPF — Suplente",
    "Cópias simples de documento de identificação pessoal e de comprovante de inscrição no CPF do/a candidato/a suplente.",
    ["RG, CNH ou equivalente", "CPF caso não conste no documento de identificação"],
  ),
  suplenteDocCPF: criarEtapaDocumento(
    "suplenteDocCPF",
    "Comprovante de CPF — Suplente (Opcional)",
    "Cópia simples do comprovante de inscrição no CPF do/a candidato/a suplente, caso não conste no documento de identificação.",
    ["Dispensável se o número do CPF constar no documento de identificação apresentado"],
    false,
  ),
  suplenteDocTituloEleitor: criarEtapaDocumento(
    "suplenteDocTituloEleitor",
    "Título de Eleitor — Suplente",
    "Cópia simples do Título Eleitoral em situação regular e com domicílio eleitoral em São Paulo/SP do/a candidato/a suplente.",
    ["Domicílio eleitoral deve ser no Município de São Paulo"],
  ),
  suplenteDocFoto3x4: criarEtapaDocumento(
    "suplenteDocFoto3x4",
    "Fotografia 3×4 — Suplente",
    "01 (uma) fotografia 3×4 recente do/a candidato/a suplente, individual, com fundo branco.",
    ["A foto deve ser recente, individual e com fundo branco", "Envie como arquivo de imagem (JPG ou PNG)"],
  ),
  suplenteDocDeclaracao: criarEtapaDocumento(
    "suplenteDocDeclaracao",
    "Declaração de Não Impedimento — Suplente (Anexo IV)",
    "Declaração do/a candidato/a suplente de que não incorre nas vedações do art. 1º do Decreto nº 53.177/2012, conforme modelo do Anexo IV do Edital.",
    ["O modelo do Anexo IV está disponível no site da SMUL"],
  ),
};

// ---------------------------------------------------------------------------
// Construtores de fluxo de etapas
// ---------------------------------------------------------------------------

const ETAPA_TIPO_CADASTRO: StepDef = {
  type: "tipoCadastro",
  titulo: "Tipo de Participação",
  descricao: "Selecione como você deseja participar da OUCAB",
  component: EtapaTipoCadastro,
};

const ETAPA_TIPO_INSCRICAO: StepDef = {
  type: "tipoInscricao",
  titulo: "Tipo de Inscrição",
  descricao: "Selecione sua relação com a Operação Urbana Consorciada Água Branca",
  component: EtapaTipoInscricao,
};

const ETAPA_DADOS_PESSOAIS: StepDef = {
  type: "dadosPessoais",
  titulo: "Dados Pessoais",
  descricao: "Informe seus dados pessoais",
  component: EtapaDadosVotante,
};

const ETAPA_ENDERECO_PERIMETRO: StepDef = {
  type: "endereco",
  titulo: "Endereço",
  descricao: "Informe seu endereço — deve estar dentro do perímetro da OUCAB",
  component: EtapaEndereco,
};

const ETAPA_ENDERECO_SP: StepDef = {
  type: "endereco",
  titulo: "Endereço da Organização",
  descricao: "Informe o endereço da entidade (deve ser no Município de São Paulo)",
  component: EtapaEndereco,
};

const ETAPA_ORG_DADOS: StepDef = {
  type: "orgDados",
  titulo: "Dados da Organização",
  descricao: "Informe os dados cadastrais da entidade",
  component: EtapaDadosOrganizacao,
};

const ETAPA_TITULAR_DADOS: StepDef = {
  type: "titularDados",
  titulo: "Dados do Candidato Titular",
  descricao: "Informe os dados pessoais do/a candidato/a titular",
  component: EtapaDadosTitular,
};

const ETAPA_SUPLENTE_DADOS: StepDef = {
  type: "suplenteDados",
  titulo: "Dados do Candidato Suplente",
  descricao: "Informe os dados pessoais do/a candidato/a suplente",
  component: EtapaDadosSuplente,
};

const ETAPA_REVISAO: StepDef = {
  type: "revisao",
  titulo: "Revisão de Dados",
  descricao: "Confira todas as informações antes de finalizar",
  component: EtapaRevisaoDados,
};


// Função auxiliar para criar etapa de documento a partir de um componente pré-fabricado
function etapaDoc(
  component: React.ComponentType,
  titulo: string,
  docField: keyof FormularioInscricaoData,
  docObrigatorio = true,
): StepDef {
  return {
    type: "doc",
    titulo,
    descricao: "",
    component,
    docField,
    docObrigatorio,
  };
}

// ---------------------------------------------------------------------------
// Fluxos de etapas por tipo
// ---------------------------------------------------------------------------

function buildEtapas(tipoCadastro: string, tipoInscricao: string): StepDef[] {
  const isCandidato = tipoCadastro === "CANDIDATO";
  const isRepMoradia = tipoInscricao === "REP_MORADIA";
  const isRepOrg = ["REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(tipoInscricao);
  const isIndividual = tipoInscricao === "MORADOR" || tipoInscricao === "TRABALHADOR";
  const isTrabalho = tipoInscricao === "TRABALHADOR";

  if (!tipoInscricao) {
    return [ETAPA_TIPO_INSCRICAO];
  }

  if (isCandidato && isIndividual) {
    // Candidato Morador ou Trabalhador
    return [
      ETAPA_TIPO_INSCRICAO,
      ETAPA_DADOS_PESSOAIS,
      ETAPA_ENDERECO_PERIMETRO,
      etapaDoc(DOCS_INDIVIDUAIS.docRequerimento, "Requerimento de Inscrição", "docRequerimento"),
      etapaDoc(DOCS_INDIVIDUAIS.docIdentidade, "Documento de Identidade", "docIdentidade"),
      etapaDoc(DOCS_INDIVIDUAIS.docCPF, "CPF (opcional)", "docCPF", false),
      etapaDoc(DOCS_INDIVIDUAIS.docTituloEleitor, "Título de Eleitor", "docTituloEleitor"),
      etapaDoc(
        isTrabalho ? DOCS_INDIVIDUAIS.docComprovanteTrabalho : DOCS_INDIVIDUAIS.docComprovanteResidencia,
        isTrabalho ? "Comprovante de Trabalho" : "Comprovante de Residência",
        "docComprovante",
      ),
      etapaDoc(DOCS_INDIVIDUAIS.docFoto3x4, "Foto 3×4", "docFoto3x4"),
      etapaDoc(DOCS_INDIVIDUAIS.docDeclaracao, "Declaração de Não Impedimento", "docDeclaracao"),
      ETAPA_REVISAO,
    ];
  }

  if (isCandidato && isRepMoradia) {
    // Candidato Representante de Movimento de Moradia
    const orgDocs = DOCS_ORG_MORADIA;
    const titularDocs = DOCS_TITULAR_MORADIA;
    const suplenteDocs = DOCS_SUPLENTE_MORADIA;
    return [
      ETAPA_TIPO_INSCRICAO,
      ETAPA_ORG_DADOS,
      etapaDoc(orgDocs.orgDocRequerimento, "Requerimento da Entidade", "orgDocRequerimento"),
      etapaDoc(orgDocs.orgDocDeclaracaoAtuacao, "Declaração de Atuação", "orgDocDeclaracaoAtuacao"),
      etapaDoc(orgDocs.orgDocEstatutoSocial, "Estatuto Social", "orgDocEstatutoSocial"),
      etapaDoc(orgDocs.orgDocAtaEleicao, "Ata da Última Eleição", "orgDocAtaEleicao"),
      etapaDoc(orgDocs.orgDocCertidaoCNPJ, "Certidão CNPJ", "orgDocCertidaoCNPJ"),
      etapaDoc(orgDocs.orgDocComprovanteCNPJ, "Comprovante CNPJ (opcional)", "orgDocComprovanteCNPJ", false),
      ETAPA_ENDERECO_SP,
      ETAPA_TITULAR_DADOS,
      etapaDoc(titularDocs.titularDocRequerimento, "Requerimento — Titular", "titularDocRequerimento"),
      etapaDoc(titularDocs.titularDocIdentidade, "Identidade — Titular", "titularDocIdentidade"),
      etapaDoc(titularDocs.titularDocCPF, "CPF — Titular (opcional)", "titularDocCPF", false),
      etapaDoc(titularDocs.titularDocTituloEleitor, "Título Eleitor — Titular", "titularDocTituloEleitor"),
      etapaDoc(titularDocs.titularDocComprovante, "Comprovante de Residência/Trabalho — Titular", "titularDocComprovante"),
      etapaDoc(titularDocs.titularDocFoto3x4, "Foto 3×4 — Titular", "titularDocFoto3x4"),
      etapaDoc(titularDocs.titularDocDeclaracao, "Declaração — Titular", "titularDocDeclaracao"),
      ETAPA_SUPLENTE_DADOS,
      etapaDoc(suplenteDocs.suplenteDocRequerimento, "Requerimento — Suplente", "suplenteDocRequerimento"),
      etapaDoc(suplenteDocs.suplenteDocIdentidade, "Identidade — Suplente", "suplenteDocIdentidade"),
      etapaDoc(suplenteDocs.suplenteDocCPF, "CPF — Suplente (opcional)", "suplenteDocCPF", false),
      etapaDoc(suplenteDocs.suplenteDocTituloEleitor, "Título Eleitor — Suplente", "suplenteDocTituloEleitor"),
      etapaDoc(suplenteDocs.suplenteDocComprovante, "Comprovante de Residência/Trabalho — Suplente", "suplenteDocComprovante"),
      etapaDoc(suplenteDocs.suplenteDocFoto3x4, "Foto 3×4 — Suplente", "suplenteDocFoto3x4"),
      etapaDoc(suplenteDocs.suplenteDocDeclaracao, "Declaração — Suplente", "suplenteDocDeclaracao"),
      ETAPA_REVISAO,
    ];
  }

  if (isCandidato && isRepOrg) {
    // Candidato REP_ONGS / REP_PROFISSIONAIS / REP_EMPRESARIAIS
    const orgDocs = DOCS_ORG_OUTROS;
    const titularDocs = DOCS_TITULAR_OUTROS;
    const suplenteDocs = DOCS_SUPLENTE_OUTROS;
    return [
      ETAPA_TIPO_INSCRICAO,
      ETAPA_ORG_DADOS,
      etapaDoc(orgDocs.orgDocRequerimento, "Requerimento da Entidade", "orgDocRequerimento"),
      etapaDoc(orgDocs.orgDocDeclaracaoAtuacao, "Declaração de Atuação", "orgDocDeclaracaoAtuacao"),
      etapaDoc(orgDocs.orgDocEstatutoSocial, "Estatuto Social", "orgDocEstatutoSocial"),
      etapaDoc(orgDocs.orgDocAtaEleicao, "Ata da Última Eleição", "orgDocAtaEleicao"),
      etapaDoc(orgDocs.orgDocCertidaoCNPJ, "Certidão CNPJ", "orgDocCertidaoCNPJ"),
      etapaDoc(orgDocs.orgDocComprovanteCNPJ, "Comprovante CNPJ (opcional)", "orgDocComprovanteCNPJ", false),
      ETAPA_ENDERECO_SP,
      ETAPA_TITULAR_DADOS,
      etapaDoc(titularDocs.titularDocIdentidade, "Identidade — Titular", "titularDocIdentidade"),
      etapaDoc(titularDocs.titularDocCPF, "CPF — Titular (opcional)", "titularDocCPF", false),
      etapaDoc(titularDocs.titularDocTituloEleitor, "Título de Eleitor — Titular", "titularDocTituloEleitor"),
      etapaDoc(titularDocs.titularDocFoto3x4, "Foto 3×4 — Titular", "titularDocFoto3x4"),
      etapaDoc(titularDocs.titularDocDeclaracao, "Declaração — Titular", "titularDocDeclaracao"),
      ETAPA_SUPLENTE_DADOS,
      etapaDoc(suplenteDocs.suplenteDocIdentidade, "Identidade — Suplente", "suplenteDocIdentidade"),
      etapaDoc(suplenteDocs.suplenteDocCPF, "CPF — Suplente (opcional)", "suplenteDocCPF", false),
      etapaDoc(suplenteDocs.suplenteDocTituloEleitor, "Título de Eleitor — Suplente", "suplenteDocTituloEleitor"),
      etapaDoc(suplenteDocs.suplenteDocFoto3x4, "Foto 3×4 — Suplente", "suplenteDocFoto3x4"),
      etapaDoc(suplenteDocs.suplenteDocDeclaracao, "Declaração — Suplente", "suplenteDocDeclaracao"),
      ETAPA_REVISAO,
    ];
  }

  // Fallback — aguardando seleção do tipo de inscrição
  return [ETAPA_TIPO_INSCRICAO];
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function FormularioInscricao() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [etapasCompletas, setEtapasCompletas] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const methods = useForm<FormularioInscricaoData>({
    resolver: zodResolver(formularioInscricaoSchema),
    mode: "onChange",
    defaultValues: {
      tipoCadastro: "CANDIDATO",
      tipoInscricao: undefined as any,
      organizacao: { cnpj: "", razaoSocial: "", email: "" },
      titular: { nome: "", nomeSocial: "", cpf: "", dataNascimento: "", telefone: "", genero: undefined as any, email: "", tituloEleitor: "" },
      suplente: { nome: "", nomeSocial: "", cpf: "", dataNascimento: "", telefone: "", genero: undefined as any, email: "", tituloEleitor: "" },
      votante: {
        nome: "", nomeSocial: "", telefone: "", genero: undefined as any,
        email: "", cpf: "", dataNascimento: "", empresa: "", tituloEleitor: "",
      },
      endereco: { logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", cep: "", latitude: null, longitude: null },
    },
  });

  const { trigger, getValues, watch } = methods;

  const tipoCadastroAtual = watch("tipoCadastro");
  const tipoInscricaoAtual = watch("tipoInscricao");

  const etapas = useMemo(
    () => buildEtapas(tipoCadastroAtual, tipoInscricaoAtual),
    [tipoCadastroAtual, tipoInscricaoAtual],
  );

  const stepAtual = etapas[etapaAtual - 1];

  // Resetar para a etapa de tipo de inscrição ao mudar o tipo de inscrição
  useEffect(() => {
    if (etapaAtual > 2) {
      setEtapaAtual(2);
      setEtapasCompletas([1]);
    }
  }, [tipoInscricaoAtual]);

  // Verificação de avanço por tipo de etapa
  const verificarPodeAvancar = (): boolean => {
    if (!stepAtual) return false;
    const dados = getValues();

    switch (stepAtual.type) {
      case "tipoCadastro":
        return !!dados.tipoCadastro;

      case "tipoInscricao":
        return !!dados.tipoInscricao;

      case "dadosPessoais": {
        const v = dados.votante;
        const campos = !!(v?.nome && v?.telefone && v?.genero && v?.email && v?.cpf && v?.dataNascimento && v?.tituloEleitor);
        const empresaOk = dados.tipoInscricao !== "TRABALHADOR" || !!v?.empresa;
        return campos && empresaOk;
      }

      case "endereco": {
        const e = dados.endereco;
        const isRepCheck = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(dados.tipoInscricao);
        const camposBase = !!(e?.logradouro && e?.bairro && e?.cidade && e?.estado && e?.cep);
        return isRepCheck ? camposBase : camposBase && !!(e?.latitude && e?.longitude);
      }

      case "orgDados": {
        const org = dados.organizacao;
        return !!(org?.cnpj && org?.razaoSocial && org?.email);
      }

      case "titularDados": {
        const t = dados.titular;
        return !!(t?.nome && t?.cpf && t?.dataNascimento && t?.telefone && t?.genero && t?.email);
      }

      case "suplenteDados": {
        const s = dados.suplente;
        const t = dados.titular;
        const campos = !!(s?.nome && s?.cpf && s?.dataNascimento && s?.telefone && s?.genero && s?.email);
        const paridade = (t?.genero !== "MASCULINO") || (s?.genero !== "MASCULINO");
        return campos && paridade;
      }

      case "doc": {
        if (!stepAtual.docField) return true;
        if (!stepAtual.docObrigatorio) return true; // opcional: sempre pode avançar
        return !!(dados as any)[stepAtual.docField];
      }

      case "revisao":
        return true;


      default:
        return false;
    }
  };

  useEffect(() => {
    const subscription = watch(() => setPodeAvancar(verificarPodeAvancar()));
    setPodeAvancar(verificarPodeAvancar());
    return () => subscription.unsubscribe();
  }, [etapaAtual, watch, stepAtual]);

  useEffect(() => {
    setPodeAvancar(verificarPodeAvancar());
  }, [etapaAtual, stepAtual]);

  const proximaEtapa = async () => {
    let isValid = false;

    switch (stepAtual?.type) {
      case "tipoCadastro":
        isValid = await trigger(["tipoCadastro"]);
        break;

      case "tipoInscricao":
        isValid = await trigger(["tipoInscricao"]);
        break;

      case "dadosPessoais": {
        const campos: any[] = ["votante.nome", "votante.telefone", "votante.genero", "votante.email", "votante.cpf", "votante.dataNascimento", "votante.tituloEleitor"];
        if (getValues("tipoInscricao") === "TRABALHADOR") campos.push("votante.empresa");
        isValid = true;
        for (const campo of campos) {
          const ok = await trigger(campo);
          if (!ok) { isValid = false; break; }
        }
        break;
      }

      case "endereco": {
        isValid = await trigger(["endereco.logradouro", "endereco.bairro", "endereco.cidade", "endereco.estado", "endereco.cep"]);
        if (isValid) {
          const isRep = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(getValues("tipoInscricao"));
          if (!isRep) {
            // Para MORADOR/TRABALHADOR exige geolocalização dentro do perímetro
            const lat = getValues("endereco.latitude");
            const lng = getValues("endereco.longitude");
            if (!lat || !lng) {
              toast.error("Por favor, selecione um local no mapa.");
              isValid = false;
            } else {
              const dentroPerimetro = await isWithinOUCABPerimeter(lat, lng);
              if (!dentroPerimetro) {
                toast.error("O endereço selecionado está fora das áreas de abrangência da OUCAB.");
                isValid = false;
              }
            }
          }
        }
        break;
      }

      case "orgDados":
        isValid = await trigger(["organizacao.cnpj", "organizacao.razaoSocial", "organizacao.email"] as any);
        break;

      case "titularDados":
        isValid = await trigger(["titular.nome", "titular.cpf", "titular.dataNascimento", "titular.telefone", "titular.genero", "titular.email"] as any);
        break;

      case "suplenteDados": {
        isValid = await trigger(["suplente.nome", "suplente.cpf", "suplente.dataNascimento", "suplente.telefone", "suplente.genero", "suplente.email"] as any);
        if (isValid) {
          const t = getValues("titular" as any) as any;
          const s = getValues("suplente" as any) as any;
          if (t?.genero === "MASCULINO" && s?.genero === "MASCULINO") {
            toast.error("É necessária paridade de gênero: ao menos um candidato deve ser do gênero feminino ou autodeclarado.");
            isValid = false;
          }
        }
        break;
      }

      case "doc":
        isValid = true; // podeAvancar já garante o arquivo obrigatório
        break;

      case "revisao":
        isValid = true;
        break;


      default:
        isValid = false;
    }

    if (isValid) {
      if (!etapasCompletas.includes(etapaAtual)) {
        setEtapasCompletas([...etapasCompletas, etapaAtual]);
      }
      if (etapaAtual < etapas.length) {
        setEtapaAtual(etapaAtual + 1);
      }
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const pularEtapa = () => {
    // Somente para etapas de documento opcionais
    if (stepAtual?.type === "doc" && !stepAtual.docObrigatorio) {
      if (!etapasCompletas.includes(etapaAtual)) {
        setEtapasCompletas([...etapasCompletas, etapaAtual]);
      }
      if (etapaAtual < etapas.length) {
        setEtapaAtual(etapaAtual + 1);
      }
    }
  };

  const onSubmit = async (data: FormularioInscricaoData) => {
    console.log("[Formulário] onSubmit chamado, tipoCadastro:", data.tipoCadastro, "tipoInscricao:", data.tipoInscricao);
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("tipoCadastro", data.tipoCadastro);
      formData.append("tipoInscricao", data.tipoInscricao);

      const isRep = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(data.tipoInscricao);

      if (isRep) {
        // Dados da organização
        formData.append("organizacao.cnpj", data.organizacao?.cnpj || "");
        formData.append("organizacao.razaoSocial", data.organizacao?.razaoSocial || "");
        formData.append("organizacao.email", data.organizacao?.email || "");

        // Dados dos candidatos
        const appendCandidato = (prefix: string, c: any) => {
          if (!c) return;
          formData.append(`${prefix}.nome`, c.nome || "");
          if (c.nomeSocial) formData.append(`${prefix}.nomeSocial`, c.nomeSocial);
          formData.append(`${prefix}.cpf`, c.cpf || "");
          formData.append(`${prefix}.dataNascimento`, c.dataNascimento || "");
          formData.append(`${prefix}.telefone`, c.telefone || "");
          formData.append(`${prefix}.genero`, c.genero || "");
          formData.append(`${prefix}.email`, c.email || "");
          if (c.tituloEleitor) formData.append(`${prefix}.tituloEleitor`, c.tituloEleitor);
        };
        appendCandidato("titular", data.titular);
        appendCandidato("suplente", data.suplente);
      } else {
        // Dados pessoais
        formData.append("votante.nome", data.votante?.nome || "");
        if (data.votante?.nomeSocial) formData.append("votante.nomeSocial", data.votante.nomeSocial);
        formData.append("votante.telefone", data.votante?.telefone || "");
        formData.append("votante.genero", data.votante?.genero || "");
        formData.append("votante.email", data.votante?.email || "");
        formData.append("votante.cpf", data.votante?.cpf || "");
        formData.append("votante.dataNascimento", data.votante?.dataNascimento || "");
        if (data.votante?.empresa) formData.append("votante.empresa", data.votante.empresa);
        if (data.votante?.tituloEleitor) formData.append("votante.tituloEleitor", data.votante.tituloEleitor);
      }

      // Endereço
      formData.append("endereco.logradouro", data.endereco.logradouro);
      if (data.endereco.numero) formData.append("endereco.numero", data.endereco.numero);
      if (data.endereco.complemento) formData.append("endereco.complemento", data.endereco.complemento);
      formData.append("endereco.bairro", data.endereco.bairro);
      formData.append("endereco.cidade", data.endereco.cidade);
      formData.append("endereco.estado", data.endereco.estado);
      formData.append("endereco.cep", data.endereco.cep);
      if (data.endereco.latitude) formData.append("endereco.latitude", data.endereco.latitude.toString());
      if (data.endereco.longitude) formData.append("endereco.longitude", data.endereco.longitude.toString());
      if (data.endereco.areaPerimetro) formData.append("endereco.areaPerimetro", data.endereco.areaPerimetro);

      // Arquivos individuais (todos os campos de arquivo nomeados)
      const camposArquivo: (keyof FormularioInscricaoData)[] = [
        "docRequerimento", "docIdentidade", "docCPF", "docTituloEleitor",
        "docComprovante", "docFoto3x4", "docDeclaracao",
        "orgDocRequerimento", "orgDocDeclaracaoAtuacao", "orgDocEstatutoSocial",
        "orgDocAtaEleicao", "orgDocCertidaoCNPJ", "orgDocComprovanteCNPJ",
        "titularDocRequerimento", "titularDocIdentidade", "titularDocCPF",
        "titularDocTituloEleitor", "titularDocFoto3x4", "titularDocDeclaracao",
        "suplenteDocRequerimento", "suplenteDocIdentidade", "suplenteDocCPF",
        "suplenteDocTituloEleitor", "suplenteDocFoto3x4", "suplenteDocDeclaracao",
      ];
      for (const campo of camposArquivo) {
        const arquivo = (data as any)[campo];
        if (arquivo instanceof File) {
          formData.append(campo, arquivo);
        }
      }


      const response = await fetch(`${BASE_PATH}/api/inscricao`, { method: "POST", body: formData });
      const resultado = await response.json();

      if (!response.ok) throw new Error(resultado.error || "Erro ao enviar formulário");

      router.push("/agradecimento");
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : "Erro ao realizar inscrição. Tente novamente.";
      toast.error(mensagem);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progresso = (etapaAtual / etapas.length) * 100;
  const EtapaComponent = stepAtual?.component;
  const isUltimaEtapa = etapaAtual === etapas.length &&
    stepAtual?.type !== "tipoCadastro" &&
    stepAtual?.type !== "tipoInscricao";
  const isDocOpcional = stepAtual?.type === "doc" && !stepAtual.docObrigatorio;

  if (!EtapaComponent) return null;

  return (
    <div className="max-w-4xl mx-auto p-0 md:p-6">
      <Card className="border-0 shadow-none md:border-1 md:shadow">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Formulário de Inscrição</CardTitle>
          <CardDescription className="text-center">
            Preencha todas as etapas para completar sua inscrição
          </CardDescription>
          <div className="space-y-2">
            <Progress value={progresso} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Etapa {etapaAtual} de {etapas.length}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(getValues()); }} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold">{stepAtual.titulo}</h3>
                {stepAtual.descricao && (
                  <p className="text-muted-foreground">{stepAtual.descricao}</p>
                )}
              </div>

              <EtapaComponent />

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={etapaAnterior}
                  disabled={etapaAtual === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </Button>

                <div className="flex gap-2">
                  {isDocOpcional && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={pularEtapa}
                      className="flex items-center space-x-2"
                    >
                      <SkipForward className="w-4 h-4" />
                      <span>Pular</span>
                    </Button>
                  )}

                  {!isUltimaEtapa ? (
                    <Button
                      type="button"
                      onClick={proximaEtapa}
                      disabled={!podeAvancar && !isDocOpcional}
                      className="flex items-center space-x-2"
                    >
                      <span>Próxima</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || etapasCompletas.length < etapas.length - 1}
                      className="flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Finalizar Inscrição</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
