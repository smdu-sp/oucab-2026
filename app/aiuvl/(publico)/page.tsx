export const dynamic = "force-dynamic";

import Link from "next/link";
import nextDynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Info, Download, AlertTriangle, RefreshCw } from "lucide-react";
import {
  periodoInscricaoCandidatosAiuvlAberto,
  periodoInscricaoEleitoresAiuvlAberto,
  prazoCandidatosAiuvlEncerrado,
  periodoReinscricaoCandidatosAiuvlAberto,
  AIUVL_REABERTURA_SEGMENTOS,
  PRAZO_REABERTURA_AIUVL_CANDIDATOS,
  INICIO_INSCRICAO_AIUVL_ELEITORES,
} from "@/lib/config";

const MapaVisualizacao = nextDynamic(() => import("./_components/mapa-visualizacao"));

const ANEXOS = [
  { nome: "Anexo I — Requerimento de Inscrição", arquivo: "ANEXO I - REQUERIMENTO DE INSCRIÇÃO.pdf" },
  { nome: "Anexo II — Declaração de Atuação na Região", arquivo: "ANEXO II - DECLARAÇÃO DE ATUAÇÃO NA REGIÃO ABRANGIDA PELO PERÍMETRO E_OU PELO PERÍMETRO EXPANDIDO DA AIU-VL, de acordo com o inciso II do § 1º d.pdf" },
  { nome: "Anexo III — Declaração do Candidato(a)", arquivo: "ANEXO III - DECLARAÇÃO DO CANDIDATO (A).pdf" },
  { nome: "Anexo IV — Declaração de Apresentação de Recurso", arquivo: "ANEXO IV - DECLARAÇÃO DE APRESENTAÇÃO DE RECURSO.pdf" },
  { nome: "Anexo V — Declaração de Idoneidade da Entidade", arquivo: "ANEXO V - DECLARAÇÃO DE IDONEIDADE DA ENTIDADE.pdf" },
  { nome: "Anexo VI — Requerimento do Representante Legal como Eleitor", arquivo: "ANEXO VI - REQUERIMENTO INDICANDO O REPRESENTANTE LEGAL DA ENTIDADE COMO ELEITOR.pdf" },
  { nome: "Anexo VII — Cronograma", arquivo: "ANEXO VII - CRONOGRAMA.pdf" },
];

const SEGMENTO_LABELS: Record<string, string> = {
  ONG: "Organização Não Governamental",
  ASSOCIACAO_BAIRRO: "Associação de Bairro",
  ENTIDADE_ACADEMICA: "Entidade Acadêmica / Pesquisa",
  REP_EMPRESARIAL: "Setor Empresarial",
};

export default function AiuvlHome() {
  const candidatosAberto = periodoInscricaoCandidatosAiuvlAberto();
  const eleitoresAberto = periodoInscricaoEleitoresAiuvlAberto();
  const candidatosEncerrado = prazoCandidatosAiuvlEncerrado();
  const reinscricaoAberta = periodoReinscricaoCandidatosAiuvlAberto();

  const prazoReinscricao = PRAZO_REABERTURA_AIUVL_CANDIDATOS.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  const segmentosReinscricaoLabels = AIUVL_REABERTURA_SEGMENTOS.map(
    (s) => SEGMENTO_LABELS[s] ?? s,
  );

  return (
    <div className="space-y-4">
      {reinscricaoAberta && (
        <div className="rounded-none md:rounded-md border border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-600 px-6 py-5 flex gap-4 items-start">
          <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
              Reabertura de Inscrições de Candidatos
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              Inscrições reabertas para: <strong>{segmentosReinscricaoLabels.join(", ")}</strong>.
              {/* {" "}Prazo: até <strong>{prazoReinscricao}</strong>. */}
            </p>
          </div>
        </div>
      )}

      {candidatosEncerrado && !eleitoresAberto && !reinscricaoAberta && (
        <div className="rounded-none md:rounded-md border border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600 px-6 py-5 flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              Inscrições para candidatos encerradas
            </p>
          </div>
        </div>
      )}

      <div className="text-center space-y-2 flex flex-col items-center gap-2 px-4 md:px-0">
        <h2 className="text-3xl font-bold">Eleição do Conselho Gestor AIU-VL</h2>
        <p className="text-muted-foreground text-sm">
          Área de Intervenção Urbana Vila Leopoldina-Villa Lobos — biênio 2026-2028
        </p>
        <Link href="/aiuvl/edital/001" className="text-muted-foreground underline hover:text-foreground transition-colors">
          Edital de Eleição AIU-VL
        </Link>
      </div>

      <section className="rounded-none md:rounded-md border-2 border-primary/20 bg-primary/5 p-6 md:p-8 text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Pronto para participar?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Faça sua inscrição como candidato ou eleitor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
          {candidatosAberto && (
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/aiuvl/inscricao">
                Inscrição de Candidatos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}

          {reinscricaoAberta && !candidatosAberto && (
            <Button asChild size="lg" className="text-lg px-8 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/aiuvl/inscricao?tipo=CANDIDATO">
                Reabertura — Inscrição de Candidatos
                <RefreshCw className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}

          {eleitoresAberto && (
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link href="/aiuvl/inscricao?tipo=ELEITOR">
                Inscrição de Eleitores
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link target="_blank" href="https://prefeitura.sp.gov.br/web/licenciamento/w/participacao_social/conselhos_e_orgaos_colegiados/aiu_vila_leopoldinavilla_lobos/361383">
              Saiba Mais
              <Info className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Card className="rounded-none md:rounded-md">
        <CardHeader>
          <CardTitle>Área de Abrangência</CardTitle>
          <CardDescription>
            Visualize a região contemplada para habilitação de eleitor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapaVisualizacao height="400px" />
        </CardContent>
      </Card>
    </div>
  );
}
