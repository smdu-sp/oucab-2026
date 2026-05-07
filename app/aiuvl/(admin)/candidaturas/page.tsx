import { TableSkeleton } from "@/components/data-table";
import { Filtros } from "@/components/filtros";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CandidaturasTable } from "./_components/candidaturas-table";
import { buscarCandidaturasAiuvl, IAiuvlCandidatura, IAiuvlCandidaturaPaginada } from "@/services/candidaturas-aiuvl";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";
import BtnExportarCandidaturasAiuvl from "@/components/btn-exportar-candidaturas-aiuvl";

export default async function CandidaturasAiuvlSuspense({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <CandidaturasAiuvl searchParams={searchParams} />
    </Suspense>
  );
}

async function CandidaturasAiuvl({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiuvl/login");

  const isDev = usuario.permissao === "DEV";

  let { pagina = 1, limite = 10, total = 0 } = await searchParams;
  const { busca = "", status = "", segmento = "" } = await searchParams;
  let dados: IAiuvlCandidatura[] = [];

  const response = await buscarCandidaturasAiuvl(+pagina, +limite, busca as string, status as string, segmento as string);
  if (response) {
    const paginado = response as IAiuvlCandidaturaPaginada;
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

  const segmentoSelect = [
    { label: "ONG", value: "ONG" },
    { label: "Associação de Bairro", value: "ASSOCIACAO_BAIRRO" },
    { label: "Entidade Acadêmica", value: "ENTIDADE_ACADEMICA" },
    { label: "Setor Empresarial", value: "REP_EMPRESARIAL" },
  ];

  return (
    <div className="px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl md:text-4xl font-bold">Candidaturas AIU-VL</h1>
        <BtnExportarCandidaturasAiuvl busca={busca as string} status={status as string} segmento={segmento as string} />
      </div>
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
            {
              nome: "Segmento",
              tag: "segmento",
              tipo: 2,
              valores: segmentoSelect,
            },
          ]}
        />
        <div className="w-full">
          <CandidaturasTable dados={dados} isDev={isDev} />
        </div>
        {dados.length > 0 && (
          <Pagination total={+total} pagina={+pagina} limite={+limite} />
        )}
      </div>
    </div>
  );
}
