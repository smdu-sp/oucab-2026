"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Vote } from "lucide-react";
import { cn } from "@/lib/utils";
import { periodoInscricaoCandidatosAiuvlAberto, periodoInscricaoEleitoresAiuvlAberto } from "@/lib/config";
import type { FormularioAiuvlData } from "@/lib/schemas/formulario-aiuvl";

const opcoes: {
  valor: "CANDIDATO" | "ELEITOR";
  label: string;
  descricao: string;
  periodo: string;
  icone: React.ElementType;
  cor: "blue" | "green";
}[] = [
  {
    valor: "CANDIDATO",
    label: "Inscrição como Candidato",
    descricao: "A entidade deseja se candidatar para ocupar uma vaga no Conselho Gestor da AIU-VL. Exige indicação de representante titular e suplente.",
    periodo: "07 de maio a 21 de maio de 2026",
    icone: Building2,
    cor: "blue",
  },
  {
    valor: "ELEITOR",
    label: "Inscrição como Eleitor",
    descricao: "A entidade deseja apenas se habilitar para votar na eleição do Conselho Gestor da AIU-VL, sem se candidatar a uma vaga.",
    periodo: "15 de junho a 24 de junho de 2026",
    icone: Vote,
    cor: "green",
  },
];

const cores = {
  blue: {
    card: "border-blue-500 bg-blue-50 dark:bg-blue-950",
    cardIdle: "border-border hover:border-blue-300",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    icon: "text-blue-600 dark:text-blue-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
  green: {
    card: "border-green-500 bg-green-50 dark:bg-green-950",
    cardIdle: "border-border hover:border-green-300",
    iconBg: "bg-green-100 dark:bg-green-900",
    icon: "text-green-600 dark:text-green-400",
    iconBgIdle: "bg-muted",
    iconIdle: "text-muted-foreground",
  },
};

export default function EtapaTipoInscricaoAiuvl() {
  const { setValue, watch, formState: { errors } } = useFormContext<FormularioAiuvlData>();
  const tipoInscricao = watch("tipoInscricao");

  const candidatosVisivel = periodoInscricaoCandidatosAiuvlAberto();
  const eleitoresVisivel = periodoInscricaoEleitoresAiuvlAberto();
  const opcoesVisiveis = opcoes.filter((o) =>
    o.valor === "CANDIDATO" ? candidatosVisivel : eleitoresVisivel
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opcoesVisiveis.map(({ valor, label, descricao, periodo, icone: Icone, cor }) => {
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
              <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-full", selecionado ? c.iconBg : c.iconBgIdle)}>
                <Icone className={cn("h-6 w-6", selecionado ? c.icon : c.iconIdle)} />
              </div>
              <p className="text-base font-semibold">{label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{descricao}</p>
              <p className="mt-3 text-xs font-medium text-muted-foreground border-t pt-2">{periodo}</p>
            </button>
          );
        })}
      </div>

      {errors.tipoInscricao && (
        <p className="text-center text-sm text-destructive">{errors.tipoInscricao.message}</p>
      )}

      <div className="rounded-lg bg-muted/50 p-4">
        <h4 className="mb-2 font-medium text-sm">Sobre a inscrição:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Podem se inscrever entidades dos segmentos: <strong>ONG, Associação de Bairro, Entidade Acadêmica/Pesquisa e Setor Empresarial</strong></li>
          <li>• A entidade deve comprovar atuação no perímetro ou perímetro expandido da AIU-VL</li>
          <li>• Candidaturas exigem indicação de representante titular e suplente</li>
          <li>• A inscrição é realizada em nome da entidade (pessoa jurídica)</li>
        </ul>
      </div>
    </div>
  );
}
