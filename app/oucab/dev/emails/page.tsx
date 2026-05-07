import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { retornaPermissao } from "@/services/usuario";
import {
  emailBoasVindas,
  emailBoasVindasEleitor,
  emailRecuperacaoSenha,
  emailAtualizacaoStatus,
} from "@/lib/email";
import { APP_URL, DOC_COMPLEMENTAR_FIM } from "@/lib/config";
import EmailPreviewClient, { type EmailTemplate } from "@/components/dev/email-preview-client";

const NOME = "Maria Silva Santos";
const CPF = "12345678900";
const SENHA = "Abc@2026#!";
const MOTIVO =
  "A documentação apresentada está incompleta. O estatuto social não comprova a atuação da entidade na área de abrangência do projeto.";

export default async function OucabDevEmailsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const session = await auth();
  if (!session) redirect("/oucab/login");

  const permissao = await retornaPermissao(session.user?.id as string);
  if (permissao !== "DEV") redirect("/oucab/login");

  const base = APP_URL || "http://localhost:3000";

  const templates: EmailTemplate[] = [
    {
      id: "oucab-bv-candidato",
      grupo: "OUCAB",
      label: "Boas-vindas — Candidato",
      subject: "OUCAB 2026 — Cadastro realizado",
      ...emailBoasVindas({
        nome: NOME, cpf: CPF, senha: SENHA,
        tipoCadastro: "CANDIDATO", sistemaLabel: "OUCAB 2026",
        portalUrl: `${base}/oucab/login`,
      }),
    },
    {
      id: "oucab-bv-eleitor",
      grupo: "OUCAB",
      label: "Boas-vindas — Eleitor",
      subject: "OUCAB 2026 — Cadastro de Eleitor recebido",
      ...emailBoasVindasEleitor({ nome: NOME, sistemaLabel: "OUCAB 2026" }),
    },
    {
      id: "oucab-rec-senha",
      grupo: "OUCAB",
      label: "Recuperação de Senha",
      subject: "Recuperação de senha — OUCAB 2026",
      ...emailRecuperacaoSenha({
        nome: NOME, senha: SENHA,
        portalUrl: `${base}/oucab/login`, sistemaLabel: "OUCAB 2026",
      }),
    },
    {
      id: "oucab-status-deferido",
      grupo: "OUCAB",
      label: "Status — Deferido",
      subject: "OUCAB 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "DEFERIDO",
        portalUrl: `${base}/oucab/portal/minha-inscricao`, sistemaLabel: "OUCAB 2026",
      }),
    },
    {
      id: "oucab-status-indeferido",
      grupo: "OUCAB",
      label: "Status — Indeferido",
      subject: "OUCAB 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "INDEFERIDO", motivo: MOTIVO,
        portalUrl: `${base}/oucab/portal/minha-inscricao`, sistemaLabel: "OUCAB 2026",
      }),
    },
    {
      id: "oucab-status-aguardando",
      grupo: "OUCAB",
      label: "Status — Aguardando Docs",
      subject: "OUCAB 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "AGUARDANDO_DOCUMENTACAO",
        portalUrl: `${base}/oucab/portal/minha-inscricao`, sistemaLabel: "OUCAB 2026",
        prazoDocFim: DOC_COMPLEMENTAR_FIM,
      }),
    },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <EmailPreviewClient templates={templates} />
    </div>
  );
}
