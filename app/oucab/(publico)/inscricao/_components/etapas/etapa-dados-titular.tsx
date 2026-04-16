"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { CandidatoPFForm } from "./etapa-dados-organizacao";

export default function EtapaDadosTitular() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-blue-600" />
        <Badge variant="outline" className="text-blue-600 border-blue-600">Candidato Titular</Badge>
      </div>
      <CandidatoPFForm prefix="titular" />
    </div>
  );
}
