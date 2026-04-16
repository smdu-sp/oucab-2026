import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Info, FileText, Download, CalendarDays, Clock, MapPin } from "lucide-react";
import { prazoAiusceEncerrado } from "@/lib/config";
const MapaVisualizacao = dynamic(() => import("./_components/mapa-visualizacao"));

const ANEXOS = [
  { nome: "Anexo I — Requerimento de Inscrição (Candidatura)", arquivo: "anexo_I.pdf" },
  { nome: "Anexo II — Declaração de Atuação na Área da AIUSCE", arquivo: "anexo_II.pdf" },
  { nome: "Anexo III — Declaração de Hipóteses de Inelegibilidade", arquivo: "anexo_III.pdf" },
  { nome: "Anexo IV — Declaração de Idoneidade", arquivo: "anexo_IV.pdf" },
  { nome: "Anexo V — Requerimento de Procurador", arquivo: "anexo_V.pdf" },
  { nome: "Anexo VI — Requerimento de Inscrição (Eleitora)", arquivo: "anexo_VI.pdf" },
];

const VOTACAO = {
  data: "18 de junho de 2026, quinta-feira",
  hora: "das 17h às 20h",
  local: "Auditório da SP Urbanismo — Edifício Martinelli",
  endereco: "Rua Libero Badaró, 504 — 15º Andar, Sala 154 — Centro, São Paulo/SP",
};

export default function AiusceHome() {
  const podeInscrever = !prazoAiusceEncerrado();

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <div className="text-center flex flex-col items-center gap-1">
          <h2 className="text-2xl font-bold">Sobre as Inscrições</h2>
          <p className="text-muted-foreground max-w-2xl text-center text-sm">
            Eleição para o Conselho Gestor da Área de Intervenção Urbana do Setor Central — biênio 2026-2028.
          </p>
          <div className="flex gap-4 text-sm mt-1">
            <Link href="/aiusce/edital/001" className="text-muted-foreground underline hover:text-foreground transition-colors">
              Edital Nº 001/2026/SPURBANISMO/AIUSCE
            </Link>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Inscrições: 15 de abril a 08 de maio de 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:items-stretch">
          {/* Mapa de abrangência */}
          <Card className="lg:col-span-3 rounded-none md:rounded-md flex flex-col">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base">Área de Abrangência</CardTitle>
              <CardDescription className="text-xs">
                Visualize a região contemplada pela Área de Intervenção Urbana do Setor Central
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-4 pb-4">
              <MapaVisualizacao className="h-full min-h-48" />
            </CardContent>
          </Card>

          {/* Data/horário + Local — coluna direita, mesma altura do mapa */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Data e horário */}
            <Card className="rounded-none md:rounded-md flex-1 flex flex-col">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="w-4 h-4" />
                  Data e Horário da Votação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm flex-1 px-4 pb-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Data</p>
                    <p className="text-muted-foreground">{VOTACAO.data}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Horário</p>
                    <p className="text-muted-foreground">{VOTACAO.hora}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local */}
            <Card className="rounded-none md:rounded-md flex-1 flex flex-col">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="w-4 h-4" />
                  Local da Votação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm flex-1 px-4 pb-4">
                <div>
                  <p className="font-medium text-foreground">{VOTACAO.local}</p>
                  <p className="text-muted-foreground mt-0.5">{VOTACAO.endereco}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VOTACAO.endereco)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Abrir no mapa
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="text-center space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Pronto para se inscrever?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Faça sua inscrição e participe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
          {podeInscrever ? (
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/aiusce/inscricao">
                Iniciar Inscrição
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button className="text-lg px-8" disabled>
              Inscrição Encerrada
            </Button>
          )}
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="https://gestaourbana.prefeitura.sp.gov.br/estruturacao-territorial/areas-de-intervencao-urbana/aiu-do-setor-central/" target="_blank">
              Saiba Mais
              <Info className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
