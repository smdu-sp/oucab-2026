import { db } from "@/lib/prisma";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import { Arquivo, Candidato, Candidatura, Endereco, Organizacao, Status, Usuario } from "@prisma/client";
import { retornaPermissao } from "./usuario";

export interface IVotantePaginado {
    data: IVotante[];
    total: number;
    pagina: number;
    limite: number;
}

export interface IVotante extends Candidatura {
    usuario?: Usuario | null;
    endereco?: Endereco | null;
    arquivos?: Pick<Arquivo, "id">[];
    candidatos?: Candidato[];
    organizacao?: Organizacao | null;
}

export async function buscarVotantes(
    pagina: number,
    limite: number,
    busca?: string,
    status?: string,
) {
    [pagina, limite] = verificaPagina(pagina, limite);
    const where = {
        ...(busca && {
            OR: [
                { usuario: { nome: { contains: busca } } },
                { usuario: { email: { contains: busca } } },
            ],
        }),
        ...(status && status !== 'all' && { status: status as Status }),
    };
    const total = await db.candidatura.count({ where });
    if (total === 0) return { data: [], total, pagina, limite };
    [pagina, limite] = verificaLimite(pagina, limite, total);
    const candidaturas = await db.candidatura.findMany({
        skip: (pagina - 1) * limite,
        take: limite,
        orderBy: { criadoEm: 'asc' },
        include: {
            usuario: true,
            endereco: true,
            candidatos: true,
            organizacao: true,
            arquivos: { select: { id: true } },
        },
        where,
    });
    return { data: candidaturas as IVotante[], total, pagina, limite };
}

export async function buscarVotantePorId(id: string) {
    const candidatura = await db.candidatura.findUnique({
        where: { id },
        include: {
            usuario: true,
            endereco: true,
            candidatos: true,
            organizacao: true,
            arquivos: true,
        },
    });
    return candidatura as IVotante | null;
}

export async function atualizarStatusVotante(id: string, novoStatus: Status, usuarioId: string) {
    const permissao = await retornaPermissao(usuarioId);
    if (!permissao || !["DEV", "ADM"].includes(permissao)) return null;
    const existe = await db.candidatura.findUnique({ where: { id } });
    if (!existe) return null;
    const atualizado = await db.candidatura.update({
        where: { id },
        data: { status: novoStatus },
    });
    return atualizado;
}
