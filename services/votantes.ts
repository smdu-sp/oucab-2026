import { db } from "@/lib/prisma";
import { verificaLimite, verificaPagina } from "@/lib/utils";
import { Arquivo, Endereco, Status, Usuario, Votante } from "@prisma/client";
import { retornaPermissao } from "./usuario";

export interface IVotantePaginado {
    data: IVotante[];
    total: number;
    pagina: number;
    limite: number;
}
export interface IVotante extends Votante {
    usuario?: Usuario;
    endereco?: Endereco;
    arquivos?: Arquivo[];
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
    }
    const total = await db.votante.count({ where });
    if (total === 0) return { data: [], total, pagina, limite };
    [pagina, limite] = verificaLimite(pagina, limite, total);
    const usuarios = await db.votante.findMany({
        skip: (pagina - 1) * limite,
        take: limite,
        orderBy: { criadoEm: 'asc' },
        include: {
            usuario: true,
            endereco: true,
            arquivos: {
                select: { id: true }
            },
        },
        where
    });
    return { data: usuarios, total, pagina, limite };
}

export async function buscarVotantePorId(id: string) {
    const votante = await db.votante.findUnique({
        where: { id },
        include: {
            usuario: true,
            endereco: true,
            arquivos: true,
        },
    });
    return votante as IVotante | null;
}

export async function atualizarStatusVotante(id: string, novoStatus: Status, usuarioId: string) {
    const permissao = await retornaPermissao(usuarioId);
    if (!permissao || !["DEV", "ADM"].includes(permissao)) return null;
    const existe = await db.votante.findUnique({ where: { id } });
    if (!existe) return null;
    const atualizado = await db.votante.update({
        where: { id },
        data: { status: novoStatus },
    });
    return atualizado as IVotante;
}