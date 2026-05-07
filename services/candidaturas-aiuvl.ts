import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import { auth } from "@/auth/aiuvl";
import { sendEmail, emailAtualizacaoStatus } from "@/lib/email";
import { APP_URL } from "@/lib/config";
import type {
  Arquivo, Candidato, Candidatura, Eleitor, OrganizacaoCandidata,
  OrganizacaoEleitora, Status, TipoInscricao, Usuario,
} from "@/lib/generated/aiuvl";

async function isDevSession(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  return usuario?.permissao === "DEV";
}

// ---------------------------------------------------------------------------
// Candidaturas (tipoInscricao = CANDIDATO)
// ---------------------------------------------------------------------------

export interface IAiuvlCandidatura extends Candidatura {
  usuario: Usuario;
  organizacao: OrganizacaoCandidata | null;
  candidatos: Candidato[];
  arquivos: { id: string }[];
  _count: { arquivos: number };
}

export interface IAiuvlCandidaturaDetalhe extends Candidatura {
  usuario: Usuario;
  organizacao: (OrganizacaoCandidata & { arquivos: Arquivo[] }) | null;
  candidatos: (Candidato & { arquivos: Arquivo[] })[];
  arquivos: Arquivo[];
}

export interface IAiuvlCandidaturaPaginada {
  data: IAiuvlCandidatura[];
  total: number;
  pagina: number;
  limite: number;
}

export async function buscarCandidaturasAiuvl(
  pagina: number,
  limite: number,
  busca?: string,
  status?: string,
  segmento?: string,
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
    ...(segmento && segmento !== "all" && { organizacao: { segmento: segmento as any } }),
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
      _count: { select: { arquivos: { where: { categoria: "COMPLEMENTAR" } } } },
    },
  });

  return { data: dados as IAiuvlCandidatura[], total, pagina, limite };
}

export async function exportarCandidaturasAiuvl(busca?: string, status?: string, segmento?: string) {
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
    ...(segmento && segmento !== "all" && { organizacao: { segmento: segmento as any } }),
  };

  return db.candidatura.findMany({
    orderBy: { criadoEm: "desc" },
    where,
    include: {
      organizacao: true,
      candidatos: { select: { nome: true, tipoCandidato: true } },
    },
  });
}

export async function buscarCandidaturaAiuvlPorId(id: string): Promise<IAiuvlCandidaturaDetalhe | null> {
  const isDev = await isDevSession();
  const candidatura = await db.candidatura.findUnique({
    where: { id },
    include: {
      usuario: true,
      organizacao: { include: { arquivos: true } },
      candidatos: { include: { arquivos: true } },
      arquivos: true,
    },
  });
  if (!candidatura) return null;
  if (candidatura.oculto && !isDev) return null;
  return candidatura as IAiuvlCandidaturaDetalhe;
}

export async function atualizarStatusCandidaturaAiuvl(id: string, novoStatus: Status, motivo?: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) return null;
  const existe = await db.candidatura.findUnique({ where: { id }, include: { usuario: true } });
  if (!existe) return null;
  const resultado = await db.candidatura.update({
    where: { id },
    data: {
      status: novoStatus,
      motivoIndeferimento: novoStatus === "INDEFERIDO" ? (motivo ?? null) : null,
    },
  });

  if (["DEFERIDO", "INDEFERIDO"].includes(novoStatus)) {
    const portalUrl = `${APP_URL}/aiuvl/portal/minha-inscricao`;
    const { html, text } = emailAtualizacaoStatus({
      nome: existe.usuario.nome,
      novoStatus: novoStatus as "DEFERIDO" | "INDEFERIDO",
      motivo,
      portalUrl,
      sistemaLabel: "AIU-VL 2026",
    });
    sendEmail({ to: existe.usuario.email, subject: `AIU-VL 2026 — Atualização da sua inscrição`, html, text }).catch(console.error);
  }

  return resultado;
}

export async function toggleOcultarCandidaturaAiuvl(id: string) {
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

export interface IAiuvlEleitor extends Eleitor {
  usuario: Usuario | null;
  organizacao: OrganizacaoEleitora | null;
  arquivos: { id: string }[];
  _count: { arquivos: number };
}

export interface IAiuvlEleitorDetalhe extends Eleitor {
  usuario: Usuario | null;
  organizacao: (OrganizacaoEleitora & { arquivos: Arquivo[] }) | null;
  arquivos: Arquivo[];
}

export interface IAiuvlEleitorPaginado {
  data: IAiuvlEleitor[];
  total: number;
  pagina: number;
  limite: number;
}

export async function buscarEleitoresAiuvl(
  pagina: number,
  limite: number,
  busca?: string,
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
      organizacao: true,
      arquivos: { select: { id: true } },
      _count: { select: { arquivos: { where: { categoria: "COMPLEMENTAR" } } } },
    },
  });

  return { data: dados as IAiuvlEleitor[], total, pagina, limite };
}

export async function buscarEleitorAiuvlPorId(id: string): Promise<IAiuvlEleitorDetalhe | null> {
  const isDev = await isDevSession();
  const eleitor = await db.eleitor.findUnique({
    where: { id },
    include: {
      usuario: true,
      organizacao: { include: { arquivos: true } },
      arquivos: true,
    },
  });
  if (!eleitor) return null;
  if (eleitor.oculto && !isDev) return null;
  return eleitor as IAiuvlEleitorDetalhe;
}

export async function atualizarStatusEleitorAiuvl(id: string, novoStatus: Status, motivo?: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) return null;
  const existe = await db.eleitor.findUnique({ where: { id }, include: { usuario: true } });
  if (!existe) return null;
  const resultado = await db.eleitor.update({
    where: { id },
    data: {
      status: novoStatus,
      motivoIndeferimento: novoStatus === "INDEFERIDO" ? (motivo ?? null) : null,
    },
  });

  if (existe.usuario && ["DEFERIDO", "INDEFERIDO"].includes(novoStatus)) {
    const portalUrl = `${APP_URL}/aiuvl/portal/minha-inscricao`;
    const { html, text } = emailAtualizacaoStatus({
      nome: existe.usuario.nome,
      novoStatus: novoStatus as "DEFERIDO" | "INDEFERIDO",
      motivo,
      portalUrl,
      sistemaLabel: "AIU-VL 2026",
    });
    sendEmail({ to: existe.usuario.email, subject: `AIU-VL 2026 — Atualização da sua inscrição de eleitor`, html, text }).catch(console.error);
  }

  return resultado;
}

export async function toggleOcultarEleitorAiuvl(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const usuario = await db.usuario.findUnique({ where: { id: session.user.id } });
  if (!usuario?.permissao || usuario.permissao !== "DEV") return null;
  const existe = await db.eleitor.findUnique({ where: { id } });
  if (!existe) return null;
  return db.eleitor.update({ where: { id }, data: { oculto: !existe.oculto } });
}
