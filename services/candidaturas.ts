import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import { retornaPermissao } from "./usuario";
import type {
  Arquivo, Candidato, Candidatura, Eleitor, Endereco,
  Organizacao, Status, TipoCandidato, TipoInscricao, Usuario,
} from "@prisma/client";

export interface ICandidaturaPaginada {
  data: ICandidatura[];
  total: number;
  pagina: number;
  limite: number;
}

export interface ICandidatura extends Candidatura {
  usuario: Usuario;
  endereco?: Endereco | null;
  organizacao?: Organizacao | null;
  candidatos: Candidato[];
  arquivos: { id: string }[];
}

export interface ICandidaturaDetalhe extends Candidatura {
  usuario: Usuario;
  endereco?: Endereco | null;
  organizacao?: (Organizacao & { arquivos: Arquivo[] }) | null;
  candidatos: (Candidato & { arquivos: Arquivo[] })[];
  arquivos: Arquivo[];
}

async function isDevSession(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const permissao = await retornaPermissao(session.user.id);
  return permissao === "DEV";
}

export async function buscarCandidaturas(
  pagina: number,
  limite: number,
  busca?: string,
  tipoInscricao?: string,
  status?: string,
) {
  [pagina, limite] = verificaPagina(pagina, limite);
  const isDev = await isDevSession();

  const where = {
    ...(!isDev && { oculto: false }),
    ...(busca && {
      OR: [
        { usuario: { nome: { contains: busca } } },
        { usuario: { email: { contains: busca } } },
        { organizacao: { razaoSocial: { contains: busca } } },
      ],
    }),
    ...(tipoInscricao && tipoInscricao !== "all" && {
      tipoInscricao: tipoInscricao as TipoInscricao,
    }),
    ...(status && status !== "all" && { status: status as Status }),
  };

  const total = await db.candidatura.count({ where });
  if (total === 0) return { data: [], total, pagina, limite };
  [pagina, limite] = verificaLimite(pagina, limite, total);

  const dados = await db.candidatura.findMany({
    skip: (pagina - 1) * limite,
    take: limite,
    orderBy: { criadoEm: "desc" },
    where,
    include: {
      usuario: true,
      endereco: true,
      organizacao: true,
      candidatos: true,
      arquivos: { select: { id: true } },
    },
  });

  return { data: dados as ICandidatura[], total, pagina, limite };
}

export async function buscarCandidaturaPorId(id: string): Promise<ICandidaturaDetalhe | null> {
  const isDev = await isDevSession();
  const candidatura = await db.candidatura.findUnique({
    where: { id },
    include: {
      usuario: true,
      endereco: true,
      organizacao: { include: { arquivos: true } },
      candidatos: { include: { arquivos: true } },
      arquivos: true,
    },
  });
  if (!candidatura) return null;
  if (candidatura.oculto && !isDev) return null;
  return candidatura as ICandidaturaDetalhe;
}

export async function atualizarStatusCandidatura(
  id: string,
  novoStatus: Status,
  usuarioId: string,
) {
  const permissao = await retornaPermissao(usuarioId);
  if (!permissao || !["DEV", "ADM"].includes(permissao)) return null;
  const existe = await db.candidatura.findUnique({ where: { id } });
  if (!existe) return null;
  return db.candidatura.update({ where: { id }, data: { status: novoStatus } });
}

export async function toggleOcultarCandidatura(id: string, usuarioId: string) {
  const permissao = await retornaPermissao(usuarioId);
  if (!permissao || permissao !== "DEV") return null;
  const existe = await db.candidatura.findUnique({ where: { id } });
  if (!existe) return null;
  return db.candidatura.update({ where: { id }, data: { oculto: !existe.oculto } });
}
