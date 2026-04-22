import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { toggleOcultarCandidatura } from '@/services/candidaturas';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { id } = await params;
  const resultado = await toggleOcultarCandidatura(id, session.user.id);
  if (!resultado) {
    return NextResponse.json({ error: 'Não foi possível atualizar' }, { status: 403 });
  }
  return NextResponse.json(resultado);
}
