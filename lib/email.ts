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

// ---------------------------------------------------------------------------
// Identidade visual por sistema
// ---------------------------------------------------------------------------

export interface SistemaIdentidade {
  label: string;        // "OUCAB 2026"
  nomeCompleto: string; // "Operação Urbana Consorciada Água Branca"
  logoUrl: string;      // URL absoluta do logo (fundo claro)
  portalUrl: string;    // URL da área de login
  cor: string;          // cor principal hex
}

export function identidadeOucab(): SistemaIdentidade {
  const base = process.env.AUTH_URL?.replace("/api/auth", "") ?? process.env.NEXTAUTH_URL ?? "";
  return {
    label: "OUCAB 2026",
    nomeCompleto: "Operação Urbana Consorciada Água Branca",
    logoUrl: `${base}/oucab/logo_escuro.png`,
    portalUrl: `${base}/oucab/login`,
    cor: "#7c3aed",
  };
}

export function identidadeAiusce(): SistemaIdentidade {
  const base = process.env.AUTH_URL?.replace("/api/auth", "") ?? process.env.NEXTAUTH_URL ?? "";
  return {
    label: "AIUSCE 2026",
    nomeCompleto: "Associação de Interessados na Urbanização e Saneamento do Centro Expandido",
    logoUrl: `${base}/aiusce/logo_escuro.png`,
    portalUrl: `${base}/aiusce/login`,
    cor: "#7c3aed",
  };
}

// ---------------------------------------------------------------------------
// Layout base — replica o portal
// ---------------------------------------------------------------------------

function baseLayout({
  id,
  body,
  accentColor,
}: {
  id: SistemaIdentidade;
  body: string;
  accentColor?: string; // se diferente da cor principal (ex: vermelho p/ indeferido)
}) {
  const topColor = accentColor ?? id.cor;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Topo colorido -->
    <tr>
      <td height="5" style="background:${topColor};border-radius:12px 12px 0 0;font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- Cabeçalho branco com logo -->
    <tr>
      <td style="background:#ffffff;padding:28px 40px 24px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
        <img src="${id.logoUrl}" alt="${id.label}" height="48" style="height:48px;max-width:200px;object-fit:contain;display:block;margin:0 auto 12px;" />
        <p style="margin:0;font-size:11px;color:#9ca3af;letter-spacing:0.8px;text-transform:uppercase;">${id.nomeCompleto}</p>
      </td>
    </tr>

    <!-- Divisor -->
    <tr>
      <td style="background:#ffffff;padding:0 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
        <div style="border-top:1px solid #e5e7eb;"></div>
      </td>
    </tr>

    <!-- Corpo -->
    <tr>
      <td style="background:#ffffff;padding:32px 40px 36px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
        ${body}
      </td>
    </tr>

    <!-- Rodapé -->
    <tr>
      <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:18px 40px;text-align:center;">
        <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">Este é um e-mail automático — não responda a esta mensagem.</p>
        <p style="margin:0;font-size:12px;color:#d1d5db;">Prefeitura de São Paulo · Secretaria Municipal de Urbanismo e Licenciamento</p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Utilitários de bloco
// ---------------------------------------------------------------------------

function btnCTA(url: string, texto: string, cor: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
    <tr><td align="center">
      <a href="${url}" target="_blank"
         style="display:inline-block;background:${cor};color:#ffffff;font-size:15px;font-weight:700;
                padding:14px 40px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
        ${texto} →
      </a>
    </td></tr>
  </table>`;
}

function credenciaisBox(linhas: { label: string; valor: string }[]) {
  const rows = linhas.map(
    (l) => `<tr>
      <td style="padding:10px 0;font-size:13px;color:#6b7280;width:40%;vertical-align:top;">${l.label}</td>
      <td style="padding:10px 0;font-size:14px;color:#111827;font-weight:700;vertical-align:top;font-family:monospace,Courier;">
        ${l.valor}
      </td>
    </tr>
    <tr><td colspan="2" style="padding:0;"><div style="border-top:1px solid #f3f4f6;"></div></td></tr>`,
  ).join("");
  return `<table width="100%" cellpadding="0" cellspacing="0"
          style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:4px 20px;margin:20px 0;">
    <tr><td><table width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
  </table>`;
}

function alertaBox(html: string, bg: string, borda: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
    <tr>
      <td style="background:${bg};border-left:4px solid ${borda};border-radius:0 6px 6px 0;
                 padding:14px 18px;font-size:14px;color:#374151;line-height:1.65;">
        ${html}
      </td>
    </tr>
  </table>`;
}

function titulo(texto: string) {
  return `<h2 style="margin:0 0 12px;font-size:21px;font-weight:700;color:#111827;line-height:1.3;">${texto}</h2>`;
}

function paragrafo(texto: string) {
  return `<p style="margin:0 0 14px;font-size:15px;color:#374151;line-height:1.75;">${texto}</p>`;
}

// ---------------------------------------------------------------------------
// 1. Boas-vindas — candidato (com credenciais)
// ---------------------------------------------------------------------------

export function emailBoasVindas({
  nome,
  cpf,
  senha,
  tipoCadastro,
  sistemaLabel = "OUCAB 2026",
  portalUrl,
}: {
  nome: string;
  cpf: string;
  senha: string;
  tipoCadastro: "ELEITOR" | "CANDIDATO";
  sistemaLabel?: string;
  portalUrl?: string;
}) {
  const id = sistemaLabel.toUpperCase().includes("AIUSCE")
    ? identidadeAiusce()
    : identidadeOucab();

  const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const tipoLabel = tipoCadastro === "CANDIDATO" ? "Candidato(a)" : "Eleitor(a)";
  const loginUrl = portalUrl ?? id.portalUrl;
  const primeiroNome = nome.split(" ")[0];

  const body = `
    ${titulo(`Cadastro realizado com sucesso!`)}
    ${paragrafo(`Olá, <strong>${primeiroNome}</strong>! Seu cadastro como <strong>${tipoLabel}</strong> foi recebido e está em análise. Você será notificado(a) por e-mail quando houver atualização.`)}

    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#7c3aed;text-transform:uppercase;letter-spacing:0.6px;">Suas credenciais de acesso</p>
    ${credenciaisBox([
      { label: "CPF (login)", valor: cpfFormatado },
      { label: "Senha provisória", valor: senha },
    ])}

    ${alertaBox(
      `<strong>Atenção:</strong> Ao acessar o portal pela primeira vez, você será solicitado(a) a criar uma nova senha pessoal. Guarde suas credenciais com segurança.`,
      "#fffbeb",
      "#f59e0b",
    )}

    ${btnCTA(loginUrl, "Acessar o Portal", id.cor)}
  `;

  const html = baseLayout({ id, body });

  const text = `Olá, ${nome}!\n\nSeu cadastro como ${tipoLabel} foi recebido com sucesso.\n\nCPF: ${cpfFormatado}\nSenha provisória: ${senha}\n\nTroque sua senha no primeiro acesso.\n\nPortal: ${loginUrl}`;

  return { html, text };
}

// ---------------------------------------------------------------------------
// 2. Boas-vindas — eleitor (sem credenciais)
// ---------------------------------------------------------------------------

export function emailBoasVindasEleitor({
  nome,
  sistemaLabel = "OUCAB 2026",
}: {
  nome: string;
  sistemaLabel?: string;
}) {
  const id = sistemaLabel.toUpperCase().includes("AIUSCE")
    ? identidadeAiusce()
    : identidadeOucab();

  const primeiroNome = nome.split(" ")[0];

  const body = `
    ${titulo("Cadastro recebido!")}
    ${paragrafo(`Olá, <strong>${primeiroNome}</strong>! Seu cadastro de <strong>eleitor(a)</strong> foi recebido com sucesso e será analisado pela nossa equipe.`)}
    ${paragrafo("Você receberá um e-mail com o resultado da análise assim que ela for concluída.")}
  `;

  const html = baseLayout({ id, body });

  const text = `Olá, ${nome}!\n\nSeu cadastro de eleitor(a) foi recebido com sucesso e está sendo analisado.`;

  return { html, text };
}

// ---------------------------------------------------------------------------
// 3. Atualização de status da inscrição
// ---------------------------------------------------------------------------

export function emailAtualizacaoStatus({
  nome,
  novoStatus,
  motivo,
  portalUrl,
  sistemaLabel,
  prazoDocFim,
  linkOrientacaoDoc,
}: {
  nome: string;
  novoStatus: "DEFERIDO" | "INDEFERIDO" | "AGUARDANDO_DOCUMENTACAO";
  motivo?: string;
  portalUrl: string;
  sistemaLabel: string;
  prazoDocFim?: Date;
  linkOrientacaoDoc?: string;
}) {
  const id = sistemaLabel.toUpperCase().includes("AIUSCE")
    ? identidadeAiusce()
    : identidadeOucab();

  const primeiroNome = nome.split(" ")[0];

  type Cfg = { accentColor: string; titulo: string; intro: string; btnTexto: string };
  const cfg: Record<typeof novoStatus, Cfg> = {
    DEFERIDO: {
      accentColor: "#16a34a",
      titulo: "Inscrição Deferida",
      intro: `Temos uma ótima notícia! Sua inscrição no <strong>${id.label}</strong> foi <strong>aprovada (deferida)</strong>. Você está apto(a) a participar do processo.`,
      btnTexto: "Acessar o Portal",
    },
    INDEFERIDO: {
      accentColor: "#dc2626",
      titulo: "Inscrição Indeferida",
      intro: `Após análise, informamos que sua inscrição no <strong>${id.label}</strong> foi <strong>indeferida</strong>.`,
      btnTexto: "Ver detalhes no Portal",
    },
    AGUARDANDO_DOCUMENTACAO: {
      accentColor: "#d97706",
      titulo: "Documentação Complementar Necessária",
      intro: `Sua inscrição no <strong>${id.label}</strong> está em análise, mas identificamos a necessidade de <strong>envio de documentação complementar</strong>. Acesse o portal e envie os arquivos solicitados dentro do prazo.`,
      btnTexto: "Enviar Documentação",
    },
  };

  const { accentColor, titulo: tit, intro, btnTexto } = cfg[novoStatus];

  let extras = "";

  if (novoStatus === "DEFERIDO") {
    extras = alertaBox(
      `Guarde o comprovante de deferimento disponível no portal para eventuais comprovações futuras.`,
      "#f0fdf4",
      "#16a34a",
    );
  }

  if (novoStatus === "INDEFERIDO" && motivo) {
    extras = alertaBox(
      `<strong>Motivo do indeferimento:</strong><br />${motivo}`,
      "#fef2f2",
      "#dc2626",
    );
  }

  if (novoStatus === "AGUARDANDO_DOCUMENTACAO") {
    const dataFormatada = prazoDocFim
      ? prazoDocFim.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
      : null;

    extras = alertaBox(
      `${dataFormatada ? `<strong>Prazo para envio:</strong> até ${dataFormatada}.<br />` : ""}${
        linkOrientacaoDoc
          ? `Consulte <a href="${linkOrientacaoDoc}" style="color:${accentColor};font-weight:700;">quais documentos são necessários</a> antes de enviar.`
          : "Acesse o portal para verificar quais documentos precisam ser enviados."
      }`,
      "#fffbeb",
      "#f59e0b",
    );
  }

  // Badge de status inline no topo do body
  const badgeCores: Record<typeof novoStatus, { bg: string; text: string }> = {
    DEFERIDO:                { bg: "#dcfce7", text: "#15803d" },
    INDEFERIDO:              { bg: "#fee2e2", text: "#b91c1c" },
    AGUARDANDO_DOCUMENTACAO: { bg: "#fef9c3", text: "#a16207" },
  };
  const badgeLabels: Record<typeof novoStatus, string> = {
    DEFERIDO: "✅ Deferido",
    INDEFERIDO: "❌ Indeferido",
    AGUARDANDO_DOCUMENTACAO: "📎 Aguardando Documentação",
  };

  const { bg, text: badgeTextColor } = badgeCores[novoStatus];
  const badge = `<p style="margin:0 0 20px;">
    <span style="display:inline-block;background:${bg};color:${badgeTextColor};font-size:12px;font-weight:700;
                 padding:4px 12px;border-radius:999px;letter-spacing:0.4px;">
      ${badgeLabels[novoStatus]}
    </span>
  </p>`;

  const body = `
    ${badge}
    ${titulo(tit)}
    ${paragrafo(`Olá, <strong>${primeiroNome}</strong>.`)}
    ${paragrafo(intro)}
    ${extras}
    ${btnCTA(portalUrl, btnTexto, accentColor)}
    <p style="margin:16px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
      Dúvidas? Entre em contato pelos canais oficiais da Prefeitura de São Paulo.
    </p>
  `;

  const html = baseLayout({ id, body, accentColor });

  const statusTexto = {
    DEFERIDO: "deferida",
    INDEFERIDO: "indeferida",
    AGUARDANDO_DOCUMENTACAO: "aguardando documentação complementar",
  }[novoStatus];

  const motivoTexto = novoStatus === "INDEFERIDO" && motivo ? `\nMotivo: ${motivo}` : "";
  const prazoTexto = novoStatus === "AGUARDANDO_DOCUMENTACAO" && prazoDocFim
    ? `\nPrazo para envio: até ${prazoDocFim.toLocaleDateString("pt-BR")}.`
    : "";
  const linkTexto = linkOrientacaoDoc ? `\nDocumentos necessários: ${linkOrientacaoDoc}` : "";

  const text = `Olá, ${nome}!\n\nSua inscrição no ${id.label} está ${statusTexto}.${motivoTexto}${prazoTexto}${linkTexto}\n\nAcesse o portal: ${portalUrl}`;

  return { html, text };
}

// ---------------------------------------------------------------------------
// 4. Recuperação de senha
// ---------------------------------------------------------------------------

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
  const id = sistemaLabel.toUpperCase().includes("AIUSCE")
    ? identidadeAiusce()
    : identidadeOucab();

  const primeiroNome = nome.split(" ")[0];

  const body = `
    ${titulo("Recuperação de senha")}
    ${paragrafo(`Olá, <strong>${primeiroNome}</strong>. Uma nova senha temporária foi gerada para o seu acesso ao <strong>${id.label}</strong>.`)}

    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#7c3aed;text-transform:uppercase;letter-spacing:0.6px;">Sua nova senha temporária</p>
    ${credenciaisBox([{ label: "Senha temporária", valor: senha }])}

    ${alertaBox(
      `<strong>Importante:</strong> Esta senha é temporária. Ao acessar o portal, você será solicitado(a) a criar uma nova senha pessoal antes de continuar.`,
      "#fffbeb",
      "#f59e0b",
    )}

    ${btnCTA(portalUrl, "Acessar o Portal", id.cor)}

    <p style="margin:16px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
      Se você não solicitou a recuperação de senha, ignore este e-mail — sua conta permanece segura.
    </p>
  `;

  const html = baseLayout({ id, body });

  const text = `Olá, ${primeiroNome}!\n\nSua senha temporária para o ${id.label} é: ${senha}\n\nTroque-a imediatamente após o login.\n\nPortal: ${portalUrl}\n\nSe não foi você, ignore este e-mail.`;

  return { html, text };
}
