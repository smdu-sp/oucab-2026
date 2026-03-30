import { redirect } from 'next/navigation';
import FormularioInscricao from './_components/formulario-inscricao';
import { prazoEncerrado } from '@/lib/config';

export default function Inscrição() {
  if (prazoEncerrado()) redirect("/");
  return <FormularioInscricao />
}