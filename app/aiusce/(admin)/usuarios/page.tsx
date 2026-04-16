import DataTable, { TableSkeleton } from "@/components/data-table";
import { Filtros } from "@/components/filtros";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { buscarUsuariosAiusce, IUsuarioAiuscePaginado } from "@/services/usuario-aiusce";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import ModalUpdateAndCreate from "./_components/modal-update-create";
import type { Usuario } from "@/lib/generated/aiusce";

export default async function UsuariosAiusceSuspense({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <UsuariosAiusce searchParams={searchParams} />
    </Suspense>
  );
}

async function UsuariosAiusce({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiusce/login");

  let { pagina = 1, limite = 10, total = 0 } = await searchParams;
  const { busca = "", status = "", permissao = "" } = await searchParams;
  let dados: Usuario[] = [];

  const response = await buscarUsuariosAiusce(+pagina, +limite, busca as string, status as string, permissao as string);
  if (response) {
    const paginado = response as IUsuarioAiuscePaginado;
    pagina = paginado.pagina || 1;
    limite = paginado.limite || 10;
    total = paginado.total || 0;
    dados = paginado.data || [];
  }

  return (
    <div className="px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto">
      <h1 className="text-xl md:text-4xl font-bold">Usuários AIUSCE</h1>
      <div className="grid grid-cols-1 gap-y-3 my-5">
        <Filtros
          camposFiltraveis={[
            { nome: "Busca", tag: "busca", tipo: 0, placeholder: "Nome, e-mail ou login" },
            {
              nome: "Status",
              tag: "status",
              tipo: 2,
              valores: [{ label: "Ativo", value: "ATIVO" }, { label: "Inativo", value: "INATIVO" }],
              default: "ATIVO",
            },
            {
              nome: "Permissão",
              tag: "permissao",
              tipo: 2,
              valores: [
                { label: "Desenvolvedor", value: "DEV" },
                { label: "Administrador", value: "ADM" },
                { label: "Usuário", value: "USR" },
              ],
            },
          ]}
        />
        <div className="w-full">
          <DataTable columns={columns} data={dados} />
        </div>
        {dados.length > 0 && (
          <Pagination total={+total} pagina={+pagina} limite={+limite} />
        )}
      </div>
      <div className="absolute bottom-10 md:bottom-5 right-2 md:right-8 hover:scale-110">
        <ModalUpdateAndCreate isUpdating={false} />
      </div>
    </div>
  );
}
