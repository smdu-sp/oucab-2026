import { NextRequest, NextResponse } from 'next/server';
import { toggleOcultarCandidaturaAiuvl } from '@/services/candidaturas-aiuvl';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resultado = await toggleOcultarCandidaturaAiuvl(id);
  if (!resultado) {
    return NextResponse.json({ error: 'Não foi possível atualizar' }, { status: 403 });
  }
  return NextResponse.json(resultado);
}
