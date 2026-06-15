import { PrismaClient } from "../../lib/generated/aiuvl";
const db = new PrismaClient();
async function main() {
  const u = await db.usuario.upsert({
    where: { email: "aalevictor@gmail.com" },
    update: { login: "d927014", permissao: "DEV", tipo: "INTERNO", status: true },
    create: {
      nome: "Victor Abreu",
      email: "aalevictor@gmail.com",
      login: "d927014",
      tipo: "INTERNO",
      permissao: "DEV",
      status: true,
    },
  });
  console.log("✅ Usuário DEV:", u.login, "|", u.permissao, "|", u.email);
}
main().catch(console.error).finally(() => db.$disconnect());
