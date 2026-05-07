import { notFound, redirect } from "next/navigation";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";
import {
  emailBoasVindasEntidade,
  emailRecuperacaoSenha,
  emailAtualizacaoStatus,
} from "@/lib/email";
import { APP_URL } from "@/lib/config";
import EmailPreviewClient, { type EmailTemplate } from "@/components/dev/email-preview-client";

const NOME = "Maria Silva Santos";
const SENHA = "Abc@2026#!";
const RAZAO = "Associação Comunitária Exemplo";
const CNPJ = "12.345.678/0001-90";
const EMAIL_ENT = "contato@exemplo.org.br";
const MOTIVO =
  "A documentação apresentada está incompleta. O estatuto social não comprova a atuação da entidade na área de abrangência do projeto.";

export default async function AiuvlDevEmailsPage() {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario?.permissao || usuario.permissao !== "DEV") redirect("/aiuvl/login");

  const base = APP_URL || "http://localhost:3000";

  const templates: EmailTemplate[] = [
    {
      id: "aiuvl-inscricao-candidatura",
      grupo: "AIU-VL",
      label: "Inscrição — Candidatura",
      subject: "AIU-VL 2026 — Inscrição de Candidatura recebida",
      ...emailBoasVindasEntidade({
        razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT,
        senha: SENHA, tipoInscricao: "CANDIDATO", sistemaLabel: "AIU-VL 2026",
      }),
    },
    {
      id: "aiuvl-inscricao-eleitor",
      grupo: "AIU-VL",
      label: "Inscrição — Eleitor",
      subject: "AIU-VL 2026 — Inscrição de Eleitor recebida",
      ...emailBoasVindasEntidade({
        razaoSocial: RAZAO, cnpj: CNPJ, emailEntidade: EMAIL_ENT,
        senha: SENHA, tipoInscricao: "ELEITOR", sistemaLabel: "AIU-VL 2026",
      }),
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
