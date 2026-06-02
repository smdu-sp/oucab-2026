"use client";

import DataTable from "@/components/data-table";
import { createColumns } from "./columns";
import type { ICandidatura } from "@/services/candidaturas";

interface Props {
  dados: ICandidatura[];
  isDev: boolean;
  detailPath?: string;
}

export function CandidaturasTable({ dados, isDev, detailPath }: Props) {
  const cols = createColumns(isDev, detailPath);
  return (
    <DataTable
      columns={cols}
      data={dados}
      getRowClassName={(row) => row.oculto ? "opacity-50" : ""}
    />
  );
}
