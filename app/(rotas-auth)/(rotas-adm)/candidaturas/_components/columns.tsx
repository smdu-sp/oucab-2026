/** @format */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { ICandidatura } from '@/services/candidaturas';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
	EM_ANALISE: 'secondary',
	DEFERIDO: 'default',
	INDEFERIDO: 'destructive',
};

const statusLabel: Record<string, string> = {
	EM_ANALISE: 'Em Análise',
	DEFERIDO: 'Deferido',
	INDEFERIDO: 'Indeferido',
};

const tipoLabel: Record<string, string> = {
	MORADOR: 'Morador',
	TRABALHADOR: 'Trabalhador',
	REP_MORADIA: 'Rep. Moradia',
	REP_ONGS: 'Rep. ONGs',
	REP_PROFISSIONAIS: 'Rep. Profissionais',
	REP_EMPRESARIAIS: 'Rep. Empresariais',
};

export const columns: ColumnDef<ICandidatura>[] = [
	{
		accessorKey: 'usuario.nome',
		header: 'Nome',
		cell: ({ row }) => row.original.usuario.nome,
	},
	{
		accessorKey: 'usuario.email',
		header: 'E-mail',
		cell: ({ row }) => row.original.usuario.email,
	},
	{
		accessorKey: 'tipoInscricao',
		header: 'Tipo de Inscrição',
		cell: ({ row }) => tipoLabel[row.original.tipoInscricao] ?? row.original.tipoInscricao,
	},
	{
		accessorKey: 'status',
		header: () => <p className='text-center'>Status</p>,
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<div className='flex items-center justify-center'>
					<Badge variant={statusVariant[status] ?? 'secondary'}>
						{statusLabel[status] ?? status}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'arquivos',
		header: () => <p className='text-center'>Docs</p>,
		cell: ({ row }) => (
			<p className='text-center text-muted-foreground'>{row.original.arquivos.length}</p>
		),
	},
	{
		id: 'actions',
		header: () => <p className='text-center'>Ações</p>,
		cell: ({ row }) => (
			<div className='flex justify-center'>
				<Button asChild size='icon' variant='ghost'>
					<Link href={`/candidaturas/${row.original.id}`}>
						<Eye className='h-4 w-4' />
					</Link>
				</Button>
			</div>
		),
	},
];
