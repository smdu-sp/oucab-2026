"use client";

import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

interface Props {
  busca?: string;
  status?: string;
  segmento?: string;
}

export default function BtnExportarCandidaturasAiuvl({ busca, status, segmento }: Props) {
  function handleExportar() {
    const params = new URLSearchParams();
    if (busca) params.set("busca", busca);
    if (status && status !== "all") params.set("status", status);
    if (segmento && segmento !== "all") params.set("segmento", segmento);
    const qs = params.toString();
    window.location.href = `/api/aiuvl/candidaturas/exportar${qs ? `?${qs}` : ""}`;
  }

  return (
    <Button type="button" variant="outline" onClick={handleExportar} className="gap-2">
      <FileDown className="size-4" />
      Exportar XLSX
    </Button>
  );
}
