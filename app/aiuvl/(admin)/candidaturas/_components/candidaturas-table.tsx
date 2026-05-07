"use client";

import DataTable from "@/components/data-table";
import { createColumns } from "./columns";
import type { IAiuvlCandidatura } from "@/services/candidaturas-aiuvl";

interface Props {
  dados: IAiuvlCandidatura[];
  isDev: boolean;
}

export function CandidaturasTable({ dados, isDev }: Props) {
  const cols = createColumns(isDev);
  return (
    <DataTable
      columns={cols}
      data={dados}
      getRowClassName={(row) => row.oculto ? "opacity-50" : ""}
    />
  );
}
