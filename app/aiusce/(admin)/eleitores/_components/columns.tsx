"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import type { IAiusceEleitor } from "@/services/candidaturas-aiusce";

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  EM_ANALISE: "secondary",
  DEFERIDO: "default",
  INDEFERIDO: "destructive",
};

const statusLabel: Record<string, string> = {
  EM_ANALISE: "Em Análise",
  DEFERIDO: "Deferido",
  INDEFERIDO: "Indeferido",
};

const segmentoLabel: Record<string, string> = {
  ONG_CULTURAL: "ONG Cultural",
  ENTIDADE_URB_AMB: "Entidade Urb./Amb.",
};

const tipoCandidatoLabel: Record<string, string> = {
  TITULAR: "Titular",
  SUPLENTE: "Suplente",
};

export const columns: ColumnDef<IAiusceEleitor>[] = [
  {
    accessorKey: "organizacao.razaoSocial",
    header: "Entidade / Candidato",
    cell: ({ row }) => {
      const { organizacao, candidato } = row.original;
      if (organizacao) return organizacao.razaoSocial;
      if (candidato) return (
        <span className="flex items-center gap-2">
          {candidato.nome}
          <Badge variant="outline" className="text-xs">{tipoCandidatoLabel[candidato.tipoCandidato] ?? candidato.tipoCandidato}</Badge>
        </span>
      );
      return "—";
    },
  },
  {
    accessorKey: "organizacao.cnpj",
    header: "CNPJ / CPF",
    cell: ({ row }) => row.original.organizacao?.cnpj ?? row.original.candidato?.cpf ?? "—",
  },
  {
    accessorKey: "organizacao.segmento",
    header: "Segmento",
    cell: ({ row }) => segmentoLabel[row.original.organizacao?.segmento ?? ""] ?? "—",
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex justify-center">
          <Badge variant={statusVariant[status] ?? "secondary"}>
            {statusLabel[status] ?? status}
          </Badge>
        </div>
      );
    },
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
      <div className="flex justify-center">
        <Button asChild size="icon" variant="ghost">
          <Link href={`/aiusce/eleitores/${row.original.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
