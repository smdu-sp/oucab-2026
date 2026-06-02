import { redirect } from 'next/navigation';
import FormularioInscricao from './_components/formulario-inscricao';
import { periodoInscricaoEleitoresAberto, prazoRepMoradiaEncerrado } from '@/lib/config';

export default function Inscrição() {
  const algumPeriodoAberto = periodoInscricaoEleitoresAberto() || !prazoRepMoradiaEncerrado();
  if (!algumPeriodoAberto) redirect("/oucab");
  return <FormularioInscricao />
}