"use client";

import DataTable from "@/components/data-table";
import { createColumns } from "./columns";
import type { IAiusceEleitor } from "@/services/candidaturas-aiusce";

interface Props {
  dados: IAiusceEleitor[];
  isDev: boolean;
}

export function EleitoresTable({ dados, isDev }: Props) {
  const cols = createColumns(isDev);
  return (
    <DataTable
      columns={cols}
      data={dados}
      getRowClassName={(row) => row.oculto ? "opacity-50" : ""}
    />
  );
}
