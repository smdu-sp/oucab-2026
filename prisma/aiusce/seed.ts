import { PrismaClient } from '../../lib/generated/aiusce';

const prisma = new PrismaClient();

async function main() {

  await prisma.usuario.upsert({
    where: { email: 'vmabreu@prefeitura.sp.gov.br' },
    update: {
      email: 'vmabreu@prefeitura.sp.gov.br',
      nome: 'Victor Alexander Menezes de Abreu',
      permissao: "DEV",
      status: true,
      login: 'd927014',
    },
    create: {
      email: 'vmabreu@prefeitura.sp.gov.br',
      nome: 'Victor Alexander Menezes de Abreu',
      permissao: "DEV",
      status: true,
      login: 'd927014',
    },
  });
  console.log('Initial user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
