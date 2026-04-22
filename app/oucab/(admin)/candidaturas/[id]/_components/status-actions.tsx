/** @format */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, EyeOff, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BASE_PATH } from '@/lib/config';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface StatusActionsProps {
  id: string;
  statusAtual: string;
  isDev?: boolean;
  oculto?: boolean;
}

export function StatusActions({ id, statusAtual, isDev, oculto }: StatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [motivo, setMotivo] = useState('');

  async function atualizar(novoStatus: string, motivoTexto?: string) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/candidaturas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus, motivo: motivoTexto }),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function confirmarIndeferimento() {
    atualizar('INDEFERIDO', motivo);
    setDialogAberto(false);
    setMotivo('');
  }

  async function toggleOcultar() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/candidaturas/${id}/ocultar`, { method: 'PATCH' });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='flex gap-2 flex-wrap'>
        <Button
          variant='default'
          disabled={loading || statusAtual === 'DEFERIDO'}
          onClick={() => atualizar('DEFERIDO')}>
          <CheckCircle className='mr-2 h-4 w-4' />
          Deferir
        </Button>
        <Button
          variant='destructive'
          disabled={loading || statusAtual === 'INDEFERIDO'}
          onClick={() => setDialogAberto(true)}>
          <XCircle className='mr-2 h-4 w-4' />
          Indeferir
        </Button>
        {statusAtual !== 'EM_ANALISE' && (
          <Button variant='outline' disabled={loading} onClick={() => atualizar('EM_ANALISE')}>
            Retornar para Análise
          </Button>
        )}
        {isDev && (
          <Button
            variant='outline'
            disabled={loading}
            onClick={toggleOcultar}
            className={oculto ? 'border-amber-500 text-amber-600 hover:bg-amber-50' : ''}>
            {oculto ? (
              <><Eye className='mr-2 h-4 w-4' />Tornar Visível</>
            ) : (
              <><EyeOff className='mr-2 h-4 w-4' />Ocultar</>
            )}
          </Button>
        )}
      </div>

      <Dialog open={dialogAberto} onOpenChange={(v) => { setDialogAberto(v); if (!v) setMotivo(''); }}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Motivo do Indeferimento</DialogTitle>
          </DialogHeader>
          <div className='space-y-2'>
            <Label htmlFor='motivo'>Descreva o motivo do indeferimento</Label>
            <Textarea
              id='motivo'
              placeholder='Informe o motivo...'
              rows={4}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          <DialogFooter className='gap-2'>
            <Button variant='outline' onClick={() => { setDialogAberto(false); setMotivo(''); }}>
              Cancelar
            </Button>
            <Button variant='destructive' disabled={!motivo.trim()} onClick={confirmarIndeferimento}>
              <XCircle className='mr-2 h-4 w-4' />
              Confirmar Indeferimento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
