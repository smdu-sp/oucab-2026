/** @format */

import { notFound, redirect } from 'next/navigation';
import { buscarCandidaturaPorId } from '@/services/candidaturas';
import { validaUsuario } from '@/services/usuario';
import { CandidaturaDetalhe } from '../../candidaturas/[id]/_components/candidatura-detalhe';

export default async function EleitoraDetalhePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const usuario = await validaUsuario();
	if (!usuario?.permissao || !['DEV', 'ADM'].includes(usuario.permissao)) redirect('/oucab/login');

	const isDev = usuario.permissao === 'DEV';
	const { id } = await params;
	const candidatura = await buscarCandidaturaPorId(id);
	if (!candidatura) notFound();

	return (
		<CandidaturaDetalhe
			candidatura={candidatura}
			isDev={isDev}
			backUrl='/oucab/eleitores'
			titulo='Detalhe da Entidade Eleitora'
		/>
	);
}
