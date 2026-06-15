"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, SkipForward, RotateCcw, Trash2, HardDrive } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  formularioAiuvlSchema,
  type FormularioAiuvlData,
  type EntidadeCandidataAiuvlData,
  type EntidadeEleitoraAiuvlData,
  type CandidatoAiuvlData,
} from "@/lib/schemas/formulario-aiuvl";

import EtapaTipoInscricaoAiuvl from "./etapas/etapa-tipo-inscricao";
import EtapaSegmentoAiuvl, { criarEtapaSegmento } from "./etapas/etapa-segmento";
import { EtapaDadosEntidadeCandidata, EtapaDadosEntidadeEleitora } from "./etapas/etapa-dados-entidade";
import { EtapaEnderecoCandidata, EtapaEnderecoEleitora } from "./etapas/etapa-endereco-entidade";
import { EtapaDadosTitular, EtapaDadosSuplente } from "./etapas/etapa-dados-candidato";
import EtapaArquivoUnico, { criarEtapaDocumento, criarEtapaFoto } from "./etapas/etapa-arquivo-unico";
import EtapaRevisaoDadosAiuvl from "./etapas/etapa-revisao-dados";

// ---------------------------------------------------------------------------
// Tamanho total dos arquivos
// ---------------------------------------------------------------------------

const ALL_DOC_FIELDS: (keyof FormularioAiuvlData)[] = [
  "candEntRequerimento", "candEntDeclaracaoAtuacao", "candEntEstatuto",
  "candEntAtaEleicao", "candEntCnpj", "candEntDeclaracaoIdoneidade",
  "repIdentidade", "repCpfDoc", "repTituloEleitorDoc", "repComprovanteResidencia",
  "titularIdentidade", "titularCpfDoc", "titularFoto", "titularTituloEleitor", "titularResidencia", "titularDeclaracao",
  "suplenteIdentidade", "suplenteCpfDoc", "suplenteFoto", "suplenteTituloEleitor", "suplenteResidencia", "suplenteDeclaracao",
  "eleitEntRequerimento", "eleitEntDeclaracaoAtuacao", "eleitEntEstatuto",
  "eleitEntAtaEleicao", "eleitEntCnpj", "eleitEntDeclaracaoIdoneidade",
  "eleitRepIdentidade", "eleitRepCpfDoc", "eleitRepTituloEleitor", "eleitRepResidencia",
];

const LIMITE_UPLOAD_BYTES = 250 * 1024 * 1024;

function formatarTamanhoArquivo(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ---------------------------------------------------------------------------
// Rascunho local (localStorage)
// ---------------------------------------------------------------------------

const CACHE_KEY = "aiuvl:inscricao:rascunho";
type Rascunho = { step: number; valores: Partial<FormularioAiuvlData> };

function salvarRascunho(step: number, valores: FormularioAiuvlData) {
  try {
    const serializavel = JSON.parse(JSON.stringify(valores, (_k, v) => v instanceof File ? undefined : v)) as Partial<FormularioAiuvlData>;
    localStorage.setItem(CACHE_KEY, JSON.stringify({ step, valores: serializavel }));
  } catch { /* silencioso */ }
}

function carregarRascunho(): Rascunho | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Rascunho;
  } catch { return null; }
}

function limparRascunho() {
  try { localStorage.removeItem(CACHE_KEY); } catch { /* silencioso */ }
}

// ---------------------------------------------------------------------------
// Tipos de step
// ---------------------------------------------------------------------------

type StepType = "tipoInscricao" | "segmento" | "entidadeCandidata" | "enderecoCandidata" | "entidadeEleitora" | "enderecoEleitora" | "titular" | "suplente" | "doc" | "revisao";

type StepDef = {
  titulo: string;
  descricao: string;
  component: React.ComponentType;
  type: StepType;
  docField?: keyof FormularioAiuvlData;
  obrigatorio?: boolean;
  soParaCandidata?: boolean;
  soParaEleitora?: boolean;
};

// ---------------------------------------------------------------------------
// Documentos — Candidata
// ---------------------------------------------------------------------------

const DOCS_CAND_ENTIDADE: StepDef[] = [
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Requerimento de Inscrição", 
    component: criarEtapaDocumento(
      "candEntRequerimento", 
      "Requerimento de Inscrição (Anexo I)", 
      "Requerimento indicando os(as) candidatos(as) a titular e suplente, firmado por representante legal da entidade, cujo modelo consta do <a href='/aiuvl/editais/anexos/anexo1.docx' class='text-primary underline' target='_blank'>Anexo I deste Edital</a>."
    ), 
    type: "doc", 
    docField: "candEntRequerimento", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Declaração de Atuação na Região", 
    component: criarEtapaDocumento(
      "candEntDeclaracaoAtuacao", 
      "Declaração de Atuação na Região (Anexo II)", 
      "Declaração de atuação, conforme modelo que consta do <a href='/aiuvl/editais/anexos/anexo2.docx' class='text-primary underline' target='_blank'>Anexo II</a>, por pelo menos os últimos 2 (dois) anos, contados retroativamente a partir da publicação deste edital, na região abrangida pelo perímetro e/ou pelo perímetro expandido da AIU-VL, de acordo com inciso II do § 1º do Art. 2º da Lei n° 17.968/2023 para os segmentos dos incisos I, II, III e IV do Art. 3º deste Edital;"
    ), 
    type: "doc", 
    docField: "candEntDeclaracaoAtuacao", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Estatuto Social", 
    component: criarEtapaDocumento(
      "candEntEstatuto", 
      "Estatuto Social da Entidade", 
      "Estatuto Social, devidamente registrado, comprovando ao menos 02 (dois) anos de existência, contados retroativamente a partir da publicação deste edital;"
    ), 
    type: "doc", 
    docField: "candEntEstatuto", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Ata de Eleição da Diretoria", 
    component: criarEtapaDocumento(
      "candEntAtaEleicao", 
      "Ata de Eleição da Diretoria Atual", 
      "Ata da última eleição dos(as) representantes legais com mandato em vigor, devidamente registrada;"
    ), 
    type: "doc", 
    docField: "candEntAtaEleicao", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Comprovante de CNPJ", 
    component: criarEtapaDocumento(
      "candEntCnpj", 
      "Certidão de regularidade do CNPJ", 
      "Certidão de regularidade do CNPJ atualizada, emitida com no mínimo 15 (quinze) dias a partir da publicação deste edital, comprovando sede no Município de São Paulo, que pode ser obtida no site: <a href='https://receita.fazenda.gov.br' class='text-primary underline' target='_blank'>receita.fazenda.gov.br</a>"
    ), 
    type: "doc", 
    docField: "candEntCnpj", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos da Entidade", 
    descricao: "Declaração de Idoneidade", 
    component: criarEtapaDocumento(
      "candEntDeclaracaoIdoneidade", 
      "Declaração de Idoneidade da Entidade (Anexo V)", 
      "Declaração de idoneidade perante o município de São Paulo, conforme modelo que consta no <a href='/aiuvl/editais/anexos/anexo5.docx' class='text-primary underline' target='_blank'>Anexo V</a> do Edital."
    ), 
    type: "doc", 
    docField: "candEntDeclaracaoIdoneidade", 
    soParaCandidata: true 
  },
];

const DOCS_REP_CAND: StepDef[] = [
  { 
    titulo: "Documentos do Representante Legal", 
    descricao: "Documento de Identidade", 
    component: criarEtapaDocumento(
      "repIdentidade", 
      "Documento de Identificação do Representante Legal", 
      "Cópia simples de documento de identificação pessoal;"
    ), 
    type: "doc", 
    docField: "repIdentidade", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Representante Legal", 
    descricao: "CPF", 
    component: criarEtapaDocumento(
      "repCpfDoc", 
      "Comprovante de inscrição no CPF do Representante Legal", 
      "Comprovante de inscrição no CPF, que pode ser obtida através do link: <a href='https://servicos.receita.fazenda.gov.br' class='text-primary underline' target='_blank'>https://servicos.receita.fazenda.gov.br</a>"
    ), 
    type: "doc", 
    docField: "repCpfDoc", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Representante Legal", 
    descricao: "Título de Eleitor", 
    component: criarEtapaDocumento(
      "repTituloEleitorDoc", 
      "Título de Eleitor do Representante Legal", 
      "Título de eleitor, com situação regular e domicílio eleitoral na cidade de São Paulo/SP, obrigatoriamente;"
    ), 
    type: "doc", 
    docField: "repTituloEleitorDoc",
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Representante Legal", 
    descricao: "Comprovante de Residência", 
    component: criarEtapaDocumento(
      "repComprovanteResidencia", 
      "Comprovante de Residência do Representante Legal", 
      "Comprovante ou declaração de residência no município de São Paulo;"
    ), 
    type: "doc", 
    docField: "repComprovanteResidencia", 
    soParaCandidata: true 
  },
];

const DOCS_TITULAR: StepDef[] = [
  { 
    titulo: "Documentos do Titular", 
    descricao: "Documento de Identidade", 
    component: criarEtapaDocumento(
      "titularIdentidade", 
      "Documento de Identificação do Titular", 
      "Cópia simples de documento de identificação pessoal;"
    ), 
    type: "doc", 
    docField: "titularIdentidade", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Titular", 
    descricao: "CPF", 
    component: criarEtapaDocumento(
      "titularCpfDoc", 
      "Comprovante de inscrição no CPF do Titular", 
      "Comprovante de inscrição no CPF, que pode ser obtida através do link: <a href='https://servicos.receita.fazenda.gov.br' class='text-primary underline' target='_blank'>https://servicos.receita.fazenda.gov.br</a>"
    ), 
    type: "doc", 
    docField: "titularCpfDoc",
    soParaCandidata: true 
  },
  {
    titulo: "Documentos do Titular",
    descricao: "Foto 3×4",
    component: criarEtapaFoto(
      "titularFoto",
      "Foto do Titular",
      "01 (uma) fotografia facial recente, com fundo branco e sem acessórios, como óculos de sol, bonés, chapéus, gorros etc., exceto por motivos religiosos;"
    ),
    type: "doc",
    docField: "titularFoto",
    soParaCandidata: true
  },
  { 
    titulo: "Documentos do Titular", 
    descricao: "Título de Eleitor", 
    component: criarEtapaDocumento(
      "titularTituloEleitor", 
      "Título de Eleitor do Titular", 
      "Título de eleitor, com situação regular e domicílio eleitoral na cidade de São Paulo/SP, obrigatoriamente;"
    ), 
    type: "doc", 
    docField: "titularTituloEleitor",
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Titular", 
    descricao: "Comprovante de Residência", 
    component: criarEtapaDocumento(
      "titularResidencia", 
      "Comprovante de Residência do Titular", 
      "Comprovante ou declaração de residência no município de São Paulo;"
    ), 
    type: "doc", 
    docField: "titularResidencia", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Titular", 
    descricao: "Declaração do Candidato", 
    component: criarEtapaDocumento(
      "titularDeclaracao", 
      "Declaração do(a) Candidato(a) — Titular (Anexo III)", 
      "Declaração do candidato titular conforme <a href='/aiuvl/editais/anexos/anexo3.docx' target='_blank' class='text-primary underline'>Anexo III</a> do Edital.",
      [
        "Declaração de que não é ocupante de cargo efetivo ou em comissão no Poder Público Municipal, Estadual ou Federal, da Administração Pública direta ou indireta dos poderes executivo, legislativo e judiciário, ou ainda detentor de mandato eletivo, cujo modelo consta do Anexo III deste Edital;",
        "Declaração de que não sofre as vedações constantes do artigo 1º do Decreto municipal nº 53.177/2012, que estabelece as hipóteses impeditivas de nomeação, contratação, admissão, designação, posse ou início de exercício para cargo, emprego ou função pública, em caráter efetivo ou em comissão, cujo modelo consta do Anexo III deste Edital;"
      ]
    ), 
    type: "doc", 
    docField: "titularDeclaracao", 
    soParaCandidata: true 
  },
];

const DOCS_SUPLENTE: StepDef[] = [
  { 
    titulo: "Documentos do Suplente", 
    descricao: "Documento de Identidade", 
    component: criarEtapaDocumento(
      "suplenteIdentidade", 
      "Documento de Identificação do Suplente", 
      "Cópia simples de documento de identificação pessoal;"
    ), 
    type: "doc", 
    docField: "suplenteIdentidade", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Suplente", 
    descricao: "CPF", 
    component: criarEtapaDocumento(
      "suplenteCpfDoc", 
      "Comprovante de inscrição no CPF do Suplente", 
      "Comprovante de inscrição no CPF, que pode ser obtido através do link: <a href='https://servicos.receita.fazenda.gov.br' class='text-primary underline' target='_blank'>https://servicos.receita.fazenda.gov.br</a>"
    ), 
    type: "doc", 
    docField: "suplenteCpfDoc",
    soParaCandidata: true 
  },
  {
    titulo: "Documentos do Suplente",
    descricao: "Foto 3×4",
    component: criarEtapaFoto(
      "suplenteFoto",
      "Foto do Suplente",
      "01 (uma) fotografia facial recente, com fundo branco e sem acessórios, como óculos de sol, bonés, chapéus, gorros etc., exceto por motivos religiosos;"
    ),
    type: "doc",
    docField: "suplenteFoto",
    soParaCandidata: true
  },
  { 
    titulo: "Documentos do Suplente", 
    descricao: "Título de Eleitor", 
    component: criarEtapaDocumento(
      "suplenteTituloEleitor", 
      "Título de Eleitor do Suplente", 
      "Título de eleitor, com situação regular e domicílio eleitoral na cidade de São Paulo/SP, obrigatoriamente;"
    ), 
    type: "doc", 
    docField: "suplenteTituloEleitor", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Suplente", 
    descricao: "Comprovante de Residência", 
    component: criarEtapaDocumento(
      "suplenteResidencia", 
      "Comprovante de Residência do Suplente", 
      "Comprovante ou declaração de residência no município de São Paulo;"
    ), 
    type: "doc", 
    docField: "suplenteResidencia", 
    soParaCandidata: true 
  },
  { 
    titulo: "Documentos do Suplente", 
    descricao: "Declaração do Candidato", 
    component: criarEtapaDocumento(
      "suplenteDeclaracao", 
      "Declaração do(a) Candidato(a) — Suplente (Anexo III)", 
      "Declaração do candidato suplente conforme <a href='/aiuvl/editais/anexos/anexo3.docx' target='_blank' class='text-primary underline'>Anexo III</a> do Edital.",
      [
        "Declaração de que não é ocupante de cargo efetivo ou em comissão no Poder Público Municipal, Estadual ou Federal, da Administração Pública direta ou indireta dos poderes executivo, legislativo e judiciário, ou ainda detentor de mandato eletivo, cujo modelo consta do Anexo III deste Edital;",
        "Declaração de que não sofre as vedações constantes do artigo 1º do Decreto municipal nº 53.177/2012, que estabelece as hipóteses impeditivas de nomeação, contratação, admissão, designação, posse ou início de exercício para cargo, emprego ou função pública, em caráter efetivo ou em comissão, cujo modelo consta do Anexo III deste Edital;"
      ]
    ), 
    type: "doc", 
    docField: "suplenteDeclaracao", 
    soParaCandidata: true 
  },
];

// ---------------------------------------------------------------------------
// Documentos — Eleitora
// ---------------------------------------------------------------------------

const DOCS_ELEIT_ENTIDADE: StepDef[] = [
  { titulo: "Documentos da Entidade", descricao: "Requerimento de Inscrição como Eleitor", component: criarEtapaDocumento("eleitEntRequerimento", "Requerimento de Inscrição como Eleitor (Anexo VI)", "Requerimento indicando o representante legal da entidade como eleitor, conforme Anexo VI do Edital."), type: "doc", docField: "eleitEntRequerimento", soParaEleitora: true },
  { titulo: "Documentos da Entidade", descricao: "Declaração de Atuação na Região", component: criarEtapaDocumento("eleitEntDeclaracaoAtuacao", "Declaração de Atuação na Região (Anexo II)", "Declaração comprovando atuação regular da entidade no perímetro ou perímetro expandido da AIU-VL."), type: "doc", docField: "eleitEntDeclaracaoAtuacao", soParaEleitora: true },
  { titulo: "Documentos da Entidade", descricao: "Estatuto Social", component: criarEtapaDocumento("eleitEntEstatuto", "Estatuto Social da Entidade", "Cópia do estatuto social registrado, comprovando a existência legal da entidade."), type: "doc", docField: "eleitEntEstatuto", soParaEleitora: true },
  { titulo: "Documentos da Entidade", descricao: "Ata de Eleição da Diretoria", component: criarEtapaDocumento("eleitEntAtaEleicao", "Ata de Eleição da Diretoria Atual", "Ata que comprova a eleição da diretoria ou gestão atual."), type: "doc", docField: "eleitEntAtaEleicao", soParaEleitora: true },
  { titulo: "Documentos da Entidade", descricao: "Comprovante de CNPJ", component: criarEtapaDocumento("eleitEntCnpj", "Comprovante de CNPJ (Cartão CNPJ)", "Comprovante de situação cadastral do CNPJ emitido pela Receita Federal.", ["Deve estar com situação ativa"]), type: "doc", docField: "eleitEntCnpj", soParaEleitora: true },
  { titulo: "Documentos da Entidade", descricao: "Declaração de Idoneidade", component: criarEtapaDocumento("eleitEntDeclaracaoIdoneidade", "Declaração de Idoneidade da Entidade (Anexo V)", "Declaração de que a entidade não possui impedimentos legais para participação no processo eleitoral."), type: "doc", docField: "eleitEntDeclaracaoIdoneidade", soParaEleitora: true },
];

const DOCS_ELEIT_REP: StepDef[] = [
  { titulo: "Documentos do Representante Legal", descricao: "Documento de Identidade", component: criarEtapaDocumento("eleitRepIdentidade", "Documento de Identificação do Representante Legal", "Cópia de documento oficial com foto do representante legal da entidade eleitora."), type: "doc", docField: "eleitRepIdentidade", soParaEleitora: true },
  { titulo: "Documentos do Representante Legal", descricao: "CPF", component: criarEtapaDocumento("eleitRepCpfDoc", "CPF do Representante Legal", "Certidão atualizada do CPF.", [], false), type: "doc", docField: "eleitRepCpfDoc", obrigatorio: false, soParaEleitora: true },
  { titulo: "Documentos do Representante Legal", descricao: "Título de Eleitor", component: criarEtapaDocumento("eleitRepTituloEleitor", "Título de Eleitor do Representante Legal", "Cópia do título de eleitor do representante legal.", [], false), type: "doc", docField: "eleitRepTituloEleitor", obrigatorio: false, soParaEleitora: true },
  { titulo: "Documentos do Representante Legal", descricao: "Comprovante de Residência", component: criarEtapaDocumento("eleitRepResidencia", "Comprovante de Residência do Representante Legal", "Comprovante de residência do representante legal da entidade eleitora."), type: "doc", docField: "eleitRepResidencia", soParaEleitora: true },
];

// ---------------------------------------------------------------------------
// Todos os steps
// ---------------------------------------------------------------------------

const ALL_STEPS: StepDef[] = [
  { titulo: "Tipo de Inscrição", descricao: "Selecione se a entidade se inscreverá como candidata ou apenas como eleitora", component: EtapaTipoInscricaoAiuvl, type: "tipoInscricao" },
  { titulo: "Segmento da Entidade", descricao: "Selecione o segmento ao qual a entidade pertence", component: EtapaSegmentoAiuvl, type: "segmento" },
  // CANDIDATA
  { titulo: "Dados da Entidade Candidata", descricao: "Preencha as informações da entidade que se candidata", component: EtapaDadosEntidadeCandidata, type: "entidadeCandidata", soParaCandidata: true },
  { titulo: "Endereço da Sede", descricao: "Informe o endereço completo da sede da entidade candidata", component: EtapaEnderecoCandidata, type: "enderecoCandidata", soParaCandidata: true },
  { titulo: "Dados do Candidato Titular", descricao: "Informe os dados do representante titular da entidade", component: EtapaDadosTitular, type: "titular", soParaCandidata: true },
  { titulo: "Dados do Candidato Suplente", descricao: "Informe os dados do representante suplente da entidade", component: EtapaDadosSuplente, type: "suplente", soParaCandidata: true },
  ...DOCS_CAND_ENTIDADE,
  ...DOCS_REP_CAND,
  ...DOCS_TITULAR,
  ...DOCS_SUPLENTE,
  // ELEITORA
  { titulo: "Dados da Entidade Eleitora", descricao: "Preencha as informações da entidade eleitora", component: EtapaDadosEntidadeEleitora, type: "entidadeEleitora", soParaEleitora: true },
  { titulo: "Endereço da Sede", descricao: "Informe o endereço completo da sede da entidade eleitora", component: EtapaEnderecoEleitora, type: "enderecoEleitora", soParaEleitora: true },
  ...DOCS_ELEIT_ENTIDADE,
  ...DOCS_ELEIT_REP,
  // Revisão (sempre último)
  { titulo: "Revisão e Envio", descricao: "Revise todos os dados antes de enviar a inscrição", component: EtapaRevisaoDadosAiuvl, type: "revisao" },
];

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

interface FormularioInscricaoAiuvlProps {
  tipoInicial?: "CANDIDATO" | "ELEITOR";
  segmentosHabilitados?: string[];
}

export default function FormularioInscricaoAiuvl({ tipoInicial, segmentosHabilitados }: FormularioInscricaoAiuvlProps) {
  const router = useRouter();

  const methods = useForm<FormularioAiuvlData>({
    resolver: zodResolver(formularioAiuvlSchema),
    mode: "onChange",
    defaultValues: {
      tipoInscricao: tipoInicial,
      entidadeCandidata: {},
      titular: {},
      suplente: {},
      entidadeEleitora: {},
    },
  });

  const { watch, handleSubmit, trigger, formState: { isSubmitting } } = methods;
  const tipoInscricao = watch("tipoInscricao");

  const todosValores = watch();
  const totalBytesArquivos = ALL_DOC_FIELDS.reduce((sum, field) => {
    const file = todosValores[field];
    return file instanceof File ? sum + file.size : sum;
  }, 0);
  const percentualUpload = Math.min((totalBytesArquivos / LIMITE_UPLOAD_BYTES) * 100, 100);
  const statusUpload = totalBytesArquivos > 240 * 1024 * 1024 ? "critico"
    : totalBytesArquivos > 200 * 1024 * 1024 ? "alerta" : "ok";

  const [step, setStep] = useState(0);
  const [mostrarBannerRascunho, setMostrarBannerRascunho] = useState(false);
  const salvarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const rascunho = carregarRascunho();
    if (!rascunho?.valores?.tipoInscricao) return;
    if (!tipoInicial || rascunho.valores.tipoInscricao === tipoInicial) {
      setMostrarBannerRascunho(true);
    }
  }, [tipoInicial]);

  useEffect(() => {
    const subscription = watch((valores) => {
      if (salvarTimer.current) clearTimeout(salvarTimer.current);
      salvarTimer.current = setTimeout(() => {
        salvarRascunho(step, valores as FormularioAiuvlData);
      }, 800);
    });
    return () => {
      subscription.unsubscribe();
      if (salvarTimer.current) clearTimeout(salvarTimer.current);
    };
  }, [watch, step]);

  const restaurarRascunho = () => {
    const rascunho = carregarRascunho();
    if (!rascunho) return;
    methods.reset(rascunho.valores as FormularioAiuvlData);
    setStep(rascunho.step);
    setMostrarBannerRascunho(false);
    toast.success("Rascunho restaurado. Continue de onde parou.");
  };

  const descartarRascunho = () => {
    limparRascunho();
    setMostrarBannerRascunho(false);
  };

  const stepsBase = useMemo(() => {
    if (!segmentosHabilitados?.length) return ALL_STEPS;
    const SegmentoFiltrado = criarEtapaSegmento(segmentosHabilitados);
    return ALL_STEPS.map((s) => s.type === "segmento" ? { ...s, component: SegmentoFiltrado } : s);
  }, [segmentosHabilitados]);

  const activeSteps = useMemo(() => {
    return stepsBase.filter((s) => {
      if (tipoInicial && s.type === "tipoInscricao") return false;
      if (s.soParaCandidata && tipoInscricao !== "CANDIDATO") return false;
      if (s.soParaEleitora && tipoInscricao !== "ELEITOR") return false;
      return true;
    });
  }, [stepsBase, tipoInscricao, tipoInicial]);

  const stepAtual = activeSteps[step] ?? activeSteps[0];
  const progresso = ((step + 1) / activeSteps.length) * 100;
  const isUltimo = step === activeSteps.length - 1;
  const isPrimeiro = step === 0;
  const Componente = stepAtual?.component;

  const getFieldsToValidate = (s: StepDef): string[] => {
    switch (s.type) {
      case "tipoInscricao": return ["tipoInscricao"];
      case "segmento": return tipoInscricao === "CANDIDATO"
        ? ["entidadeCandidata.segmento"]
        : ["entidadeEleitora.segmento"];
      case "entidadeCandidata": return [
        "entidadeCandidata.razaoSocial", "entidadeCandidata.cnpj", "entidadeCandidata.dataAbertura",
        "entidadeCandidata.emailEntidade", "entidadeCandidata.confirmEmailEntidade",
        "entidadeCandidata.repNome", "entidadeCandidata.repCpf",
      ];
      case "enderecoCandidata": return [
        "entidadeCandidata.cep", "entidadeCandidata.logradouro", "entidadeCandidata.numero",
        "entidadeCandidata.bairro", "entidadeCandidata.cidade", "entidadeCandidata.uf",
      ];
      case "entidadeEleitora": return [
        "entidadeEleitora.razaoSocial", "entidadeEleitora.cnpj", "entidadeEleitora.dataAbertura",
        "entidadeEleitora.emailEntidade", "entidadeEleitora.confirmEmailEntidade",
        "entidadeEleitora.repNome", "entidadeEleitora.repCpf", "entidadeEleitora.segmentoVotacao",
      ];
      case "enderecoEleitora": return [
        "entidadeEleitora.cep", "entidadeEleitora.logradouro", "entidadeEleitora.numero",
        "entidadeEleitora.bairro", "entidadeEleitora.cidade", "entidadeEleitora.uf",
      ];
      case "titular": return ["titular"];
      case "suplente": return ["suplente"];
      case "doc": return s.docField && s.obrigatorio !== false ? [s.docField] : [];
      default: return [];
    }
  };

  const avancar = async () => {
    const fields = getFieldsToValidate(stepAtual);
    if (fields.length > 0) {
      const ok = await trigger(fields as any);
      if (!ok) return;
    }
    if (!isUltimo) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const voltar = () => {
    if (!isPrimeiro) { setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const pular = () => {
    if (!isUltimo) { setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const onSubmit = async (data: FormularioAiuvlData) => {
    const formData = new FormData();
    formData.append("tipoInscricao", data.tipoInscricao);

    if (data.tipoInscricao === "CANDIDATO" && data.entidadeCandidata) {
      const ec = data.entidadeCandidata as EntidadeCandidataAiuvlData;
      const sede = [ec.logradouro, ec.numero, ec.complemento || null, ec.bairro, `${ec.cidade}/${ec.uf}`, `CEP ${ec.cep}`].filter(Boolean).join(", ");
      formData.append("entidadeCandidata.razaoSocial", ec.razaoSocial);
      formData.append("entidadeCandidata.cnpj", ec.cnpj);
      formData.append("entidadeCandidata.segmento", ec.segmento);
      formData.append("entidadeCandidata.dataAbertura", ec.dataAbertura);
      formData.append("entidadeCandidata.sede", sede);
      formData.append("entidadeCandidata.repNome", ec.repNome);
      formData.append("entidadeCandidata.repCpf", ec.repCpf);
      formData.append("entidadeCandidata.repTituloEleitor", ec.repTituloEleitor ?? "");
      formData.append("entidadeCandidata.repDomicilio", ec.repDomicilio ?? "");
      formData.append("entidadeCandidata.emailEntidade", ec.emailEntidade);
      formData.append("entidadeCandidata.telefone", ec.telefone ?? "");
      // confirmEmailEntidade is UI-only, not sent

      const appendCandidato = (prefix: string, c: CandidatoAiuvlData | undefined) => {
        if (!c) return;
        formData.append(`${prefix}.nome`, c.nome);
        formData.append(`${prefix}.nomeSocial`, c.nomeSocial ?? "");
        formData.append(`${prefix}.genero`, c.genero);
        formData.append(`${prefix}.dataNascimento`, c.dataNascimento);
        formData.append(`${prefix}.cpf`, c.cpf);
        formData.append(`${prefix}.tituloEleitor`, c.tituloEleitor ?? "");
        formData.append(`${prefix}.domicilioEleitoral`, c.domicilioEleitoral ?? "");
        formData.append(`${prefix}.email`, c.email);
        formData.append(`${prefix}.telefone`, c.telefone ?? "");
      };

      appendCandidato("titular", data.titular as CandidatoAiuvlData);
      appendCandidato("suplente", data.suplente as CandidatoAiuvlData);

      const docsCandEnt: (keyof FormularioAiuvlData)[] = [
        "candEntRequerimento", "candEntDeclaracaoAtuacao", "candEntEstatuto",
        "candEntAtaEleicao", "candEntCnpj", "candEntDeclaracaoIdoneidade",
      ];
      for (const k of docsCandEnt) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }

      // Rep legal docs — note: repTituloEleitorDoc is submitted as "repTituloEleitor" (the API key)
      const repDocs: [keyof FormularioAiuvlData, string][] = [
        ["repIdentidade", "repIdentidade"],
        ["repCpfDoc", "repCpfDoc"],
        ["repTituloEleitorDoc", "repTituloEleitor"],
        ["repComprovanteResidencia", "repComprovanteResidencia"],
      ];
      for (const [schemaKey, apiKey] of repDocs) {
        const f = data[schemaKey] as File | null | undefined;
        if (f) formData.append(apiKey, f);
      }

      const docsTitular: (keyof FormularioAiuvlData)[] = ["titularIdentidade", "titularCpfDoc", "titularFoto", "titularTituloEleitor", "titularResidencia", "titularDeclaracao"];
      for (const k of docsTitular) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }

      const docsSuplente: (keyof FormularioAiuvlData)[] = ["suplenteIdentidade", "suplenteCpfDoc", "suplenteFoto", "suplenteTituloEleitor", "suplenteResidencia", "suplenteDeclaracao"];
      for (const k of docsSuplente) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }
    }

    if (data.tipoInscricao === "ELEITOR" && data.entidadeEleitora) {
      const ee = data.entidadeEleitora as EntidadeEleitoraAiuvlData;
      const sede = [ee.logradouro, ee.numero, ee.complemento || null, ee.bairro, `${ee.cidade}/${ee.uf}`, `CEP ${ee.cep}`].filter(Boolean).join(", ");
      formData.append("entidadeEleitora.razaoSocial", ee.razaoSocial);
      formData.append("entidadeEleitora.cnpj", ee.cnpj);
      formData.append("entidadeEleitora.segmento", ee.segmento);
      formData.append("entidadeEleitora.segmentoVotacao", ee.segmentoVotacao);
      formData.append("entidadeEleitora.dataAbertura", ee.dataAbertura);
      formData.append("entidadeEleitora.sede", sede);
      formData.append("entidadeEleitora.repNome", ee.repNome);
      formData.append("entidadeEleitora.repCpf", ee.repCpf);
      formData.append("entidadeEleitora.repTituloEleitor", ee.repTituloEleitor ?? "");
      formData.append("entidadeEleitora.repDomicilio", ee.repDomicilio ?? "");
      formData.append("entidadeEleitora.emailEntidade", ee.emailEntidade);
      formData.append("entidadeEleitora.telefone", ee.telefone ?? "");

      const docsEleit: (keyof FormularioAiuvlData)[] = [
        "eleitEntRequerimento", "eleitEntDeclaracaoAtuacao", "eleitEntEstatuto",
        "eleitEntAtaEleicao", "eleitEntCnpj", "eleitEntDeclaracaoIdoneidade",
        "eleitRepIdentidade", "eleitRepCpfDoc", "eleitRepTituloEleitor", "eleitRepResidencia",
      ];
      for (const k of docsEleit) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }
    }

    try {
      const res = await fetch("/api/aiuvl/inscricao", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Erro ao enviar inscrição");
        return;
      }
      limparRascunho();
      router.push("/aiuvl/agradecimento");
    } catch {
      toast.error("Erro ao enviar inscrição. Tente novamente.");
    }
  };

  if (!stepAtual) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {mostrarBannerRascunho && (
          <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950/30 max-sm:mx-4">
            <RotateCcw className="h-4 w-4 text-amber-600" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-amber-800 dark:text-amber-200 text-sm">
                Encontramos um rascunho salvo da sua inscrição. Deseja continuar de onde parou?
              </span>
              <div className="flex gap-2 sm:ml-auto shrink-0">
                <Button type="button" size="sm" onClick={restaurarRascunho} className="bg-amber-600 hover:bg-amber-700 text-white">
                  Continuar rascunho
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={descartarRascunho} className="text-amber-700">
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Descartar
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5 max-sm:px-8">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Etapa {step + 1} de {activeSteps.length}</span>
            <span>{Math.round(progresso)}%</span>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>

        <Card className="max-sm:rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">{stepAtual.titulo}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{stepAtual.descricao}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Componente />
            {(stepAtual.type === "doc" || stepAtual.type === "revisao") && (
              <div className="border rounded-lg px-4 py-3 bg-muted/20 space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <HardDrive className="h-3.5 w-3.5" />
                    <span>Total de arquivos anexados</span>
                  </div>
                  <span className={
                    statusUpload === "critico" ? "font-semibold text-destructive" :
                    statusUpload === "alerta" ? "font-semibold text-amber-600 dark:text-amber-400" :
                    "font-medium text-muted-foreground"
                  }>
                    {formatarTamanhoArquivo(totalBytesArquivos)} / 250 MB
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      statusUpload === "critico" ? "bg-destructive" :
                      statusUpload === "alerta" ? "bg-amber-500" :
                      "bg-emerald-500"
                    }`}
                    style={{ width: `${percentualUpload}%` }}
                  />
                </div>
                {statusUpload === "critico" && (
                  <p className="text-xs text-destructive">Atenção: o limite de 250 MB está quase sendo atingido. Reduza o tamanho dos arquivos antes de enviar.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center gap-2 max-sm:px-4">
          <Button type="button" variant="outline" onClick={voltar} disabled={isPrimeiro} className="w-full sm:w-auto">
            <ChevronLeft className="h-4 w-4 shrink-0" />
            Voltar
          </Button>

          <div className="flex w-full sm:w-auto gap-2 sm:ml-auto">
            {stepAtual.type === "doc" && stepAtual.obrigatorio === false && (
              <Button type="button" variant="ghost" onClick={pular} className="flex-1 sm:flex-none">
                <SkipForward className="h-4 w-4 shrink-0" />
                Pular
              </Button>
            )}

            {isUltimo ? (
              <Button type="button" onClick={() => handleSubmit(onSubmit)()} disabled={isSubmitting} className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700">
                <Check className="h-4 w-4 shrink-0" />
                {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
              </Button>
            ) : (
              <Button type="button" onClick={avancar} className="flex-1 sm:flex-none">
                Próximo
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
