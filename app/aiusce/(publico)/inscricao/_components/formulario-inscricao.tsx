"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, SkipForward, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { formularioAiusceSchema, type FormularioAiusceData, type EntidadeCandidataData, type EntidadeEleitoraData, type CandidatoData } from "@/lib/schemas/formulario-aiusce";

import EtapaTipoInscricao from "./etapas/etapa-tipo-inscricao";
import EtapaSegmento from "./etapas/etapa-segmento";
import { EtapaDadosEntidadeCandidata, EtapaDadosEntidadeEleitora } from "./etapas/etapa-dados-entidade";
import { EtapaEnderecoCandidata, EtapaEnderecoEleitora } from "./etapas/etapa-endereco-entidade";
import { EtapaDadosTitular, EtapaDadosSuplente } from "./etapas/etapa-dados-candidato";
import EtapaProcurador from "./etapas/etapa-procurador";
import EtapaArquivoUnico, { criarEtapaDocumento } from "./etapas/etapa-arquivo-unico";
import EtapaRevisaoDados from "./etapas/etapa-revisao-dados";

// ---------------------------------------------------------------------------
// Cache local (localStorage) — persiste dados do formulário entre sessões
// Arquivos (File) não são serializáveis e ficam de fora; tudo mais é salvo.
// ---------------------------------------------------------------------------

const CACHE_KEY = "aiusce:inscricao:rascunho";

type Rascunho = { step: number; valores: Partial<FormularioAiusceData> };

function salvarRascunho(step: number, valores: FormularioAiusceData) {
  try {
    const serializavel = JSON.parse(JSON.stringify(valores, (_k, v) =>
      v instanceof File ? undefined : v
    )) as Partial<FormularioAiusceData>;
    const rascunho: Rascunho = { step, valores: serializavel };
    localStorage.setItem(CACHE_KEY, JSON.stringify(rascunho));
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

type StepType =
  | "tipoInscricao"
  | "segmento"
  | "entidadeCandidata"
  | "enderecoCandidata"
  | "entidadeEleitora"
  | "enderecoEleitora"
  | "titular"
  | "suplente"
  | "procurador"
  | "doc"
  | "revisao";

type StepDef = {
  titulo: string;
  descricao: string;
  component: React.ComponentType;
  type: StepType;
  docField?: keyof FormularioAiusceData;
  obrigatorio?: boolean;
  soParaCandidata?: boolean;
  soParaEleitora?: boolean;
  soSeFormaChapa?: boolean;
  soSeProcurador?: boolean;
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
      "Requerimento de Inscrição (Candidatura)",
      "Requerimento de inscrição da entidade candidata ao Conselho Gestor da AIUSCE, conforme <a href='/aiusce/editais/anexos/anexo_I.pdf' class='text-primary underline' target='_blank'>Anexo I do Edital</a>.",
      ["O modelo está disponível no site da SMUL/SPURBANISMO", "Deve ser assinado pelo representante legal da entidade"],
    ),
    type: "doc",
    docField: "candEntRequerimento",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Declaração de Atuação",
    component: criarEtapaDocumento(
      "candEntDeclaracaoAtuacao",
      "Declaração de Atuação na Área da AIUSCE",
      "Declaração comprovando atuação regular da entidade na área de abrangência da AIUSCE, conforme <a href='/aiusce/editais/anexos/anexo_II.pdf' class='text-primary underline' target='_blank'>Anexo II do Edital</a>.",
      ["Deve conter assinatura do representante legal", "Pode ser elaborada em papel timbrado da entidade"],
    ),
    type: "doc",
    docField: "candEntDeclaracaoAtuacao",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Estatuto Social",
    component: criarEtapaDocumento(
      "candEntEstatuto",
      "Estatuto Social da Entidade",
      "Cópia do estatuto social registrado em cartório, comprovando a existência legal da entidade.",
      ["Deve conter a data de fundação/abertura", "Deve estar registrado em cartório competente"],
    ),
    type: "doc",
    docField: "candEntEstatuto",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Ata de Eleição da Diretoria",
    component: criarEtapaDocumento(
      "candEntAtaEleicao",
      "Ata de Eleição da Diretoria Atual",
      "Ata que comprova a eleição da diretoria ou gestão atual, com o nome do representante legal indicado.",
      ["Deve estar registrada em cartório ou autenticada conforme estatuto"],
    ),
    type: "doc",
    docField: "candEntAtaEleicao",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Comprovante de CNPJ",
    component: criarEtapaDocumento(
      "candEntCnpj",
      "Comprovante de CNPJ (Cartão CNPJ)",
      "Comprovante de situação cadastral do CNPJ da entidade emitido pela Receita Federal.",
      ["Disponível em: https://www.receita.fazenda.gov.br", "Deve estar com situação ativa"],
    ),
    type: "doc",
    docField: "candEntCnpj",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Declaração de Idoneidade",
    component: criarEtapaDocumento(
      "candEntDeclaracaoIdoneidade",
      "Declaração de Idoneidade",
      "Declaração de que a entidade e seus representantes não possuem impedimentos legais para participação no processo eleitoral, conforme <a href='/aiusce/editais/anexos/anexo_IV.pdf' class='text-primary underline' target='_blank'>Anexo IV do Edital</a>.",
      ["Modelo disponível no site da SMUL/SPURBANISMO"],
    ),
    type: "doc",
    docField: "candEntDeclaracaoIdoneidade",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Requerimento de Inscrição Eleitora (Anexo V)",
    component: criarEtapaDocumento(
      "eleitEntRequerimento",
      "Requerimento de Inscrição de Entidade Eleitora (Anexo V)",
      "As entidades candidatas são automaticamente habilitadas como eleitoras (Art. 3°, §3°). Envie o requerimento conforme modelo do Edital, no <a href='/aiusce/editais/anexos/anexo_V.pdf' class='text-primary underline' target='_blank'>Anexo V</a>.",
      ["Modelo disponível no site da SMUL/SPURBANISMO", "Deve ser assinado pelo representante legal da entidade"],
    ),
    type: "doc",
    docField: "eleitEntRequerimento",
    soParaCandidata: true,
  },
];

const DOCS_TITULAR: StepDef[] = [
  {
    titulo: "Documentos do Titular",
    descricao: "Documento de Identidade",
    component: criarEtapaDocumento(
      "titularIdentidade",
      "Documento de Identificação do Titular",
      "Cópia de documento oficial com foto do candidato titular.",
      ["RG, CNH, Passaporte ou equivalente", "Documento deve estar dentro da validade"],
    ),
    type: "doc",
    docField: "titularIdentidade",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Titular",
    descricao: "Título de Eleitor",
    component: criarEtapaDocumento(
      "titularTituloEleitor",
      "Título de Eleitor do Titular",
      "Cópia do título de eleitor do candidato titular, com domicílio eleitoral em São Paulo/SP.",
      ["Comprova o domicílio eleitoral em São Paulo/SP, requisito obrigatório do edital"],
    ),
    type: "doc",
    docField: "titularTituloEleitor",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Titular",
    descricao: "CPF",
    component: criarEtapaDocumento(
      "titularCpf",
      "CPF do Titular",
      "Certidão atualizada do CPF que pode ser obtida através do <a href='https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp' class='text-primary underline' target='_blank'>portal da Receita Federal</a>.",
    ),
    type: "doc",
    docField: "titularCpf",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Titular",
    descricao: "Foto 3x4",
    component: criarEtapaDocumento(
      "titularFoto",
      "Foto do Titular",
      "Foto 3x4 recente do candidato titular para identificação.",
      ["Foto com fundo claro, rosto visível", "Formato JPG ou PNG"],
    ),
    type: "doc",
    docField: "titularFoto",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Titular",
    descricao: "Declaração de Hipóteses de Inelegibilidade",
    component: criarEtapaDocumento(
      "titularNaoImpedimento",
      "Declaração de Hipóteses de Inelegibilidade",
      "Declaração de cada candidato de que não incorre nas vedações constantes do artigo 1º do Decreto municipal nº 53.177/2012, que estabelece as hipóteses impeditivas de nomeação, contratação, admissão, designação, posse ou início de exercício para cargo, emprego ou função pública, em caráter efetivo ou em comissão, Municipal, Estadual ou Federal, da Administração Pública direta ou indireta dos poderes executivo, legislativo e judiciário, ou ainda detentor de mandato eletivo, cujo modelo consta do <a href='/aiusce/editais/anexos/anexo_III.pdf' class='text-primary underline' target='_blank'>Anexo III deste edital</a>.",
    ),
    type: "doc",
    docField: "titularNaoImpedimento",
    soParaCandidata: true,
  },
];

const DOCS_SUPLENTE: StepDef[] = [
  {
    titulo: "Documentos do Suplente",
    descricao: "Documento de Identidade",
    component: criarEtapaDocumento(
      "suplenteIdentidade",
      "Documento de Identificação do Suplente",
      "Cópia de documento oficial com foto do candidato suplente.",
      ["RG, CNH, Passaporte ou equivalente"],
    ),
    type: "doc",
    docField: "suplenteIdentidade",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Suplente",
    descricao: "Título de Eleitor",
    component: criarEtapaDocumento(
      "suplenteTituloEleitor",
      "Título de Eleitor do Suplente",
      "Cópia do título de eleitor do candidato suplente, com domicílio eleitoral em São Paulo/SP.",
      ["Comprova o domicílio eleitoral em São Paulo/SP, requisito obrigatório do edital"],
    ),
    type: "doc",
    docField: "suplenteTituloEleitor",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Suplente",
    descricao: "CPF",
    component: criarEtapaDocumento(
      "suplenteCpf",
      "CPF do Suplente",
      "Certidão atualizada do CPF que pode ser obtida através do <a href='https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp' class='text-primary underline' target='_blank'>portal da Receita Federal</a>.",
    ),
    type: "doc",
    docField: "suplenteCpf",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Suplente",
    descricao: "Foto 3x4",
    component: criarEtapaDocumento(
      "suplenteFoto",
      "Foto do Suplente",
      "Foto 3x4 recente do candidato suplente para identificação.",
      ["Foto com fundo claro, rosto visível", "Formato JPG ou PNG"],
    ),
    type: "doc",
    docField: "suplenteFoto",
    soParaCandidata: true,
  },
  {
    titulo: "Documentos do Suplente",
    descricao: "Declaração de Hipóteses de Inelegibilidade",
    component: criarEtapaDocumento(
      "suplenteNaoImpedimento",
      "Declaração de Hipóteses de Inelegibilidade",
      "Declaração de cada candidato de que não incorre nas vedações constantes do artigo 1º do Decreto municipal nº 53.177/2012, que estabelece as hipóteses impeditivas de nomeação, contratação, admissão, designação, posse ou início de exercício para cargo, emprego ou função pública, em caráter efetivo ou em comissão, Municipal, Estadual ou Federal, da Administração Pública direta ou indireta dos poderes executivo, legislativo e judiciário, ou ainda detentor de mandato eletivo, cujo modelo consta do <a href='/aiusce/editais/anexos/anexo_III.pdf' class='text-primary underline' target='_blank'>Anexo III deste edital</a>.",
    ),
    type: "doc",
    docField: "suplenteNaoImpedimento",
    soParaCandidata: true,
  },
];

// ---------------------------------------------------------------------------
// Documentos — Eleitora
// ---------------------------------------------------------------------------

const DOCS_ELEIT_ENTIDADE: StepDef[] = [
  {
    titulo: "Documentos da Entidade",
    descricao: "Requerimento de Inscrição",
    component: criarEtapaDocumento(
      "eleitEntRequerimento",
      "Requerimento de Inscrição (Eleitora)",
      "Requerimento de inscrição da entidade eleitora, conforme modelo do Edital, no <a href='/aiusce/editais/anexos/anexo_V.pdf' class='text-primary underline' target='_blank'>Anexo V</a>.",
    ),
    type: "doc",
    docField: "eleitEntRequerimento",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Declaração de Atuação",
    component: criarEtapaDocumento(
      "eleitEntDeclaracaoAtuacao",
      "Declaração de Atuação na Área da AIUSCE",
      "Declaração comprovando atuação regular da entidade na área de abrangência da AIUSCE, conforme <a href='/aiusce/editais/anexos/anexo_II.pdf' class='text-primary underline' target='_blank'>Anexo II do Edital</a>.",
    ),
    type: "doc",
    docField: "eleitEntDeclaracaoAtuacao",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Estatuto Social",
    component: criarEtapaDocumento(
      "eleitEntEstatuto",
      "Estatuto Social da Entidade",
      "Cópia do estatuto social registrado, comprovando a existência legal da entidade.",
    ),
    type: "doc",
    docField: "eleitEntEstatuto",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Ata de Eleição da Diretoria",
    component: criarEtapaDocumento(
      "eleitEntAtaEleicao",
      "Ata de Eleição da Diretoria Atual",
      "Ata que comprova a eleição da diretoria ou gestão atual.",
    ),
    type: "doc",
    docField: "eleitEntAtaEleicao",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Comprovante de CNPJ",
    component: criarEtapaDocumento(
      "eleitEntCnpj",
      "Comprovante de CNPJ (Cartão CNPJ)",
      "Comprovante de situação cadastral do CNPJ emitido pela Receita Federal.",
      ["Deve estar com situação ativa"],
    ),
    type: "doc",
    docField: "eleitEntCnpj",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos da Entidade",
    descricao: "Declaração de Idoneidade",
    component: criarEtapaDocumento(
      "eleitEntDeclaracaoIdoneidade",
      "Declaração de Idoneidade",
      "Declaração de que a entidade e seus representantes não possuem impedimentos legais, conforme <a href='/aiusce/editais/anexos/anexo_IV.pdf' class='text-primary underline' target='_blank'>Anexo IV do Edital</a>.",
    ),
    type: "doc",
    docField: "eleitEntDeclaracaoIdoneidade",
    soParaEleitora: true,
  },
];

const DOCS_ELEIT_REP: StepDef[] = [
  {
    titulo: "Documentos do Representante",
    descricao: "Documento de Identidade",
    component: criarEtapaDocumento(
      "eleitRepIdentidade",
      "Documento de Identificação do Representante Legal",
      "Cópia de documento oficial com foto do representante legal da entidade.",
    ),
    type: "doc",
    docField: "eleitRepIdentidade",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos do Representante",
    descricao: "Título de Eleitor",
    component: criarEtapaDocumento(
      "eleitRepTituloEleitor",
      "Título de Eleitor do Representante",
      "Cópia do título de eleitor do representante legal.",
    ),
    type: "doc",
    docField: "eleitRepTituloEleitor",
    soParaEleitora: true,
  },
  {
    titulo: "Documentos do Representante",
    descricao: "CPF",
    component: criarEtapaDocumento(
      "eleitRepCpf",
      "CPF do Representante",
      "Certidão atualizada do CPF que pode ser obtida através do <a href='https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp' class='text-primary underline' target='_blank'>portal da Receita Federal</a>.",
    ),
    type: "doc",
    docField: "eleitRepCpf",
    soParaEleitora: true,
  },
];

const DOCS_PROCURADOR: StepDef[] = [
  {
    titulo: "Documentos do Procurador",
    descricao: "Procuração",
    component: criarEtapaDocumento(
      "eleitProcProcuracao",
      "Procuração",
      "Procuração outorgando poderes ao procurador para representar a entidade no processo eleitoral.",
      ["Deve ser reconhecida em cartório ou equivalente", "Deve especificar os poderes conferidos para o processo eleitoral da AIUSCE"],
    ),
    type: "doc",
    docField: "eleitProcProcuracao",
    soSeProcurador: true,
  },
];

// ---------------------------------------------------------------------------
// Todos os steps possíveis (em ordem fixa — filtragem dinâmica abaixo)
// ---------------------------------------------------------------------------

const ALL_STEPS: StepDef[] = [
  {
    titulo: "Tipo de Inscrição",
    descricao: "Selecione se a entidade se inscreverá como candidata ou apenas como eleitora",
    component: EtapaTipoInscricao,
    type: "tipoInscricao",
  },
  // Segmento — aparece em ambos os fluxos, logo após tipo de inscrição
  {
    titulo: "Segmento da Entidade",
    descricao: "Selecione o segmento ao qual a entidade pertence",
    component: EtapaSegmento,
    type: "segmento",
  },
  // CANDIDATA
  {
    titulo: "Dados da Entidade Candidato",
    descricao: "Preencha as informações da entidade que se candidata",
    component: EtapaDadosEntidadeCandidata,
    type: "entidadeCandidata",
    soParaCandidata: true,
  },
  {
    titulo: "Endereço da Sede",
    descricao: "Informe o endereço completo da sede da entidade candidato",
    component: EtapaEnderecoCandidata,
    type: "enderecoCandidata",
    soParaCandidata: true,
  },
  {
    titulo: "Dados do Candidato Titular",
    descricao: "Informe os dados do representante titular da entidade",
    component: EtapaDadosTitular,
    type: "titular",
    soParaCandidata: true,
  },
  {
    titulo: "Dados do Candidato Suplente",
    descricao: "Informe os dados do representante suplente da entidade",
    component: EtapaDadosSuplente,
    type: "suplente",
    soParaCandidata: true,
  },
  // ELEITORA — dados
  {
    titulo: "Dados da Entidade Eleitor",
    descricao: "Preencha as informações da entidade eleitor",
    component: EtapaDadosEntidadeEleitora,
    type: "entidadeEleitora",
    soParaEleitora: true,
  },
  {
    titulo: "Endereço da Sede",
    descricao: "Informe o endereço completo da sede da entidade eleitor",
    component: EtapaEnderecoEleitora,
    type: "enderecoEleitora",
    soParaEleitora: true,
  },
  // Procurador — aparece em ambos os fluxos, último passo de dados antes dos documentos
  {
    titulo: "Procurador",
    descricao: "Indique se a entidade terá um procurador no processo eleitoral",
    component: EtapaProcurador,
    type: "procurador",
  },
  // DOCUMENTOS — Candidata
  ...DOCS_CAND_ENTIDADE,
  ...DOCS_TITULAR,
  ...DOCS_SUPLENTE,
  {
    titulo: "Requerimento de Chapa",
    descricao: "Requerimento de formação de chapa entre entidades",
    component: criarEtapaDocumento(
      "chapaRequerimento",
      "Requerimento de Formação de Chapa",
      "Requerimento conjunto das entidades que formam a chapa, conforme <a href='/aiusce/anexos/anexo-vi.pdf' target='_blank'>Anexo VI</a> do Edital.",
      ["Deve ser assinado pelos representantes de ambas as entidades"],
    ),
    type: "doc",
    docField: "chapaRequerimento",
    soParaCandidata: true,
    soSeFormaChapa: true,
  },
  // DOCUMENTOS — Eleitora
  ...DOCS_ELEIT_ENTIDADE,
  ...DOCS_ELEIT_REP,
  // DOCUMENTOS — Procurador (ambos os fluxos)
  ...DOCS_PROCURADOR,
  // Revisão (sempre último)
  {
    titulo: "Revisão e Envio",
    descricao: "Revise todos os dados antes de enviar a inscrição",
    component: EtapaRevisaoDados,
    type: "revisao",
  },
];

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function FormularioInscricao() {
  const router = useRouter();

  const methods = useForm<FormularioAiusceData>({
    resolver: zodResolver(formularioAiusceSchema),
    mode: "onChange",
    defaultValues: {
      tipoInscricao: undefined,
      entidadeCandidata: {
        formaChapa: false,
      },
      temProcurador: false,
      titular: {},
      suplente: {},
    },
  });

  const { watch, handleSubmit, trigger, formState: { isSubmitting } } = methods;
  const tipoInscricao = watch("tipoInscricao");
  const formaChapa = watch("entidadeCandidata.formaChapa") ?? false;
  const temProcurador = watch("temProcurador") ?? false;

  const [step, setStep] = useState(0);
  const [mostrarBannerRascunho, setMostrarBannerRascunho] = useState(false);
  const salvarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ao montar: verifica se há rascunho salvo
  useEffect(() => {
    const rascunho = carregarRascunho();
    if (rascunho?.valores?.tipoInscricao) {
      setMostrarBannerRascunho(true);
    }
  }, []);

  // A cada mudança nos valores: salva no localStorage (debounce 800ms)
  useEffect(() => {
    const subscription = watch((valores) => {
      if (salvarTimer.current) clearTimeout(salvarTimer.current);
      salvarTimer.current = setTimeout(() => {
        salvarRascunho(step, valores as FormularioAiusceData);
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
    methods.reset(rascunho.valores as FormularioAiusceData);
    setStep(rascunho.step);
    setMostrarBannerRascunho(false);
    toast.success("Rascunho restaurado. Continue de onde parou.");
  };

  const descartarRascunho = () => {
    limparRascunho();
    setMostrarBannerRascunho(false);
  };

  // Steps ativos conforme tipo de inscrição e flags
  const activeSteps = useMemo(() => {
    return ALL_STEPS.filter((s) => {
      if (s.soParaCandidata && tipoInscricao !== "CANDIDATO") return false;
      if (s.soParaEleitora && tipoInscricao !== "ELEITOR") return false;
      if (s.soSeFormaChapa && !formaChapa) return false;
      if (s.soSeProcurador && !temProcurador) return false;
      return true;
    });
  }, [tipoInscricao, formaChapa, temProcurador]);

  const stepAtual = activeSteps[step] ?? activeSteps[0];
  const progresso = ((step + 1) / activeSteps.length) * 100;
  const isUltimo = step === activeSteps.length - 1;
  const isPrimeiro = step === 0;

  const Componente = stepAtual?.component;

  // Campos a validar em cada tipo de step
  const getFieldsToValidate = (s: StepDef): string[] => {
    switch (s.type) {
      case "tipoInscricao": return ["tipoInscricao"];
      case "segmento": return tipoInscricao === "CANDIDATO"
        ? ["entidadeCandidata.segmento"]
        : ["entidadeEleitora.segmento"];
      case "entidadeCandidata": return [
        "entidadeCandidata.razaoSocial",
        "entidadeCandidata.cnpj",
        "entidadeCandidata.dataAbertura",
        "entidadeCandidata.emailEntidade",
        "entidadeCandidata.repNome",
        "entidadeCandidata.repCpf",
      ];
      case "enderecoCandidata": return [
        "entidadeCandidata.cep",
        "entidadeCandidata.logradouro",
        "entidadeCandidata.numero",
        "entidadeCandidata.bairro",
        "entidadeCandidata.cidade",
        "entidadeCandidata.uf",
      ];
      case "entidadeEleitora": return [
        "entidadeEleitora.razaoSocial",
        "entidadeEleitora.cnpj",
        "entidadeEleitora.dataAbertura",
        "entidadeEleitora.emailEntidade",
        "entidadeEleitora.repNome",
        "entidadeEleitora.repCpf",
      ];
      case "enderecoEleitora": return [
        "entidadeEleitora.cep",
        "entidadeEleitora.logradouro",
        "entidadeEleitora.numero",
        "entidadeEleitora.bairro",
        "entidadeEleitora.cidade",
        "entidadeEleitora.uf",
      ];
      case "titular": return ["titular"];
      case "suplente": return ["suplente"];
      case "procurador": return [];
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
    if (!isPrimeiro) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pular = () => {
    if (!isUltimo) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: FormularioAiusceData) => {
    console.log("✅ onSubmit chamado, data:", data);
    const formData = new FormData();
    formData.append("tipoInscricao", data.tipoInscricao);

    if (data.tipoInscricao === "CANDIDATO" && data.entidadeCandidata) {
      // superRefine garante que todos os campos obrigatórios estão presentes
      const ec = data.entidadeCandidata as EntidadeCandidataData;
      const sedeCand = [
        ec.logradouro,
        ec.numero,
        ec.complemento || null,
        ec.bairro,
        `${ec.cidade}/${ec.uf}`,
        `CEP ${ec.cep}`,
      ].filter(Boolean).join(", ");
      formData.append("entidadeCandidata.razaoSocial", ec.razaoSocial);
      formData.append("entidadeCandidata.cnpj", ec.cnpj);
      formData.append("entidadeCandidata.segmento", ec.segmento);
      formData.append("entidadeCandidata.dataAbertura", ec.dataAbertura);
      formData.append("entidadeCandidata.sede", sedeCand);
      formData.append("entidadeCandidata.repNome", ec.repNome);
      formData.append("entidadeCandidata.repCpf", ec.repCpf);
      formData.append("entidadeCandidata.emailEntidade", ec.emailEntidade);
      formData.append("entidadeCandidata.telefone", ec.telefone ?? "");
      formData.append("entidadeCandidata.formaChapa", String(ec.formaChapa ?? false));
      formData.append("entidadeCandidata.cnpjChapa", ec.cnpjChapa ?? "");

      const appendCandidato = (prefix: string, c: CandidatoData | undefined) => {
        if (!c) return;
        formData.append(`${prefix}.nome`, c.nome);
        formData.append(`${prefix}.nomeSocial`, c.nomeSocial ?? "");
        formData.append(`${prefix}.nomeEmpresa`, c.nomeEmpresa ?? "");
        formData.append(`${prefix}.genero`, c.genero);
        formData.append(`${prefix}.dataNascimento`, c.dataNascimento);
        formData.append(`${prefix}.cpf`, c.cpf);
        formData.append(`${prefix}.tituloEleitor`, c.tituloEleitor ?? "");
        formData.append(`${prefix}.domicilioEleitoral`, c.domicilioEleitoral ?? "");
        formData.append(`${prefix}.email`, c.email);
        formData.append(`${prefix}.telefone`, c.telefone ?? "");

      };

      appendCandidato("titular", data.titular as CandidatoData);
      appendCandidato("suplente", data.suplente as CandidatoData);

      const docsCand: (keyof FormularioAiusceData)[] = [
        "candEntRequerimento", "candEntDeclaracaoAtuacao", "candEntEstatuto",
        "candEntAtaEleicao", "candEntCnpj", "candEntDeclaracaoIdoneidade",
        "eleitEntRequerimento",
        "titularIdentidade", "titularTituloEleitor", "titularCpf", "titularFoto", "titularNaoImpedimento",
        "suplenteIdentidade", "suplenteTituloEleitor", "suplenteCpf", "suplenteFoto", "suplenteNaoImpedimento",
        "chapaRequerimento",
      ];
      for (const k of docsCand) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }

      // Candidatas são automaticamente eleitoras — pode haver procurador (Art. 3°, §3°)
      formData.append("temProcurador", String(data.temProcurador ?? false));
      if (data.temProcurador && data.procurador) {
        formData.append("procurador.nome", data.procurador.nome);
        formData.append("procurador.cpf", data.procurador.cpf);
        if (data.procurador.tituloEleitor) formData.append("procurador.tituloEleitor", data.procurador.tituloEleitor);
        const docsProc: (keyof FormularioAiusceData)[] = ["eleitProcProcuracao"];
        for (const k of docsProc) {
          const f = data[k] as File | null | undefined;
          if (f) formData.append(k, f);
        }
      }
    }

    if (data.tipoInscricao === "ELEITOR" && data.entidadeEleitora) {
      const ee = data.entidadeEleitora as EntidadeEleitoraData;
      const sedeEleit = [
        ee.logradouro,
        ee.numero,
        ee.complemento || null,
        ee.bairro,
        `${ee.cidade}/${ee.uf}`,
        `CEP ${ee.cep}`,
      ].filter(Boolean).join(", ");
      formData.append("entidadeEleitora.razaoSocial", ee.razaoSocial);
      formData.append("entidadeEleitora.cnpj", ee.cnpj);
      formData.append("entidadeEleitora.segmento", ee.segmento);
      formData.append("entidadeEleitora.dataAbertura", ee.dataAbertura);
      formData.append("entidadeEleitora.sede", sedeEleit);
      formData.append("entidadeEleitora.repNome", ee.repNome);
      formData.append("entidadeEleitora.repCpf", ee.repCpf);
      formData.append("entidadeEleitora.repTituloEleitor", ee.repTituloEleitor ?? "");
      formData.append("entidadeEleitora.repDomicilio", ee.repDomicilio ?? "");
      formData.append("entidadeEleitora.emailEntidade", ee.emailEntidade);
      formData.append("entidadeEleitora.telefone", ee.telefone ?? "");
      formData.append("temProcurador", String(data.temProcurador ?? false));

      if (data.temProcurador && data.procurador) {
        formData.append("procurador.nome", data.procurador.nome);
        formData.append("procurador.cpf", data.procurador.cpf);
        if (data.procurador.tituloEleitor) formData.append("procurador.tituloEleitor", data.procurador.tituloEleitor);
      }

      const docsEleit: (keyof FormularioAiusceData)[] = [
        "eleitEntRequerimento", "eleitEntDeclaracaoAtuacao", "eleitEntEstatuto",
        "eleitEntAtaEleicao", "eleitEntCnpj", "eleitEntDeclaracaoIdoneidade",
        "eleitRepIdentidade", "eleitRepTituloEleitor", "eleitRepCpf",
        "eleitProcProcuracao",
      ];
      for (const k of docsEleit) {
        const f = data[k] as File | null | undefined;
        if (f) formData.append(k, f);
      }
    }

    try {
      const res = await fetch("/api/aiusce/inscricao", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error ?? "Erro ao enviar inscrição");
        return;
      }

      limparRascunho();
      router.push("/aiusce/agradecimento");
    } catch {
      toast.error("Erro ao enviar inscrição. Tente novamente.");
    }
  };

  if (!stepAtual) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Banner de rascunho salvo */}
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

        {/* Barra de progresso */}
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
          <CardContent>
            <Componente />
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex flex-col sm:flex-row items-center gap-2 max-sm:px-4">
          <Button
            type="button"
            variant="outline"
            onClick={voltar}
            disabled={isPrimeiro}
            className="w-full sm:w-auto"
          >
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
              <Button type="button" onClick={() => handleSubmit(onSubmit)()} disabled={isSubmitting} className="flex-1 sm:flex-none">
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

