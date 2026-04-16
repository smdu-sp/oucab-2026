/**
 * Data limite para inscrições. Definida via variável de ambiente PRAZO_INSCRICAO.
 * Formato esperado: ISO 8601 (ex: "2026-11-30T23:59:59.999Z")
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
