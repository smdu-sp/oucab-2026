import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Info } from "lucide-react";
const MapaVisualizacao = dynamic(() => import("./_components/mapa-visualizacao"));
// const MapaLocalVotacao = dynamic(() => import("./_components/mapa-local-votacao"));

export default function Home() {
  const limiteExibicao = new Date(
    process.env.NEXT_PUBLIC_PRAZO_INSCRICAO_EXIBICAO ?? "2026-05-31T23:59:59.999Z"
  );
  const podeInscrever = new Date() <= limiteExibicao;
  return (
    <div className="space-y-8">
      {/* Sobre a OUC */}
      <section className="space-y-6">
        <div className="text-center space-y-2 flex flex-col items-center gap-2">
          <h2 className="text-3xl font-bold">Sobre as Inscrições</h2>
          <div className="flex gap-2">
            <Link href="/oucab/edital/001" className="text-muted-foreground underline">
              Edital Nº 001
            </Link>
            <Link href="/oucab/edital/002" className="text-muted-foreground underline">
              Edital Nº 002
            </Link>
          </div>
          {/* <Button asChild size="lg" className="text-lg mx-4 px-8 bg-amber-500 hover:bg-amber-600 text-white">
            <Link href="/consulta-cadastro">
              Consultar status de inscrição
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-2 rounded-none md:rounded-md flex justify-between">
            <CardHeader>
              <CardTitle>Área de Abrangência</CardTitle>
              <CardDescription>
                Visualize a região contemplada para habilitação de eleitor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MapaVisualizacao className="flex-1 h-full" />
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Pronto para se inscrever?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Faça sua inscrição e participe.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
          {podeInscrever && (
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/oucab/inscricao">
                Iniciar Inscrição
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
          {!podeInscrever && (
            <Button className="text-lg px-8" disabled>
              Inscrição Encerrada
            </Button>
          )}
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <Link href="https://prefeitura.sp.gov.br/web/sp_urbanismo/w/operacoes_urbanas/agua_branca/ouc_agua_branca/325192" target="_blank">
              Saiba Mais
              <Info className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
