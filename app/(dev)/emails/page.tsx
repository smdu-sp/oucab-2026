import {
  emailBoasVindas,
  emailBoasVindasEleitor,
  emailBoasVindasEntidade,
  emailRecuperacaoSenha,
  emailAtualizacaoStatus,
} from "@/lib/email";
import {
  APP_URL,
  DOC_COMPLEMENTAR_FIM,
  DOC_COMPLEMENTAR_FIM_AIUSCE,
} from "@/lib/config";
import EmailPreviewClient, { type EmailTemplate } from "./_components/email-preview-client";

const NOME = "Maria Silva Santos";
const CPF = "12345678900";
const SENHA = "Abc@2026#!";
const RAZAO = "Associação Comunitária Exemplo";
const CNPJ = "12.345.678/0001-90";
const EMAIL_ENT = "contato@exemplo.org.br";
const MOTIVO =
  "A documentação apresentada está incompleta. O estatuto social não comprova a atuação da entidade na área de abrangência do projeto.";

export default function DevEmailsPage() {
  const base = APP_URL || "http://localhost:3000";

  const templates: EmailTemplate[] = [
    // -----------------------------------------------------------------------
    // OUCAB
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // AIUSCE
    // -----------------------------------------------------------------------
    {
      id: "aiusce-inscricao-candidato",
      grupo: "AIUSCE",
      label: "Inscrição — Candidato (Entidade)",
      subject: "AIUSCE 2026 — Inscrição de Candidato recebida",
      ...emailBoasVindasEntidade({ razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT, senha: SENHA, tipoInscricao: "CANDIDATO", sistemaLabel: "AIUSCE 2026" }),
    },
    {
      id: "aiusce-inscricao-eleitor",
      grupo: "AIUSCE",
      label: "Inscrição — Eleitor (Entidade)",
      subject: "AIUSCE 2026 — Inscrição de Eleitor recebida",
      ...emailBoasVindasEntidade({ razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT, senha: SENHA, tipoInscricao: "ELEITOR", sistemaLabel: "AIUSCE 2026" }),
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

    // -----------------------------------------------------------------------
    // AIU-VL
    // -----------------------------------------------------------------------
    {
      id: "aiuvl-inscricao-candidatura",
      grupo: "AIU-VL",
      label: "Inscrição — Candidatura",
      subject: "AIU-VL 2026 — Inscrição de Candidatura recebida",
      ...emailBoasVindasEntidade({ razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT, senha: SENHA, tipoInscricao: "CANDIDATO", sistemaLabel: "AIU-VL 2026" }),
    },
    {
      id: "aiuvl-inscricao-eleitor",
      grupo: "AIU-VL",
      label: "Inscrição — Eleitor",
      subject: "AIU-VL 2026 — Inscrição de Eleitor recebida",
      ...emailBoasVindasEntidade({ razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT, senha: SENHA, tipoInscricao: "ELEITOR", sistemaLabel: "AIU-VL 2026" }),
    },
    {
      id: "aiuvl-rec-senha",
      grupo: "AIU-VL",
      label: "Recuperação de Senha",
      subject: "Recuperação de senha — AIU-VL 2026",
      ...emailRecuperacaoSenha({
        nome: NOME, senha: SENHA,
        portalUrl: `${base}/aiuvl/login`, sistemaLabel: "AIU-VL 2026",
      }),
    },
    {
      id: "aiuvl-status-deferido",
      grupo: "AIU-VL",
      label: "Status — Deferido",
      subject: "AIU-VL 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "DEFERIDO",
        portalUrl: `${base}/aiuvl/portal/minha-inscricao`, sistemaLabel: "AIU-VL 2026",
      }),
    },
    {
      id: "aiuvl-status-indeferido",
      grupo: "AIU-VL",
      label: "Status — Indeferido",
      subject: "AIU-VL 2026 — Atualização da sua inscrição",
      ...emailAtualizacaoStatus({
        nome: NOME, novoStatus: "INDEFERIDO", motivo: MOTIVO,
        portalUrl: `${base}/aiuvl/portal/minha-inscricao`, sistemaLabel: "AIU-VL 2026",
      }),
    },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <EmailPreviewClient templates={templates} />
    </div>
  );
}
