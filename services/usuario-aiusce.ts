import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import type { Permissao, Usuario } from "@/lib/generated/aiusce";

export interface IUsuarioAiuscePaginado {
  data: Usuario[];
  total: number;
  pagina: number;
  limite: number;
}

export async function validaUsuarioAiusce() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.usuario.findUnique({ where: { id: session.user.id } });
}

export async function buscarUsuariosAiusce(
  pagina: number,
  limite: number,
  busca?: string,
  status?: string,
  permissao?: string,
  tipo?: string,
) {
  [pagina, limite] = verificaPagina(pagina, limite);
  const tipoWhere = tipo === "all"
    ? {}
    : { tipo: (tipo as "INTERNO" | "EXTERNO") || "INTERNO" };
  const where = {
    ...tipoWhere,
    ...(busca && {
      OR: [
        { nome: { contains: busca } },
        { email: { contains: busca } },
        { login: { contains: busca } },
      ],
    }),
    ...(status && {
      status: status === "ATIVO" ? true : status === "INATIVO" ? false : undefined,
    }),
    ...(permissao && { permissao: permissao as Permissao }),
  };
  const total = await db.usuario.count({ where });
  if (total === 0) return { data: [], total, pagina, limite };
  [pagina, limite] = verificaLimite(pagina, limite, total);
  const dados = await db.usuario.findMany({
    skip: (pagina - 1) * limite,
    take: limite,
    orderBy: { nome: "asc" },
    where,
  });
  return { data: dados, total, pagina, limite };
}

export async function criarUsuarioAiusce(data: {
  nome: string;
  email: string;
  login?: string;
  permissao: Permissao;
}) {
  const admin = await validaUsuarioAiusce();
  if (!admin?.permissao || !["DEV", "ADM"].includes(admin.permissao)) return null;
  return db.usuario.create({
    data: { ...data, tipo: "INTERNO" },
  });
}

export async function atualizarUsuarioAiusce(
  id: string,
  data: Partial<Pick<Usuario, "permissao" | "status" | "nome" | "email" | "login">>,
) {
  const admin = await validaUsuarioAiusce();
  if (!admin?.permissao || !["DEV", "ADM"].includes(admin.permissao)) return null;
  return db.usuario.update({ where: { id }, data });
}
