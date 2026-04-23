"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/config";
import type { IAiusceCandidatura } from "@/services/candidaturas-aiusce";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, SEGMENTO_INFO, getInfo } from "@/lib/labels";

function OcultarButton({ id, oculto }: { id: string; oculto: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/aiusce/candidaturas/${id}/ocultar`, { method: "PATCH" });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={loading}
      onClick={toggle}
      title={oculto ? "Tornar visível" : "Ocultar"}
    >
      {oculto ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
    </Button>
  );
}

export function createColumns(isDev: boolean): ColumnDef<IAiusceCandidatura>[] {
  return [
    {
      accessorKey: "organizacao.razaoSocial",
      header: "Entidade",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          {row.original.oculto && (
            <Badge variant="outline" className="text-xs text-muted-foreground border-dashed">Oculto</Badge>
          )}
          {row.original.organizacao?.razaoSocial ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "organizacao.cnpj",
      header: "CNPJ",
      cell: ({ row }) => row.original.organizacao?.cnpj ?? "—",
    },
    {
      accessorKey: "organizacao.segmento",
      header: "Segmento",
      cell: ({ row }) => row.original.organizacao?.segmento
        ? <EnumBadge info={getInfo(SEGMENTO_INFO, row.original.organizacao.segmento)} />
        : "—",
    },
    {
      accessorKey: "status",
      header: () => <p className="text-center">Status</p>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <EnumBadge info={getInfo(STATUS_INFO, row.original.status)} />
        </div>
      ),
    },
    {
      accessorKey: "arquivos",
      header: () => <p className="text-center">Docs</p>,
      cell: ({ row }) => (
        <p className="text-center text-muted-foreground">{row.original.arquivos.length}</p>
      ),
    },
    {
      id: "actions",
      header: () => <p className="text-center">Ações</p>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-1">
          {isDev && <OcultarButton id={row.original.id} oculto={row.original.oculto} />}
          <Button asChild size="icon" variant="ghost">
            <Link href={`/aiusce/candidaturas/${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ),
    },
  ];
}

export const columns = createColumns(false);
