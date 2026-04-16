/** @format */

import { notFound, redirect } from 'next/navigation';
import { buscarCandidaturaPorId } from '@/services/candidaturas';
import { validaUsuario } from '@/services/usuario';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusActions } from './_components/status-actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatDateBR } from '@/lib/utils';
import { BASE_PATH } from '@/lib/config';

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
	REP_MORADIA: 'Representante de Moradia',
	REP_ONGS: 'Representante de ONGs',
	REP_PROFISSIONAIS: 'Representante de Profissionais',
	REP_EMPRESARIAIS: 'Representante Empresarial',
};

const categoriaLabel: Record<string, string> = {
	REQUERIMENTO: 'Requerimento',
	DOCUMENTO_IDENTIDADE: 'Documento de Identidade',
	CPF: 'CPF',
	TITULO_ELEITOR: 'Título de Eleitor',
	COMPROVANTE_RESIDENCIA: 'Comprovante de Residência',
	COMPROVANTE_TRABALHO: 'Comprovante de Trabalho',
	FOTO: 'Foto',
	DECLARACAO: 'Declaração',
	DECLARACAO_ATUACAO: 'Declaração de Atuação',
	ESTATUTO_SOCIAL: 'Estatuto Social',
	ATA_ELEICAO: 'Ata de Eleição',
	CERTIDAO_CNPJ: 'Certidão CNPJ',
	OUTRO: 'Outro',
};

export default async function CandidaturaDetalhe({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const usuario = await validaUsuario();
	if (!usuario?.permissao || !['DEV', 'ADM'].includes(usuario.permissao)) redirect('/oucab/login');

	const { id } = await params;
	const candidatura = await buscarCandidaturaPorId(id);
	if (!candidatura) notFound();

	const formatDate = (date: Date) =>
		format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

	return (
		<div className='px-0 md:px-8 pb-20 container mx-auto space-y-6'>
			<div className='flex items-center gap-4'>
				<Button asChild variant='ghost' size='icon'>
					<Link href='/oucab/candidaturas'>
						<ArrowLeft className='h-5 w-5' />
					</Link>
				</Button>
				<div className='flex-1'>
					<h1 className='text-xl md:text-4xl font-bold'>Detalhe da Candidatura</h1>
					<p className='text-muted-foreground text-sm mt-1'>
						Criada em {formatDate(candidatura.criadoEm)}
					</p>
				</div>
				<Badge variant={statusVariant[candidatura.status] ?? 'secondary'} className='text-sm px-3 py-1'>
					{statusLabel[candidatura.status] ?? candidatura.status}
				</Badge>
			</div>

			<StatusActions id={candidatura.id} statusAtual={candidatura.status} />

			<Card>
				<CardHeader>
					<CardTitle>Dados do Usuário</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
					<div>
						<p className='text-muted-foreground'>Nome</p>
						<p className='font-medium'>{candidatura.usuario.nome}</p>
					</div>
					<div>
						<p className='text-muted-foreground'>E-mail</p>
						<p className='font-medium'>{candidatura.usuario.email}</p>
					</div>
					<div>
						<p className='text-muted-foreground'>Tipo de Inscrição</p>
						<p className='font-medium'>{tipoLabel[candidatura.tipoInscricao] ?? candidatura.tipoInscricao}</p>
					</div>
					<div>
						<p className='text-muted-foreground'>Tipo de Cadastro</p>
						<p className='font-medium'>{candidatura.tipoCadastro === 'CANDIDATO' ? 'Candidato' : 'Eleitor'}</p>
					</div>
				</CardContent>
			</Card>

			{candidatura.endereco && (
				<Card>
					<CardHeader>
						<CardTitle>Endereço</CardTitle>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
						<div className='md:col-span-2'>
							<p className='text-muted-foreground'>Logradouro</p>
							<p className='font-medium'>
								{candidatura.endereco.logradouro}
								{candidatura.endereco.numero ? `, ${candidatura.endereco.numero}` : ''}
								{candidatura.endereco.complemento ? ` — ${candidatura.endereco.complemento}` : ''}
							</p>
						</div>
						<div>
							<p className='text-muted-foreground'>Bairro</p>
							<p className='font-medium'>{candidatura.endereco.bairro}</p>
						</div>
						<div>
							<p className='text-muted-foreground'>Cidade / Estado</p>
							<p className='font-medium'>{candidatura.endereco.cidade} / {candidatura.endereco.estado}</p>
						</div>
						<div>
							<p className='text-muted-foreground'>CEP</p>
							<p className='font-medium'>{candidatura.endereco.cep}</p>
						</div>
						<div>
							<p className='text-muted-foreground'>Área / Perímetro</p>
							<p className='font-medium'>{candidatura.endereco.areaPerimetro}</p>
						</div>
					</CardContent>
				</Card>
			)}

			{candidatura.organizacao && (
				<Card>
					<CardHeader>
						<CardTitle>Organização</CardTitle>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
						<div>
							<p className='text-muted-foreground'>Razão Social</p>
							<p className='font-medium'>{candidatura.organizacao.razaoSocial}</p>
						</div>
						<div>
							<p className='text-muted-foreground'>CNPJ</p>
							<p className='font-medium'>{candidatura.organizacao.cnpj}</p>
						</div>
					</CardContent>
				</Card>
			)}

			{candidatura.candidatos.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Candidatos / Representantes</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						{candidatura.candidatos.map((candidato) => (
							<div key={candidato.id} className='border rounded-lg p-4 space-y-3'>
								<div className='flex items-center gap-2'>
									<Badge variant='outline'>{candidato.tipoCandidato}</Badge>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
									<div>
										<p className='text-muted-foreground'>Nome</p>
										<p className='font-medium'>{candidato.nome}</p>
									</div>
									{candidato.nomeSocial && (
										<div>
											<p className='text-muted-foreground'>Nome Social</p>
											<p className='font-medium'>{candidato.nomeSocial}</p>
										</div>
									)}
									<div>
										<p className='text-muted-foreground'>CPF</p>
										<p className='font-medium'>{candidato.cpf}</p>
									</div>
									<div>
										<p className='text-muted-foreground'>E-mail</p>
										<p className='font-medium'>{candidato.email}</p>
									</div>
									{candidato.telefone && (
										<div>
											<p className='text-muted-foreground'>Telefone</p>
											<p className='font-medium'>{candidato.telefone}</p>
										</div>
									)}
									<div>
										<p className='text-muted-foreground'>Data de Nascimento</p>
										<p className='font-medium'>
											{formatDateBR(candidato.dataNascimento)}
										</p>
									</div>
									<div>
										<p className='text-muted-foreground'>Gênero</p>
										<p className='font-medium'>{candidato.genero}</p>
									</div>
									{candidato.nomeEmpresa && (
										<div>
											<p className='text-muted-foreground'>Empresa</p>
											<p className='font-medium'>{candidato.nomeEmpresa}</p>
										</div>
									)}
								</div>
								{candidato.arquivos.length > 0 && (
									<div>
										<p className='text-muted-foreground text-sm mb-2'>Documentos do candidato</p>
										<div className='flex flex-wrap gap-2'>
											{candidato.arquivos.map((arq) => (
												<a
													key={arq.id}
													href={`${BASE_PATH}/api/arquivos/${arq.id}`}
													target='_blank'
													rel='noopener noreferrer'
													className='text-xs px-2 py-1 rounded border hover:bg-muted transition-colors'>
													{categoriaLabel[arq.categoria] ?? arq.categoria} — {arq.nome}
												</a>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</CardContent>
				</Card>
			)}

			{candidatura.arquivos.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Documentos da Inscrição</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex flex-wrap gap-2'>
							{candidatura.arquivos.map((arq) => (
								<a
									key={arq.id}
									href={`${BASE_PATH}/api/arquivos/${arq.id}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-sm px-3 py-2 rounded border hover:bg-muted transition-colors'>
									{categoriaLabel[arq.categoria] ?? arq.categoria} — {arq.nome}
								</a>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
