"use client";

import { useFormContext } from "react-hook-form";
import { Home, Building2, Users, Trophy, Award, Briefcase, Building, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";

type TipoInscricao = "MORADOR" | "TRABALHADOR" | "REP_MORADIA" | "REP_ONGS" | "REP_PROFISSIONAIS" | "REP_EMPRESARIAIS";
type Vaga = "TITULAR" | "SUPLENTE";

const opcoes: {
  valor: TipoInscricao;
  label: string;
  descricao: string;
  icone: React.ElementType;
  cor: "blue" | "green" | "orange" | "purple" | "teal" | "rose";
  soCandidato?: boolean;
}[] = [
  {
    valor: "MORADOR",
    label: "Morador(a) da Região",
    descricao: "Resido no perímetro de adesão ou expandido da OUCAB.",
    icone: Home,
    cor: "blue",
  },
  {
    valor: "TRABALHADOR",
    label: "Trabalhador(a) na Região",
    descricao: "Trabalho no perímetro de adesão ou expandido da OUCAB.",
    icone: Building2,
    cor: "green",
  },
  {
    valor: "REP_MORADIA",
    label: "Representante de Movimentos de Moradia",
    descricao: "Represento um movimento de moradia com atuação na área da OUCAB.",
    icone: Users,
    cor: "orange",
    soCandidato: true,
  },
  {
    valor: "REP_ONGS",
    label: "Representante de Organização Não Governamental",
    descricao: "Represento uma ONG com atuação nas temáticas urbana e ambiental.",
    icone: Briefcase,
    cor: "purple",
    soCandidato: true,
  },
  {
    valor: "REP_PROFISSIONAIS",
    label: "Representante de Entidade Profissional",
    descricao: "Represento uma entidade profissional com atuação na área da OUCAB.",
    icone: Building,
    cor: "teal",
    soCandidato: true,
  },
  {
    valor: "REP_EMPRESARIAIS",
    label: "Representante de Entidade Empresarial",
    descricao: "Represento uma entidade empresarial com atuação na área da OUCAB.",
    icone: Landmark,
    cor: "rose",
    soCandidato: true,
  },
];

const opcoesVaga: {
  valor: Vaga;
  label: string;
  descricao: string;
  icone: React.ElementType;
  cor: "indigo" | "cyan";
}[] = [
  {
    valor: "TITULAR",
    label: "Titular",
    descricao: "Candidatura para a vaga de representante titular.",
    icone: Trophy,
    cor: "indigo",
  },
  {
    valor: "SUPLENTE",
    label: "Suplente",
    descricao: "Candidatura para a vaga de representante suplente.",
    icone: Award,
    cor: "cyan",
  },
];

const cores = {
  blue: {
    card: "border-blue-500 bg-blue-50 dark:bg-blue-950",
    cardIdle: "border-border hover:border-blue-300 dark:hover:border-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    icon: "text-blue-600 dark:text-blue-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  green: {
    card: "border-green-500 bg-green-50 dark:bg-green-950",
    cardIdle: "border-border hover:border-green-300 dark:hover:border-green-700",
    iconBg: "bg-green-100 dark:bg-green-900",
    icon: "text-green-600 dark:text-green-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  orange: {
    card: "border-orange-500 bg-orange-50 dark:bg-orange-950",
    cardIdle: "border-border hover:border-orange-300 dark:hover:border-orange-700",
    iconBg: "bg-orange-100 dark:bg-orange-900",
    icon: "text-orange-600 dark:text-orange-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  purple: {
    card: "border-purple-500 bg-purple-50 dark:bg-purple-950",
    cardIdle: "border-border hover:border-purple-300 dark:hover:border-purple-700",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    icon: "text-purple-600 dark:text-purple-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  teal: {
    card: "border-teal-500 bg-teal-50 dark:bg-teal-950",
    cardIdle: "border-border hover:border-teal-300 dark:hover:border-teal-700",
    iconBg: "bg-teal-100 dark:bg-teal-900",
    icon: "text-teal-600 dark:text-teal-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  rose: {
    card: "border-rose-500 bg-rose-50 dark:bg-rose-950",
    cardIdle: "border-border hover:border-rose-300 dark:hover:border-rose-700",
    iconBg: "bg-rose-100 dark:bg-rose-900",
    icon: "text-rose-600 dark:text-rose-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  indigo: {
    card: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950",
    cardIdle: "border-border hover:border-indigo-300 dark:hover:border-indigo-700",
    iconBg: "bg-indigo-100 dark:bg-indigo-900",
    icon: "text-indigo-600 dark:text-indigo-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  cyan: {
    card: "border-cyan-500 bg-cyan-50 dark:bg-cyan-950",
    cardIdle: "border-border hover:border-cyan-300 dark:hover:border-cyan-700",
    iconBg: "bg-cyan-100 dark:bg-cyan-900",
    icon: "text-cyan-600 dark:text-cyan-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
};

export default function EtapaTipoInscricao() {
  const { setValue, watch, formState: { errors } } = useFormContext<FormularioInscricaoData>();
  const tipoInscricao = watch("tipoInscricao");
  const tipoCadastro = watch("tipoCadastro");

  const isRep = tipoInscricao && ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(tipoInscricao);

  const opcoesFiltradas = opcoes.filter(
    (o) => !o.soCandidato || tipoCadastro === "CANDIDATO"
  );

  const handleTipoChange = (valor: TipoInscricao) => {
    setValue("tipoInscricao", valor, { shouldValidate: true });
    setValue("endereco.areaPerimetro", null);
  };

  const numColunas = opcoesFiltradas.length === 2 ? "md:grid-cols-2" :
    opcoesFiltradas.length === 3 ? "md:grid-cols-3" :
    "md:grid-cols-3";

  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 gap-4 ${numColunas}`}>
        {opcoesFiltradas.map(({ valor, label, descricao, icone: Icone, cor }) => {
          const selecionado = tipoInscricao === valor;
          const c = cores[cor];

          return (
            <button
              key={valor}
              type="button"
              onClick={() => handleTipoChange(valor)}
              className={cn(
                "w-full rounded-xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md",
                selecionado ? c.card : c.cardIdle
              )}
            >
              <div className={cn(
                "mb-3 flex h-10 w-10 items-center justify-center rounded-full",
                selecionado ? c.iconBg : c.iconBgIdle
              )}>
                <Icone className={cn("h-5 w-5", selecionado ? c.icon : c.iconIdle)} />
              </div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{descricao}</p>
            </button>
          );
        })}
      </div>

      {errors.tipoInscricao && (
        <p className="text-center text-sm text-destructive">
          {errors.tipoInscricao.message}
        </p>
      )}


      <div className="rounded-lg bg-muted/50 p-4">
        <h4 className="mb-2 font-medium text-sm">Informações importantes:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• <strong>Moradores e Trabalhadores:</strong> Devem comprovar vínculo com o perímetro de adesão ou expandido</li>
          <li>• <strong>Representantes de movimentos de moradia:</strong> A entidade deve atuar na região há ao menos 2 anos</li>
          <li>• <strong>Representantes de ONGs, Entidades Profissionais e Empresariais:</strong> A entidade deve ter sede em São Paulo e ao menos 2 anos de existência</li>
          <li>• A documentação exigida varia conforme o tipo selecionado</li>
        </ul>
      </div>
    </div>
  );
}
