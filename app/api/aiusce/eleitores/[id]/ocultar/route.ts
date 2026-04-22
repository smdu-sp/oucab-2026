import { NextRequest, NextResponse } from 'next/server';
import { toggleOcultarEleitorAiusce } from '@/services/candidaturas-aiusce';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resultado = await toggleOcultarEleitorAiusce(id);
  if (!resultado) {
    return NextResponse.json({ error: 'Não foi possível atualizar' }, { status: 403 });
  }
  return NextResponse.json(resultado);
}
