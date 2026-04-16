"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Vote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

const opcoes: {
  valor: "CANDIDATO" | "ELEITOR";
  label: string;
  descricao: string;
  icone: React.ElementType;
  cor: "blue" | "green";
}[] = [
  {
    valor: "CANDIDATO",
    label: "Inscrição como Candidato",
    descricao:
      "A entidade deseja se candidatar para ocupar uma vaga no Conselho Gestor da AIUSCE. Exige indicação de representante titular e suplente.",
    icone: Building2,
    cor: "blue",
  },
  {
    valor: "ELEITOR",
    label: "Inscrição como Eleitor",
    descricao:
      "A entidade deseja apenas se habilitar para votar na eleição do Conselho Gestor da AIUSCE, sem se candidatar a uma vaga.",
    icone: Vote,
    cor: "green",
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
};

export default function EtapaTipoInscricao() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormularioAiusceData>();

  const tipoInscricao = watch("tipoInscricao");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opcoes.map(({ valor, label, descricao, icone: Icone, cor }) => {
          const selecionado = tipoInscricao === valor;
          const c = cores[cor];

          return (
            <button
              key={valor}
              type="button"
              onClick={() => setValue("tipoInscricao", valor, { shouldValidate: true })}
              className={cn(
                "w-full rounded-xl border-2 p-6 text-left transition-all duration-200 hover:shadow-md",
                selecionado ? c.card : c.cardIdle
              )}
            >
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                  selecionado ? c.iconBg : c.iconBgIdle
                )}
              >
                <Icone className={cn("h-6 w-6", selecionado ? c.icon : c.iconIdle)} />
              </div>
              <p className="text-base font-semibold">{label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{descricao}</p>
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
        <h4 className="mb-2 font-medium text-sm">Sobre a inscrição:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Apenas entidades do segmento <strong>ONG Cultural</strong> ou <strong>Entidade profissional, acadêmica ou de pesquisa</strong> podem se inscrever</li>
          <li>• A entidade deve ter sede no Município de São Paulo e pelo menos 2 anos de existência legal</li>
          <li>• Candidatos devem indicar um representante titular e um suplente</li>
          <li>• A inscrição é realizada em nome da entidade (pessoa jurídica)</li>
        </ul>
      </div>
    </div>
  );
}
