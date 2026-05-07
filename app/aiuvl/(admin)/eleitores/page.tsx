import { TableSkeleton } from "@/components/data-table";
import { Filtros } from "@/components/filtros";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { EleitoresTable } from "./_components/eleitores-table";
import { buscarEleitoresAiuvl, IAiuvlEleitor, IAiuvlEleitorPaginado } from "@/services/candidaturas-aiuvl";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";

export default async function EleitoresAiuvlSuspense({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <EleitoresAiuvl searchParams={searchParams} />
    </Suspense>
  );
}

async function EleitoresAiuvl({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiuvl/login");

  const isDev = usuario.permissao === "DEV";

  let { pagina = 1, limite = 10, total = 0 } = await searchParams;
  const { busca = "", status = "" } = await searchParams;
  let dados: IAiuvlEleitor[] = [];

  const response = await buscarEleitoresAiuvl(+pagina, +limite, busca as string, status as string);
  if (response) {
    const paginado = response as IAiuvlEleitorPaginado;
    pagina = paginado.pagina || 1;
    limite = paginado.limite || 10;
    total = paginado.total || 0;
    dados = paginado.data || [];
  }

  const statusSelect = [
    { label: "Em Análise", value: "EM_ANALISE" },
    { label: "Deferido", value: "DEFERIDO" },
    { label: "Indeferido", value: "INDEFERIDO" },
  ];

  return (
    <div className="px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto">
      <h1 className="text-xl md:text-4xl font-bold">Eleitores AIU-VL</h1>
      <div className="grid grid-cols-1 gap-y-3 my-5">
        <Filtros
          camposFiltraveis={[
            {
              nome: "Busca",
              tag: "busca",
              tipo: 0,
              placeholder: "Razão social, CNPJ ou e-mail",
            },
            {
              nome: "Status",
              tag: "status",
              tipo: 2,
              valores: statusSelect,
            },
          ]}
        />
        <div className="w-full">
          <EleitoresTable dados={dados} isDev={isDev} />
        </div>
        {dados.length > 0 && (
          <Pagination total={+total} pagina={+pagina} limite={+limite} />
        )}
      </div>
    </div>
  );
}
