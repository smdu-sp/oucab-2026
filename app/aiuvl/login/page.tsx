import { Card, CardContent } from '@/components/ui/card';
import { LoginForm } from './_components/login-form';
import { ModeToggle } from '@/components/toggle-theme';
import { auth } from '@/auth/aiuvl';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function AiuvlLogin() {
  const session = await auth();
  if (session) {
    const permissao = (session.user as any)?.permissao as string | undefined;
    if (session.user?.tipo === 'externo') {
      if ((session.user as any)?.primeiroAcesso) redirect('/aiuvl/portal/alterar-senha');
      redirect('/aiuvl/portal/minha-inscricao');
    }
    if (permissao && ['DEV', 'ADM'].includes(permissao)) redirect('/aiuvl/candidaturas');
    redirect('/api/auth-aiuvl/signout?callbackUrl=/aiuvl/login');
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-muted dark:bg-background'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden py-0'>
            <CardContent className='relative grid p-0 md:grid-cols-2'>
              <LoginForm />
              <div className='relative hidden bg-muted md:block'>
                <Image
                  width={1200}
                  height={1200}
                  src='/aiuvl/martinelli_dia.jpg'
                  alt='Vila Leopoldina'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <ModeToggle className='z-50 absolute right-2 top-2' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
