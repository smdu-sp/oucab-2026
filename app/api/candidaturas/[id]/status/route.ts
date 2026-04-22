/** @format */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { atualizarStatusCandidatura } from '@/services/candidaturas';
import { Status } from '@prisma/client';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const session = await auth();
	if (!session?.user?.id) {
		return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
	}

	const { id } = await params;
	const body = await request.json();
	const novoStatus = body.status as Status;
	const motivo = body.motivo as string | undefined;

	if (!['EM_ANALISE', 'DEFERIDO', 'INDEFERIDO'].includes(novoStatus)) {
		return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
	}

	const resultado = await atualizarStatusCandidatura(id, novoStatus, session.user.id, motivo);
	if (!resultado) {
		return NextResponse.json({ error: 'Não foi possível atualizar o status' }, { status: 403 });
	}

	return NextResponse.json(resultado);
}
