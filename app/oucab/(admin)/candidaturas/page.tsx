/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
import { Filtros } from '@/components/filtros';
import Pagination from '@/components/pagination';
import { auth } from '@/auth';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import { buscarCandidaturas, ICandidaturaPaginada, ICandidatura } from '@/services/candidaturas';
import { validaUsuario } from '@/services/usuario';
import { redirect } from 'next/navigation';

export default async function CandidaturasSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Candidaturas searchParams={searchParams} />
		</Suspense>
	);
}

async function Candidaturas({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	const { busca = '', tipoInscricao = '', status = '' } = await searchParams;
	let dados: ICandidatura[] = [];

	const usuario = await validaUsuario();
	if (!usuario?.permissao || !['DEV', 'ADM'].includes(usuario.permissao)) redirect('/oucab/login');

	const session = await auth();
	if (session) {
		const response = await buscarCandidaturas(
			+pagina,
			+limite,
			busca as string,
			tipoInscricao as string,
			status as string,
		);
		if (response) {
			const paginado = response as ICandidaturaPaginada;
			pagina = paginado.pagina || 1;
			limite = paginado.limite || 10;
			total = paginado.total || 0;
			dados = paginado.data || [];
		}
	}

	const tipoInscricaoSelect = [
		{ label: 'Morador', value: 'MORADOR' },
		{ label: 'Trabalhador', value: 'TRABALHADOR' },
		{ label: 'Rep. Moradia', value: 'REP_MORADIA' },
		{ label: 'Rep. ONGs', value: 'REP_ONGS' },
		{ label: 'Rep. Profissionais', value: 'REP_PROFISSIONAIS' },
		{ label: 'Rep. Empresariais', value: 'REP_EMPRESARIAIS' },
	];

	const statusSelect = [
		{ label: 'Em Análise', value: 'EM_ANALISE' },
		{ label: 'Deferido', value: 'DEFERIDO' },
		{ label: 'Indeferido', value: 'INDEFERIDO' },
	];

	return (
		<div className='px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold'>Candidaturas</h1>
			<div className='grid grid-cols-1 gap-y-3 my-5'>
				<Filtros
					camposFiltraveis={[
						{
							nome: 'Busca',
							tag: 'busca',
							tipo: 0,
							placeholder: 'Digite o nome, e-mail ou razão social',
						},
						{
							nome: 'Tipo de Inscrição',
							tag: 'tipoInscricao',
							tipo: 2,
							valores: tipoInscricaoSelect,
						},
						{
							nome: 'Status',
							tag: 'status',
							tipo: 2,
							valores: statusSelect,
						},
					]}
				/>
				<div className='w-full'>
					<DataTable columns={columns} data={dados || []} />
				</div>
				{dados && dados.length > 0 && (
					<Pagination total={+total} pagina={+pagina} limite={+limite} />
				)}
			</div>
		</div>
	);
}
