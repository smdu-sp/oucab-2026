"use client";

import { useFormContext } from "react-hook-form";
import { Home, Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";

type TipoInscricao = "MORADOR" | "TRABALHADOR" | "REP_MOVIMENTOS_MORADIA";

const opcoes: {
  valor: TipoInscricao;
  label: string;
  descricao: string;
  icone: React.ElementType;
  cor: "blue" | "green" | "orange";
}[] = [
  {
    valor: "MORADOR",
    label: "Morador(a) da Região",
    descricao: "Moro na região do perímetro de adesão da OUCAB.",
    icone: Home,
    cor: "blue",
  },
  {
    valor: "TRABALHADOR",
    label: "Trabalhador(a) na Região",
    descricao: "Trabalho na região do perímetro de adesão da OUCAB.",
    icone: Building2,
    cor: "green",
  },
  {
    valor: "REP_MOVIMENTOS_MORADIA",
    label: "Representante de Movimentos de Moradia",
    descricao: "Represento um movimento de moradia com atuação na região do perímetro de adesão da OUCAB.",
    icone: Users,
    cor: "orange",
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
};

export default function EtapaTipoInscricao() {
  const { setValue, watch, formState: { errors } } = useFormContext<FormularioInscricaoData>();
  const tipoInscricao = watch("tipoInscricao");
  const tipoCadastro = watch("tipoCadastro");

  const opcoesFiltradas = opcoes.filter(
    (o) => o.valor !== "REP_MOVIMENTOS_MORADIA" || tipoCadastro === "CANDIDATO"
  );

  const handleTipoChange = (valor: TipoInscricao) => {
    setValue("tipoInscricao", valor, { shouldValidate: true });
    if (valor !== "TRABALHADOR") setValue("votante.empresa", "");
    // Limpar área do perímetro ao trocar tipo, pois a restrição pode mudar
    setValue("endereco.areaPerimetro", null);
  };

  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 gap-4 ${opcoesFiltradas.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {opcoesFiltradas.map(({ valor, label, descricao, icone: Icone, cor }) => {
          const selecionado = tipoInscricao === valor;
          const c = cores[cor];

          return (
            <button
              key={valor}
              type="button"
              onClick={() => handleTipoChange(valor)}
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

      {errors.tipoInscricao && (
        <p className="text-center text-sm text-destructive">
          {errors.tipoInscricao.message}
        </p>
      )}

      <div className="rounded-lg bg-muted/50 p-4">
        <h4 className="mb-2 font-medium">Informações importantes:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• <strong>Moradores:</strong> Devem comprovar residência no perímetro de adesão</li>
          <li>• <strong>Trabalhadores:</strong> Devem comprovar vínculo empregatício na região</li>
          <li>• <strong>Representantes de movimentos de moradia:</strong> O endereço deve estar obrigatoriamente no perímetro de adesão</li>
          <li>• A documentação necessária varia conforme o tipo selecionado</li>
        </ul>
      </div>
    </div>
  );
}
