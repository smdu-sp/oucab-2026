import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Info, Download, AlertTriangle } from "lucide-react";
import { periodoInscricaoCandidatosAiuvlAberto, periodoInscricaoEleitoresAiuvlAberto, prazoCandidatosAiuvlEncerrado, INICIO_INSCRICAO_AIUVL_ELEITORES } from "@/lib/config";

const MapaVisualizacao = dynamic(() => import("./_components/mapa-visualizacao"));

const ANEXOS = [
  { nome: "Anexo I — Requerimento de Inscrição", arquivo: "ANEXO I - REQUERIMENTO DE INSCRIÇÃO.pdf" },
  { nome: "Anexo II — Declaração de Atuação na Região", arquivo: "ANEXO II - DECLARAÇÃO DE ATUAÇÃO NA REGIÃO ABRANGIDA PELO PERÍMETRO E_OU PELO PERÍMETRO EXPANDIDO DA AIU-VL, de acordo com o inciso II do § 1º d.pdf" },
  { nome: "Anexo III — Declaração do Candidato(a)", arquivo: "ANEXO III - DECLARAÇÃO DO CANDIDATO (A).pdf" },
  { nome: "Anexo IV — Declaração de Apresentação de Recurso", arquivo: "ANEXO IV - DECLARAÇÃO DE APRESENTAÇÃO DE RECURSO.pdf" },
  { nome: "Anexo V — Declaração de Idoneidade da Entidade", arquivo: "ANEXO V - DECLARAÇÃO DE IDONEIDADE DA ENTIDADE.pdf" },
  { nome: "Anexo VI — Requerimento do Representante Legal como Eleitor", arquivo: "ANEXO VI - REQUERIMENTO INDICANDO O REPRESENTANTE LEGAL DA ENTIDADE COMO ELEITOR.pdf" },
  { nome: "Anexo VII — Cronograma", arquivo: "ANEXO VII - CRONOGRAMA.pdf" },
];

export default function AiuvlHome() {
  const candidatosAberto = periodoInscricaoCandidatosAiuvlAberto();
  const eleitoresAberto = periodoInscricaoEleitoresAiuvlAberto();
  const candidatosEncerrado = prazoCandidatosAiuvlEncerrado();

  const inicioEleitores = INICIO_INSCRICAO_AIUVL_ELEITORES.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  return (
    <div className="space-y-4">
      {candidatosEncerrado && !eleitoresAberto && (
        <div className="rounded-none md:rounded-md border border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-600 px-6 py-5 flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              Inscrições para candidatos encerradas
            </p>
            {/* <p className="text-sm text-amber-700 dark:text-amber-400">
              O próximo período de inscrição — <strong>Inscrição de Eleitores</strong> — terá início em <strong>{inicioEleitores}</strong>.
            </p> */}
          </div>
        </div>
      )}

      <section className="space-y-6">
        <div className="text-center space-y-2 flex flex-col items-center gap-2">
          <h2 className="text-3xl font-bold">Eleição do Conselho Gestor AIU-VL</h2>
          <p className="text-muted-foreground text-sm">
            Área de Intervenção Urbana Vila Leopoldina-Villa Lobos — biênio 2026-2028
          </p>
          <Link href="/aiuvl/edital/001" className="text-muted-foreground underline hover:text-foreground transition-colors">
            Edital de Eleição AIU-VL
          </Link>
        </div>

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
      </section>

      <section className="text-center space-y-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Pronto para participar?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Faça sua inscrição como candidato ou eleitor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
          {candidatosAberto && (
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/aiuvl/inscricao">
                Inscrição de Candidatos
                <ArrowRight className="ml-2 h-5 w-5" />
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
    </div>
  );
}
