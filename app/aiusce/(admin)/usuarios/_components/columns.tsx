"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Usuario } from "@/lib/generated/aiusce";
import ModalUpdateAndCreate from "./modal-update-create";
import ModalStatus from "./modal-status";

const permissaoLabel: Record<string, string> = {
  DEV: "Desenvolvedor",
  ADM: "Administrador",
  USR: "Usuário",
};

export const columns: ColumnDef<Usuario>[] = [
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "login", header: "Login", cell: ({ row }) => row.original.login ?? "—" },
  { accessorKey: "email", header: "E-mail" },
  {
    accessorKey: "permissao",
    header: "Permissão",
    cell: ({ row }) => (
      <Badge variant="outline">{permissaoLabel[row.original.permissao ?? ""] ?? "—"}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge variant={row.original.status ? "default" : "destructive"}>
          {row.original.status ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <p className="text-center">Ações</p>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center justify-center">
        <ModalUpdateAndCreate user={row.original} isUpdating={true} />
        <ModalStatus id={row.original.id} status={!row.original.status} />
      </div>
    ),
  },
];
