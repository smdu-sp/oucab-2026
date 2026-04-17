const MAIL_SERVER = process.env.MAIL_SERVER ?? "http://localhost:3501";
const MAIL_FROM = process.env.MAIL_FROM ?? "noreply@oucab.prefeitura.sp.gov.br";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  bcc?: string | string[];
}

export async function sendEmail({ to, subject, html, text, bcc }: SendEmailOptions) {
  const response = await fetch(`${MAIL_SERVER}/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: MAIL_FROM, to, subject, html, text, bcc }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha ao enviar e-mail: ${response.status} ${body}`);
  }

  return response.json();
}

export function emailRecuperacaoSenha({
  nome,
  senha,
  portalUrl,
  sistemaLabel,
}: {
  nome: string;
  senha: string;
  portalUrl: string;
  sistemaLabel: string;
}) {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: #6b21a8; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 22px;">${sistemaLabel}</h1>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #6b21a8;">Recuperação de senha</h2>
    <p>Olá, <strong>${nome}</strong>.</p>
    <p>Recebemos uma solicitação de recuperação de senha para a sua conta. Uma nova senha foi gerada automaticamente:</p>
    <div style="background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 8px;"><strong>Nova senha:</strong> <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:15px;">${senha}</code></p>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">Recomendamos que você altere sua senha após o login.</p>
    </div>
    <p style="text-align: center;">
      <a href="${portalUrl}" style="display:inline-block;background:#6b21a8;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">
        Acessar o Portal
      </a>
    </p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
      Se você não solicitou a recuperação de senha, ignore este e-mail.<br />
      Este é um e-mail automático. Não responda a esta mensagem.<br />
      Prefeitura de São Paulo — Operação Urbana Consorciada Água Branca
    </p>
  </div>
</body>
</html>`;

  const text = `Olá ${nome},\n\nSua nova senha de acesso ao portal ${sistemaLabel} é: ${senha}\n\nRecomendamos que você altere sua senha após o login.\n\nPortal: ${portalUrl}\n\nSe você não solicitou a recuperação de senha, ignore este e-mail.`;

  return { html, text };
}

export function emailBoasVindas({
  nome,
  cpf,
  senha,
  tipoCadastro,
}: {
  nome: string;
  cpf: string;
  senha: string;
  tipoCadastro: "ELEITOR" | "CANDIDATO";
}) {
  const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const tipoLabel = tipoCadastro === "CANDIDATO" ? "Candidato(a)" : "Eleitor(a)";
  const portalUrl = `${process.env.NEXTAUTH_URL ?? ""}/portal/login`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: #6b21a8; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 22px;">OUCAB 2026</h1>
    <p style="color: #e9d5ff; margin: 4px 0 0;">Operação Urbana Consorciada Água Branca</p>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #6b21a8;">Cadastro realizado com sucesso!</h2>
    <p>Olá, <strong>${nome}</strong>.</p>
    <p>Seu cadastro como <strong>${tipoLabel}</strong> foi recebido e está em análise.</p>
    <p>Para acessar o portal e acompanhar sua inscrição, utilize as credenciais abaixo:</p>
    <div style="background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 8px;"><strong>CPF:</strong> ${cpfFormatado}</p>
      <p style="margin: 0 0 8px;"><strong>Senha provisória:</strong> <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:15px;">${senha}</code></p>
      <p style="margin: 0; font-size: 13px; color: #6b7280;">Você será solicitado a criar uma nova senha no primeiro acesso.</p>
    </div>
    <p style="text-align: center;">
      <a href="${portalUrl}" style="display:inline-block;background:#6b21a8;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">
        Acessar o Portal
      </a>
    </p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
      Este é um e-mail automático. Não responda a esta mensagem.<br />
      Prefeitura de São Paulo — Operação Urbana Consorciada Água Branca
    </p>
  </div>
</body>
</html>`;

  const text = `Olá ${nome},\n\nSeu cadastro como ${tipoLabel} foi realizado com sucesso.\n\nAcesse o portal com:\nCPF: ${cpfFormatado}\nSenha provisória: ${senha}\n\nPortal: ${portalUrl}\n\nVocê será solicitado a criar uma nova senha no primeiro acesso.`;

  return { html, text };
}
