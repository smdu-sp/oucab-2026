import { notFound, redirect } from "next/navigation";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import {
  emailBoasVindasEntidade,
  emailRecuperacaoSenha,
  emailAtualizacaoStatus,
} from "@/lib/email";
import { APP_URL, DOC_COMPLEMENTAR_FIM_AIUSCE } from "@/lib/config";
import EmailPreviewClient, { type EmailTemplate } from "@/components/dev/email-preview-client";

const NOME = "Maria Silva Santos";
const SENHA = "Abc@2026#!";
const RAZAO = "Associação Comunitária Exemplo";
const CNPJ = "12.345.678/0001-90";
const EMAIL_ENT = "contato@exemplo.org.br";
const MOTIVO =
  "A documentação apresentada está incompleta. O estatuto social não comprova a atuação da entidade na área de abrangência do projeto.";

export default async function AiusceDevEmailsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || usuario.permissao !== "DEV") redirect("/aiusce/login");

  const base = APP_URL || "http://localhost:3000";

  const templates: EmailTemplate[] = [
    {
      id: "aiusce-inscricao-candidato",
      grupo: "AIUSCE",
      label: "Inscrição — Candidato (Entidade)",
      subject: "AIUSCE 2026 — Inscrição de Candidato recebida",
      ...emailBoasVindasEntidade({
        razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT,
        senha: SENHA, tipoInscricao: "CANDIDATO", sistemaLabel: "AIUSCE 2026",
      }),
    },
    {
      id: "aiusce-inscricao-eleitor",
      grupo: "AIUSCE",
      label: "Inscrição — Eleitor (Entidade)",
      subject: "AIUSCE 2026 — Inscrição de Eleitor recebida",
      ...emailBoasVindasEntidade({
        razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT,
        senha: SENHA, tipoInscricao: "ELEITOR", sistemaLabel: "AIUSCE 2026",
      }),
    },
    {
      id: "aiusce-rec-senha",
      grupo: "AIUSCE",
      label: "Recuperação de Senha",
      subject: "Recuperação de senha — AIUSCE 2026",
      ...emailRecuperacaoSenha({
        nome: NOME, senha: SENHA,
        portalUrl: `${base}/aiusce/login`, sistemaLabel: "AIUSCE 2026",
      }),
    },
    {
      id: "aiusce-status-deferido",
      grupo: "AIUSCE",
      label: "Status — Deferido",
      subject: "AIUSCE 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "DEFERIDO",
        portalUrl: `${base}/aiusce/portal/minha-inscricao`, sistemaLabel: "AIUSCE 2026",
      }),
    },
    {
      id: "aiusce-status-indeferido",
      grupo: "AIUSCE",
      label: "Status — Indeferido",
      subject: "AIUSCE 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "INDEFERIDO", motivo: MOTIVO,
        portalUrl: `${base}/aiusce/portal/minha-inscricao`, sistemaLabel: "AIUSCE 2026",
      }),
    },
    {
      id: "aiusce-status-aguardando",
      grupo: "AIUSCE",
      label: "Status — Aguardando Docs",
      subject: "AIUSCE 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "AGUARDANDO_DOCUMENTACAO",
        portalUrl: `${base}/aiusce/portal/minha-inscricao`, sistemaLabel: "AIUSCE 2026",
        prazoDocFim: DOC_COMPLEMENTAR_FIM_AIUSCE,
      }),
    },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <EmailPreviewClient templates={templates} />
    </div>
  );
}
