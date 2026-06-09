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

export const PRAZO_INSCRICAO_REP_MORADIA = new Date(
  process.env.PRAZO_INSCRICAO_REP_MORADIA ?? "2026-06-16T23:59:59.000Z"
);

export function prazoRepMoradiaEncerrado(): boolean {
  return new Date() > PRAZO_INSCRICAO_REP_MORADIA;
}

export const INICIO_INSCRICAO_ELEITORES = new Date(
  process.env.INICIO_INSCRICAO_ELEITORES ?? "2026-06-02T00:00:00.000Z"
);
export const PRAZO_INSCRICAO_ELEITORES = new Date(
  process.env.PRAZO_INSCRICAO_ELEITORES ?? "2026-06-07T23:59:59.000Z"
);

export function periodoInscricaoEleitoresAberto(): boolean {
  const agora = new Date();
  return agora >= INICIO_INSCRICAO_ELEITORES && agora <= PRAZO_INSCRICAO_ELEITORES;
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

// --- AIUVL ---
export const INICIO_INSCRICAO_AIUVL_CANDIDATOS = new Date(
  process.env.INICIO_INSCRICAO_AIUVL_CANDIDATOS ?? "2026-05-07T00:00:00.000Z"
);
export const PRAZO_INSCRICAO_AIUVL_CANDIDATOS = new Date(
  process.env.PRAZO_INSCRICAO_AIUVL_CANDIDATOS ?? "2026-05-21T23:59:59.999Z"
);

export const INICIO_INSCRICAO_AIUVL_ELEITORES = new Date(
  process.env.INICIO_INSCRICAO_AIUVL_ELEITORES ?? "2026-06-15T00:00:00.000Z"
);
export const PRAZO_INSCRICAO_AIUVL_ELEITORES = new Date(
  process.env.PRAZO_INSCRICAO_AIUVL_ELEITORES ?? "2026-06-24T23:59:59.999Z"
);

export function prazoCandidatosAiuvlEncerrado(): boolean {
  return new Date() > PRAZO_INSCRICAO_AIUVL_CANDIDATOS;
}

export function prazoEleitoresAiuvlEncerrado(): boolean {
  return new Date() > PRAZO_INSCRICAO_AIUVL_ELEITORES;
}

export function periodoInscricaoCandidatosAiuvlAberto(): boolean {
  const agora = new Date();
  return agora >= INICIO_INSCRICAO_AIUVL_CANDIDATOS && agora <= PRAZO_INSCRICAO_AIUVL_CANDIDATOS;
}

export function periodoInscricaoEleitoresAiuvlAberto(): boolean {
  const agora = new Date();
  return agora >= INICIO_INSCRICAO_AIUVL_ELEITORES && agora <= PRAZO_INSCRICAO_AIUVL_ELEITORES;
}

export const DOC_COMPLEMENTAR_INICIO_AIUVL = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_INICIO_AIUVL ?? "2026-06-01T00:00:00.000Z"
);
export const DOC_COMPLEMENTAR_FIM_AIUVL = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_FIM_AIUVL ?? "2026-06-15T23:59:59.999Z"
);

export function periodoDocComplementarAbertoAiuvl(): boolean {
  const agora = new Date();
  return agora >= DOC_COMPLEMENTAR_INICIO_AIUVL && agora <= DOC_COMPLEMENTAR_FIM_AIUVL;
}

export const DOC_COMPLEMENTAR_ELEITOR_INICIO_AIUVL = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_ELEITOR_INICIO_AIUVL ?? "2026-07-01T00:00:00.000Z"
);
export const DOC_COMPLEMENTAR_ELEITOR_FIM_AIUVL = new Date(
  process.env.PRAZO_DOC_COMPLEMENTAR_ELEITOR_FIM_AIUVL ?? "2026-07-15T23:59:59.999Z"
);

export function periodoDocComplementarEleitorAbertoAiuvl(): boolean {
  const agora = new Date();
  return agora >= DOC_COMPLEMENTAR_ELEITOR_INICIO_AIUVL && agora <= DOC_COMPLEMENTAR_ELEITOR_FIM_AIUVL;
}
