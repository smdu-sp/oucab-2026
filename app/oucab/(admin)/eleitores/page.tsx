/** @format */

import { TableSkeleton } from '@/components/data-table';
import { Filtros } from '@/components/filtros';
import Pagination from '@/components/pagination';
import { auth } from '@/auth';
import { Suspense } from 'react';
import { CandidaturasTable } from '../candidaturas/_components/candidaturas-table';
import { buscarCandidaturas, ICandidaturaPaginada, ICandidatura } from '@/services/candidaturas';
import { validaUsuario } from '@/services/usuario';
import { redirect } from 'next/navigation';
import DialogExportar from '@/components/dialog-exportar';

export default async function EleitorasSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Eleitoras searchParams={searchParams} />
		</Suspense>
	);
}

async function Eleitoras({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	const { busca = '', tipoInscricao = '', status = '' } = await searchParams;
	let dados: ICandidatura[] = [];

	const usuario = await validaUsuario();
	if (!usuario?.permissao || !['DEV', 'ADM'].includes(usuario.permissao)) redirect('/oucab/login');

	const isDev = usuario.permissao === 'DEV';

	const session = await auth();
	if (session) {
		const response = await buscarCandidaturas(
			+pagina,
			+limite,
			busca as string,
			tipoInscricao as string,
			status as string,
			undefined,
			'ELEITOR',
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
		{ label: 'Rep. ONGs', value: 'REP_ONGS' },
		{ label: 'Rep. Profissionais', value: 'REP_PROFISSIONAIS' },
		{ label: 'Rep. Empresariais', value: 'REP_EMPRESARIAIS' },
	];

	const statusSelect = [
		{ label: 'Em Análise', value: 'EM_ANALISE' },
		{ label: 'Deferido', value: 'DEFERIDO' },
		{ label: 'Indeferido', value: 'INDEFERIDO' },
		{ label: 'Aguardando Documentação', value: 'AGUARDANDO_DOCUMENTACAO' },
	];

	return (
		<div className='px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto'>
			<div className='flex items-center justify-between gap-4 flex-wrap'>
				<h1 className='text-xl md:text-4xl font-bold'>Entidades Eleitoras</h1>
				<DialogExportar
					url='/api/candidaturas/exportar'
					filtros={{
						busca: busca as string,
						tipoInscricao: tipoInscricao as string,
						status: status as string,
						tipoCadastro: 'ELEITOR',
					}}
					grupos={[
						{ id: 'inscricao', label: 'Dados da Inscrição', descricao: 'Status, tipo de inscrição e data de criação' },
						{ id: 'usuario', label: 'Dados do Usuário', descricao: 'Nome e e-mail do usuário' },
						{ id: 'endereco', label: 'Endereço', descricao: 'Logradouro, número, bairro, cidade e CEP' },
						{ id: 'organizacao', label: 'Organização', descricao: 'Razão social e CNPJ da entidade' },
						{ id: 'candidato', label: 'Representante', descricao: 'Dados do representante da entidade' },
					]}
				/>
			</div>
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
					<CandidaturasTable dados={dados} isDev={isDev} />
				</div>
				{dados && dados.length > 0 && (
					<Pagination total={+total} pagina={+pagina} limite={+limite} />
				)}
			</div>
		</div>
	);
}
