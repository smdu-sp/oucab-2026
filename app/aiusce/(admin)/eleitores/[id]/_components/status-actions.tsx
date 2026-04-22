"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/config";

interface StatusActionsProps {
  id: string;
  statusAtual: string;
  isDev?: boolean;
  oculto?: boolean;
}

export function StatusActions({ id, statusAtual, isDev, oculto }: StatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function atualizar(novoStatus: string) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/aiusce/eleitores/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function toggleOcultar() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/aiusce/eleitores/${id}/ocultar`, { method: "PATCH" });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="default" disabled={loading || statusAtual === "DEFERIDO"} onClick={() => atualizar("DEFERIDO")}>
        <CheckCircle className="mr-2 h-4 w-4" />
        Deferir
      </Button>
      <Button variant="destructive" disabled={loading || statusAtual === "INDEFERIDO"} onClick={() => atualizar("INDEFERIDO")}>
        <XCircle className="mr-2 h-4 w-4" />
        Indeferir
      </Button>
      {statusAtual !== "EM_ANALISE" && (
        <Button variant="outline" disabled={loading} onClick={() => atualizar("EM_ANALISE")}>
          Retornar para Análise
        </Button>
      )}
      {isDev && (
        <Button
          variant="outline"
          disabled={loading}
          onClick={toggleOcultar}
          className={oculto ? "border-amber-500 text-amber-600 hover:bg-amber-50" : ""}>
          {oculto ? (
            <><Eye className="mr-2 h-4 w-4" />Tornar Visível</>
          ) : (
            <><EyeOff className="mr-2 h-4 w-4" />Ocultar</>
          )}
        </Button>
      )}
    </div>
  );
}
