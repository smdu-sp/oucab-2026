"use client";

import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, AlertCircle, CheckCircle } from "lucide-react";
import { CandidatoPFForm } from "./etapa-dados-organizacao";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";

export default function EtapaDadosSuplente() {
  const { watch } = useFormContext<FormularioInscricaoData>();
  const titularGenero = watch("titular.genero" as any);
  const suplanteGenero = watch("suplente.genero" as any);

  const temParidade =
    titularGenero === "FEMININO" || titularGenero === "OUTRO" ||
    suplanteGenero === "FEMININO" || suplanteGenero === "OUTRO";

  const ambosPreenchidos = titularGenero && suplanteGenero;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-orange-600" />
        <Badge variant="outline" className="text-orange-600 border-orange-600">Candidato Suplente</Badge>
      </div>

      {ambosPreenchidos && !temParidade && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-500">
            É necessário que ao menos um dos candidatos (titular ou suplente) seja do gênero feminino ou autodeclarado para garantir a paridade de gênero.
          </AlertDescription>
        </Alert>
      )}

      {ambosPreenchidos && temParidade && (
        <Alert className="border-green-500 text-green-700 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            Paridade de gênero atendida.
          </AlertDescription>
        </Alert>
      )}

      <CandidatoPFForm prefix="suplente" />
    </div>
  );
}
