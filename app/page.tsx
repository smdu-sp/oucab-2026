import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const eleicoes = [
  {
    sigla: "OUCAB",
    nome: "Operação Urbana Consorciada Água Branca",
    descricao: "Eleição para o Grupo de Gestão da OUC Água Branca",
    href: "/oucab",
    ativa: true,
  },
  {
    sigla: "AIUSCE",
    nome: "Área de Intervenção Urbana do Setor Central",
    descricao: "Eleição para o Conselho Gestor da AIUSCE",
    href: "/aiusce",
    ativa: true,
  },
];

export default function Home() {
  return (
    <main className="flex-1 container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Sistema de Eleições</h1>
          <p className="text-muted-foreground text-lg">
            Selecione a eleição para acessar as inscrições e informações.
          </p>
        </div>

        <div className="grid gap-4">
          {eleicoes.map((e) => (
            <Link key={e.sigla} href={e.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{e.sigla}</CardTitle>
                    <CardDescription className="text-base">{e.nome}</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{e.descricao}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Prefeitura de São Paulo
        </p>
      </div>
    </main>
  );
}
