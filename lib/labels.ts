// Centralized label and color definitions for enums displayed in the UI.

export interface LabelInfo {
  label: string;
  className: string;
}

export const STATUS_INFO: Record<string, LabelInfo> = {
  EM_ANALISE:              { label: "Em Análise",                  className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  DEFERIDO:                { label: "Deferido",                    className: "bg-green-100 text-green-800 border-green-300" },
  INDEFERIDO:              { label: "Indeferido",                  className: "bg-red-100 text-red-800 border-red-300" },
  AGUARDANDO_DOCUMENTACAO: { label: "Aguardando Documentação",     className: "bg-amber-100 text-amber-800 border-amber-300" },
};

export const TIPO_INSCRICAO_INFO: Record<string, LabelInfo> = {
  MORADOR:            { label: "Morador",                       className: "bg-blue-100 text-blue-800 border-blue-300" },
  TRABALHADOR:        { label: "Trabalhador",                   className: "bg-sky-100 text-sky-800 border-sky-300" },
  REP_MORADIA:        { label: "Rep. Mov. de Moradia",          className: "bg-purple-100 text-purple-800 border-purple-300" },
  REP_ONGS:           { label: "Rep. ONG",                      className: "bg-violet-100 text-violet-800 border-violet-300" },
  REP_PROFISSIONAIS:  { label: "Rep. Entidade Profissional",    className: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  REP_EMPRESARIAIS:   { label: "Rep. Entidade Empresarial",     className: "bg-slate-100 text-slate-800 border-slate-300" },
  CANDIDATO:          { label: "Candidato",                     className: "bg-purple-100 text-purple-800 border-purple-300" },
  ELEITOR:            { label: "Eleitor",                       className: "bg-teal-100 text-teal-800 border-teal-300" },
};

export const SEGMENTO_INFO: Record<string, LabelInfo> = {
  ONG_CULTURAL:      { label: "ONG Cultural",                        className: "bg-pink-100 text-pink-800 border-pink-300" },
  ENTIDADE_URB_AMB:  { label: "Entidade Urbana / Ambiental",         className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
};

export const TIPO_CANDIDATO_INFO: Record<string, LabelInfo> = {
  INDIVIDUAL: { label: "Individual",  className: "bg-blue-100 text-blue-800 border-blue-300" },
  TITULAR:    { label: "Titular",     className: "bg-green-100 text-green-800 border-green-300" },
  SUPLENTE:   { label: "Suplente",    className: "bg-slate-100 text-slate-800 border-slate-300" },
};

export const TIPO_CADASTRO_INFO: Record<string, LabelInfo> = {
  CANDIDATO: { label: "Candidato",  className: "bg-purple-100 text-purple-800 border-purple-300" },
  ELEITOR:   { label: "Eleitor",    className: "bg-teal-100 text-teal-800 border-teal-300" },
};

export const PERMISSAO_INFO: Record<string, LabelInfo> = {
  DEV: { label: "Desenvolvedor",  className: "bg-rose-100 text-rose-800 border-rose-300" },
  ADM: { label: "Administrador",  className: "bg-orange-100 text-orange-800 border-orange-300" },
  USR: { label: "Usuário",        className: "bg-slate-100 text-slate-800 border-slate-300" },
};

export function getInfo(map: Record<string, LabelInfo>, key: string): LabelInfo {
  return map[key] ?? { label: key, className: "bg-gray-100 text-gray-700 border-gray-300" };
}
