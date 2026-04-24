/**
 * Data limite para inscrições. Definida via variável de ambiente PRAZO_INSCRICAO.
 * Formato esperado: ISO 8601 (ex: "2026-11-30T23:59:59.999Z")
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const APP_URL = process.env.APP_URL ?? "";

export const PRAZO_INSCRICAO = new Date(
  process.env.PRAZO_INSCRICAO ?? "2026-11-30T23:59:59.999Z"
);

export function prazoEncerrado(): boolean {
  return new Date() > PRAZO_INSCRICAO;
}

export const PRAZO_INSCRICAO_AIUSCE = new Date(
  process.env.PRAZO_INSCRICAO_AIUSCE ?? "2026-05-08T23:59:59.999Z"
);

export function prazoAiusceEncerrado(): boolean {
  return new Date() > PRAZO_INSCRICAO_AIUSCE;
}

export const DOC_COMPLEMENTAR_INICIO = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_INICIO ?? "2026-06-01T00:00:00.000Z"
);
export const DOC_COMPLEMENTAR_FIM = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_FIM ?? "2026-06-15T23:59:59.999Z"
);

export function periodoDocComplementarAberto(): boolean {
  const agora = new Date();
  return agora >= DOC_COMPLEMENTAR_INICIO && agora <= DOC_COMPLEMENTAR_FIM;
}

export const DOC_COMPLEMENTAR_INICIO_AIUSCE = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_INICIO_AIUSCE ?? "2026-06-01T00:00:00.000Z"
);
export const DOC_COMPLEMENTAR_FIM_AIUSCE = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_FIM_AIUSCE ?? "2026-06-15T23:59:59.999Z"
);

export function periodoDocComplementarAbertoAiusce(): boolean {
  const agora = new Date();
  return agora >= DOC_COMPLEMENTAR_INICIO_AIUSCE && agora <= DOC_COMPLEMENTAR_FIM_AIUSCE;
}
