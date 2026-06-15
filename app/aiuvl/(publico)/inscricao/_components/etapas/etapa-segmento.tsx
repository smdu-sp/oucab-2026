"use client";

import { useFormContext } from "react-hook-form";
import { Heart, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiuvlData } from "@/lib/schemas/formulario-aiuvl";

type SegmentoAiuvl = "ONG" | "ASSOCIACAO_BAIRRO" | "ENTIDADE_ACADEMICA" | "REP_EMPRESARIAL";

const opcoes: { valor: SegmentoAiuvl; label: string; descricao: string; icone: React.ElementType }[] = [
  {
    valor: "ONG",
    label: "Organização Não Governamental",
    descricao: "Organização não governamental com atuação na região do Projeto de Intervenção Urbana Vila Leopoldina-Villa Lobos (PIU-VL)",
    icone: Heart,
  },
  {
    valor: "ASSOCIACAO_BAIRRO",
    label: "Associação de Bairro",
    descricao: "Associação de bairro com atuação na região do Projeto de Intervenção Urbana Vila Leopoldina-Villa Lobos (PIU-VL)",
    icone: MapPin,
  },
  {
    valor: "ENTIDADE_ACADEMICA",
    label: "Entidade Acadêmica / Pesquisa",
    descricao: "Entidades acadêmicas ou de pesquisa com atuação em questões urbanas e ambientais com atuação na região do Projeto de Intervenção Urbana Vila Leopoldina-Villa Lobos (PIU-VL)",
    icone: GraduationCap,
  },
  {
    valor: "REP_EMPRESARIAL",
    label: "Setor Empresarial",
    descricao: "Entidade representante do setor empresarial, que representa empresas que produzem bens ou prestam serviços relacionados ao desenvolvimento urbano, nas áreas de habitação, produção imobiliária, saneamento, mobilidade, meio ambiente e/ou planejamento urbano e obras públicas, com atuação na região do Projeto de Intervenção Urbana Vila Leopoldina-Villa Lobos (PIU-VL)",
    icone: Briefcase,
  },
];

function EtapaSegmentoAiuvlBase({ opcoesCandidato }: { opcoesCandidato: typeof opcoes }) {
  const { setValue, watch, formState: { errors } } = useFormContext<FormularioAiuvlData>();

  const tipoInscricao = watch("tipoInscricao");
  const isCandidata = tipoInscricao === "CANDIDATO";
  const fieldPath = isCandidata ? "entidadeCandidata.segmento" : "entidadeEleitora.segmento";
  const segmento = watch(fieldPath as any) as SegmentoAiuvl | undefined;

  // Eleitores sempre veem todos os segmentos; candidatos usam a lista permitida na rodada atual
  const opcoesVisiveis = isCandidata ? opcoesCandidato : opcoes;

  const erroCandidata = errors.entidadeCandidata?.segmento;
  const erroEleitora  = errors.entidadeEleitora?.segmento;
  const erro = isCandidata ? erroCandidata : erroEleitora;

  const selecionar = (valor: SegmentoAiuvl) => {
    setValue(fieldPath as any, valor, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opcoesVisiveis.map(({ valor, label, descricao, icone: Icone }) => {
          const selecionado = segmento === valor;
          return (
            <button
              key={valor}
              type="button"
              onClick={() => selecionar(valor)}
              className={cn(
                "w-full rounded-xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md",
                selecionado ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950" : "border-border hover:border-emerald-300"
              )}
            >
              <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-full", selecionado ? "bg-emerald-100 dark:bg-emerald-900" : "bg-muted")}>
                <Icone className={cn("h-5 w-5", selecionado ? "text-emerald-600" : "text-muted-foreground")} />
              </div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{descricao}</p>
            </button>
          );
        })}
      </div>

      {erro && <p className="text-center text-sm text-destructive">{erro.message}</p>}

      <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        A entidade deve comprovar atuação no segmento escolhido por pelo menos <strong>2 anos</strong>, contados retroativamente à data de publicação do edital.
      </div>
    </div>
  );
}

export function criarEtapaSegmento(segmentosHabilitados: string[]) {
  const opcoesFiltradas = opcoes.filter((o) => segmentosHabilitados.includes(o.valor));
  return function EtapaSegmentoFiltrado() {
    return <EtapaSegmentoAiuvlBase opcoesCandidato={opcoesFiltradas} />;
  };
}

export default function EtapaSegmentoAiuvl() {
  return <EtapaSegmentoAiuvlBase opcoesCandidato={opcoes} />;
}
