"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Clock } from "lucide-react";
import Link from "next/link";

export default function AgradecimentoAiuvl() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/aiuvl");
    }, 30000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <Card className="text-center shadow-lg border-green-200">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl text-green-700 mb-2">
            Inscrição Realizada com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-lg text-gray-700">
              Sua inscrição para a <strong>AIU-VL — Área de Intervenção Urbana Vila Leopoldina-Villa Lobos</strong> foi enviada com sucesso.
            </p>
            <p className="text-muted-foreground">
              Seus dados foram salvos e estão aguardando análise e aprovação pela Comissão Eleitoral.
            </p>
            <p className="text-muted-foreground text-sm">
              Verifique o e-mail cadastrado para receber as credenciais de acesso ao portal.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-blue-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Próximos Passos
            </h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Você receberá um e-mail com suas credenciais de acesso ao portal</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Sua inscrição será analisada pela Comissão Eleitoral</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Acompanhe o status pelo portal após efetuar login</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/aiuvl" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Voltar ao Início
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/aiuvl/login">
                Acessar o Portal
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Esta página será redirecionada automaticamente para o início em 30 segundos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
