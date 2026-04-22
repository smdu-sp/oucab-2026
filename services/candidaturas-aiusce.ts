import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import { auth } from "@/auth/aiusce";
import type {
  Arquivo, Candidato, Candidatura, Eleitor, OrganizacaoCandidata,
  OrganizacaoEleitora, Procurador, Status, TipoInscricao, Usuario,
} from "@/lib/generated/aiusce";

async function isDevSession(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  return usuario?.permissao === "DEV";
}

// ---------------------------------------------------------------------------
// Candidaturas (tipoInscricao = CANDIDATO)
// ---------------------------------------------------------------------------

export interface IAiusceCandidatura extends Candidatura {
  usuario: Usuario;
  organizacao: OrganizacaoCandidata | null;
  candidatos: Candidato[];
  arquivos: { id: string }[];
}

export interface IAiusceCandidaturaDetalhe extends Candidatura {
  usuario: Usuario;
  organizacao: OrganizacaoCandidata | null;
  candidatos: (Candidato & { arquivos: Arquivo[] })[];
  arquivos: Arquivo[];
}

export interface IAiusceCandidaturaPaginada {
  data: IAiusceCandidatura[];
  total: number;
  pagina: number;
  limite: number;
}

export async function buscarCandidaturasAiusce(
  pagina: number,
  limite: number,
  busca?: string,
  status?: string,
) {
  [pagina, limite] = verificaPagina(pagina, limite);
  const isDev = await isDevSession();

  const where = {
    tipoInscricao: "CANDIDATO" as TipoInscricao,
    ...(!isDev && { oculto: false }),
    ...(busca && {
      OR: [
        { usuario: { nome: { contains: busca } } },
        { usuario: { email: { contains: busca } } },
        { organizacao: { razaoSocial: { contains: busca } } },
        { organizacao: { cnpj: { contains: busca } } },
      ],
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
      organizacao: true,
      candidatos: true,
      arquivos: { select: { id: true } },
    },
  });

  return { data: dados as IAiusceCandidatura[], total, pagina, limite };
}

export async function buscarCandidaturaAiuscePorId(id: string): Promise<IAiusceCandidaturaDetalhe | null> {
  const isDev = await isDevSession();
  const candidatura = await db.candidatura.findUnique({
    where: { id },
    include: {
      usuario: true,
      organizacao: true,
      candidatos: { include: { arquivos: true } },
      arquivos: true,
    },
  });
  if (!candidatura) return null;
  if (candidatura.oculto && !isDev) return null;
  return candidatura as IAiusceCandidaturaDetalhe;
}

export async function atualizarStatusCandidaturaAiusce(id: string, novoStatus: Status, motivo?: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) return null;
  return db.candidatura.update({
    where: { id },
    data: {
      status: novoStatus,
      motivoIndeferimento: novoStatus === "INDEFERIDO" ? (motivo ?? null) : null,
    },
  });
}

export async function toggleOcultarCandidaturaAiusce(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || usuario.permissao !== "DEV") return null;
  const existe = await db.candidatura.findUnique({ where: { id } });
  if (!existe) return null;
  return db.candidatura.update({ where: { id }, data: { oculto: !existe.oculto } });
}

// ---------------------------------------------------------------------------
// Eleitores (tipoInscricao = ELEITOR)
// ---------------------------------------------------------------------------

export interface IAiusceEleitor extends Eleitor {
  usuario: Usuario | null;
  candidato: Candidato | null;
  organizacao: OrganizacaoEleitora | null;
  procurador: Procurador | null;
  arquivos: { id: string }[];
}

export interface IAiusceEleitorDetalhe extends Eleitor {
  usuario: Usuario | null;
  candidato: Candidato | null;
  organizacao: (OrganizacaoEleitora & { arquivos: Arquivo[] }) | null;
  eleitorPai: (Eleitor & { organizacao: (OrganizacaoEleitora & { arquivos: Arquivo[] }) | null }) | null;
  membros: (Eleitor & { candidato: Candidato | null })[];
  procurador: Procurador | null;
  arquivos: Arquivo[];
}

export interface IAiusceEleitorPaginado {
  data: IAiusceEleitor[];
  total: number;
  pagina: number;
  limite: number;
}

export async function buscarEleitoresAiusce(
  pagina: number,
  limite: number,
  busca?: string,
  status?: string,
) {
  [pagina, limite] = verificaPagina(pagina, limite);
  const isDev = await isDevSession();

  const where = {
    eleitorPaiId: null,
    ...(!isDev && { oculto: false }),
    ...(busca && {
      OR: [
        { usuario: { nome: { contains: busca } } },
        { usuario: { email: { contains: busca } } },
        { organizacao: { razaoSocial: { contains: busca } } },
        { organizacao: { cnpj: { contains: busca } } },
      ],
    }),
    ...(status && status !== "all" && { status: status as Status }),
  };

  const total = await db.eleitor.count({ where });
  if (total === 0) return { data: [], total, pagina, limite };
  [pagina, limite] = verificaLimite(pagina, limite, total);

  const dados = await db.eleitor.findMany({
    skip: (pagina - 1) * limite,
    take: limite,
    orderBy: { criadoEm: "desc" },
    where,
    include: {
      usuario: true,
      candidato: true,
      organizacao: true,
      procurador: true,
      arquivos: { select: { id: true } },
    },
  });

  return { data: dados as IAiusceEleitor[], total, pagina, limite };
}

export async function buscarEleitorAiuscePorId(id: string): Promise<IAiusceEleitorDetalhe | null> {
  const isDev = await isDevSession();
  const eleitor = await db.eleitor.findUnique({
    where: { id },
    include: {
      usuario: true,
      candidato: true,
      organizacao: { include: { arquivos: true } },
      eleitorPai: { include: { organizacao: { include: { arquivos: true } } } },
      membros: { include: { candidato: true } },
      procurador: true,
      arquivos: true,
    },
  });
  if (!eleitor) return null;
  if (eleitor.oculto && !isDev) return null;
  return eleitor as IAiusceEleitorDetalhe;
}

export async function atualizarStatusEleitorAiusce(id: string, novoStatus: Status) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) return null;
  return db.eleitor.update({ where: { id }, data: { status: novoStatus } });
}

export async function toggleOcultarEleitorAiusce(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || usuario.permissao !== "DEV") return null;
  const existe = await db.eleitor.findUnique({ where: { id } });
  if (!existe) return null;
  return db.eleitor.update({ where: { id }, data: { oculto: !existe.oculto } });
}
