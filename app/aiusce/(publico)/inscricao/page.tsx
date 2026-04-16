import { redirect } from 'next/navigation';
import FormularioInscricao from './_components/formulario-inscricao';
import { prazoAiusceEncerrado } from '@/lib/config';

export default function Inscrição() {
  if (prazoAiusceEncerrado()) redirect("/aiusce");
  return <FormularioInscricao />
}