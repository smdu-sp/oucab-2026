/**
 * Seed de teste para AIUVL — cria uma candidatura INDEFERIDA de rodada 1
 * para simular o fluxo de re-inscrição na reabertura.
 *
 * Uso: npx tsx prisma/aiuvl/seed-test.ts
 *
 * Credenciais geradas:
 *   E-mail:  teste.associacao@bairro.org
 *   Senha:   Teste@1234
 */

import { PrismaClient } from "../../lib/generated/aiuvl";
import bcryptjs from "bcryptjs";

const db = new PrismaClient();

const SENHA_PLANA = "Teste@1234";
const EMAIL = "teste.associacao@bairro.org";

async function main() {
  console.log("🌱 Criando dados de teste para AIUVL...\n");

  // Limpa registros anteriores do mesmo e-mail/CNPJ (idempotente)
  const usuarioExistente = await db.usuario.findUnique({ where: { email: EMAIL } });
  if (usuarioExistente) {
    const cands = await db.candidatura.findMany({ where: { usuarioId: usuarioExistente.id } });
    for (const c of cands) {
      await db.arquivo.deleteMany({ where: { candidaturaId: c.id } });
      const org = await db.organizacaoCandidata.findUnique({ where: { candidaturaId: c.id } });
      if (org) {
        await db.arquivo.deleteMany({ where: { orgCandidataId: org.id } });
        const cands2 = await db.candidato.findMany({ where: { candidaturaId: c.id } });
        for (const cc of cands2) {
          await db.arquivo.deleteMany({ where: { candidatoId: cc.id } });
        }
        await db.candidato.deleteMany({ where: { candidaturaId: c.id } });
        await db.organizacaoCandidata.delete({ where: { id: org.id } });
      }
      await db.candidatura.delete({ where: { id: c.id } });
    }
    await db.usuario.delete({ where: { id: usuarioExistente.id } });
    console.log("♻️  Registro anterior removido.\n");
  }

  const senhaHash = await bcryptjs.hash(SENHA_PLANA, 10);

  // 1. Usuário externo
  const usuario = await db.usuario.create({
    data: {
      tipo: "EXTERNO",
      nome: "Associação de Bairro Jardim Teste",
      email: EMAIL,
      senha: senhaHash,
      status: true,
      primeiroAcesso: false,
    },
  });

  // 2. Candidatura INDEFERIDA — rodada 1
  const candidatura = await db.candidatura.create({
    data: {
      tipoInscricao: "CANDIDATO",
      status: "INDEFERIDO",
      rodada: 1,
      motivoIndeferimento: "Documentação incompleta: estatuto social com validade vencida.",
      usuarioId: usuario.id,
    },
  });

  // 3. Organização candidata (segmento ASSOCIACAO_BAIRRO — habilitado na reabertura)
  await db.organizacaoCandidata.create({
    data: {
      razaoSocial: "Associação de Bairro Jardim Teste",
      cnpj: "12345678000199",
      segmento: "ASSOCIACAO_BAIRRO",
      dataAbertura: new Date("2010-03-15"),
      sede: "Rua Teste, 100 — São Paulo/SP",
      repNome: "João da Silva",
      repCpf: "12345678901",
      repTituloEleitor: "123456789012",
      repDomicilio: "São Paulo/SP",
      emailEntidade: EMAIL,
      telefone: "(11) 91234-5678",
      candidaturaId: candidatura.id,
    },
  });

  // 4. Candidato Titular
  await db.candidato.create({
    data: {
      tipoCandidato: "TITULAR",
      nome: "Maria Oliveira Titular",
      genero: "FEMININO",
      dataNascimento: new Date("1985-06-20"),
      cpf: "98765432100",
      tituloEleitor: "987654321098",
      domicilioEleitoral: "São Paulo/SP",
      email: "titular@bairro.org",
      telefone: "(11) 91111-1111",
      candidaturaId: candidatura.id,
    },
  });

  // 5. Candidato Suplente
  await db.candidato.create({
    data: {
      tipoCandidato: "SUPLENTE",
      nome: "Pedro Costa Suplente",
      genero: "MASCULINO",
      dataNascimento: new Date("1990-11-05"),
      cpf: "11122233344",
      tituloEleitor: "111222333445",
      domicilioEleitoral: "São Paulo/SP",
      email: "suplente@bairro.org",
      telefone: "(11) 92222-2222",
      candidaturaId: candidatura.id,
    },
  });

  console.log("✅ Candidatura de teste criada com sucesso!\n");
  console.log("─────────────────────────────────────────");
  console.log("  Entidade : Associação de Bairro Jardim Teste");
  console.log("  CNPJ     : 12.345.678/0001-99");
  console.log("  Segmento : Associação de Bairro");
  console.log("  Status   : INDEFERIDO (rodada 1)");
  console.log("─────────────────────────────────────────");
  console.log("  Login (e-mail): " + EMAIL);
  console.log("  Senha         : " + SENHA_PLANA);
  console.log("─────────────────────────────────────────\n");
  console.log("Para testar a reabertura:");
  console.log("  1. Certifique-se de que as vars de ambiente estão configuradas:");
  console.log("     AIUVL_REABERTURA_CANDIDATOS_ABERTA=true");
  console.log("     AIUVL_RODADA_CANDIDATOS=2");
  console.log("     AIUVL_REABERTURA_SEGMENTOS=ASSOCIACAO_BAIRRO,ENTIDADE_ACADEMICA,REP_EMPRESARIAL");
  console.log("  2. Acesse /aiuvl e clique em 'Reabertura — Inscrição de Candidatos'");
  console.log("  3. Preencha com o CNPJ 12.345.678/0001-99 (mesmo da candidatura indeferida)");
  console.log("  4. Uma nova candidatura (rodada 2) será criada para o mesmo usuário\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
