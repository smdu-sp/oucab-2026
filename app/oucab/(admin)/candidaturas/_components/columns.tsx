"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/config";
import type { ICandidatura } from "@/services/candidaturas";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, TIPO_INSCRICAO_INFO, getInfo } from "@/lib/labels";

function OcultarButton({ id, oculto }: { id: string; oculto: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/candidaturas/${id}/ocultar`, { method: "PATCH" });
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

export function createColumns(isDev: boolean): ColumnDef<ICandidatura>[] {
  return [
    {
      accessorKey: "usuario.nome",
      header: "Nome",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          {row.original.oculto && (
            <Badge variant="outline" className="text-xs text-muted-foreground border-dashed">Oculto</Badge>
          )}
          {row.original.usuario?.nome ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "usuario.email",
      header: "E-mail",
      cell: ({ row }) => row.original.usuario?.email ?? "—",
    },
    {
      accessorKey: "tipoInscricao",
      header: "Tipo",
      cell: ({ row }) => (
        <EnumBadge info={getInfo(TIPO_INSCRICAO_INFO, row.original.tipoInscricao)} />
      ),
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
      id: "actions",
      header: () => <p className="text-center">Ações</p>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-1">
          {isDev && <OcultarButton id={row.original.id} oculto={row.original.oculto} />}
          <Button asChild size="icon" variant="ghost">
            <Link href={`/oucab/candidaturas/${row.original.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ),
    },
  ];
}

export const columns = createColumns(false);
