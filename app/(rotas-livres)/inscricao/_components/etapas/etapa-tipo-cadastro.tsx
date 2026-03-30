"use client";

import { useFormContext } from "react-hook-form";
import { UserCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const opcoes = [
  {
    valor: "ELEITOR",
    label: "Eleitor(a)",
    descricao: "Quero participar votando nos representantes da Operação Urbana.",
    icone: UserCheck,
    cor: "blue",
  },
  {
    valor: "CANDIDATO",
    label: "Candidato(a)",
    descricao: "Quero me candidatar a representante da Operação Urbana.",
    icone: Award,
    cor: "purple",
  },
] as const;

const cores = {
  blue: {
    card: "border-blue-500 bg-blue-50 dark:bg-blue-950",
    cardIdle: "border-border hover:border-blue-300 dark:hover:border-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    icon: "text-blue-600 dark:text-blue-400",
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
};

export default function EtapaTipoCadastro() {
  const { setValue, getValues, watch, formState: { errors } } = useFormContext();
  const tipoCadastro = watch("tipoCadastro");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opcoes.map(({ valor, label, descricao, icone: Icone, cor }) => {
          const selecionado = tipoCadastro === valor;
          const c = cores[cor];

          return (
            <button
              key={valor}
              type="button"
              onClick={() => {
                setValue("tipoCadastro", valor, { shouldValidate: true });
                // REP_MOVIMENTOS_MORADIA só é válido para CANDIDATO
                if (valor === "ELEITOR" && getValues("tipoInscricao") === "REP_MOVIMENTOS_MORADIA") {
                  setValue("tipoInscricao", undefined as any);
                }
              }}
              className={cn(
                "w-full rounded-xl border-2 p-6 text-center transition-all duration-200 hover:shadow-md",
                selecionado ? c.card : c.cardIdle
              )}
            >
              <div className={cn(
                "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full",
                selecionado ? c.iconBg : c.iconBgIdle
              )}>
                <Icone className={cn("h-6 w-6", selecionado ? c.icon : c.iconIdle)} />
              </div>
              <p className="text-base font-semibold">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
            </button>
          );
        })}
      </div>

      {(errors as any).tipoCadastro && (
        <p className="text-center text-sm text-destructive">
          {(errors as any).tipoCadastro.message}
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Candidatos receberão as credenciais de acesso por e-mail após o cadastro.
      </p>
    </div>
  );
}
