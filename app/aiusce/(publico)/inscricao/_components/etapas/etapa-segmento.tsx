"use client";

import { useFormContext } from "react-hook-form";
import { Music, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

type Segmento = "ONG_CULTURAL" | "ENTIDADE_URB_AMB";

const opcoes: {
  valor: Segmento;
  label: string;
  descricao: string;
  icone: React.ElementType;
}[] = [
  {
    valor: "ONG_CULTURAL",
    label: "ONG Cultural",
    descricao:
      "Organização Não Governamental ligada ao setor cultural, com atuação no perímetro da AIU-SCE.",
    icone: Music,
  },
  {
    valor: "ENTIDADE_URB_AMB",
    label: "Entidade profissional, acadêmica ou de pesquisa",
    descricao:
      "Entidade profissional, acadêmica ou de pesquisa ligada a questões urbanas e ambientais, com atuação no perímetro da AIU-SCE.",
    icone: TreePine,
  },
];

export default function EtapaSegmento() {
  const { setValue, watch, formState: { errors } } = useFormContext<FormularioAiusceData>();

  const tipoInscricao = watch("tipoInscricao");
  const isCandidata = tipoInscricao === "CANDIDATO";
  const fieldPath = isCandidata ? "entidadeCandidata.segmento" : "entidadeEleitora.segmento";
  const segmento = watch(fieldPath as any) as Segmento | undefined;

  const erroCandidata = errors.entidadeCandidata?.segmento;
  const erroEleitora  = errors.entidadeEleitora?.segmento;
  const erro = isCandidata ? erroCandidata : erroEleitora;

  const selecionar = (valor: Segmento) => {
    setValue(fieldPath as any, valor, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opcoes.map(({ valor, label, descricao, icone: Icone }) => {
          const selecionado = segmento === valor;
          return (
            <button
              key={valor}
              type="button"
              onClick={() => selecionar(valor)}
              className={cn(
                "w-full rounded-xl border-2 p-6 text-left transition-all duration-200 hover:shadow-md",
                selecionado
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                  selecionado ? "bg-primary/10" : "bg-muted"
                )}
              >
                <Icone
                  className={cn(
                    "h-6 w-6",
                    selecionado ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              <p className="text-base font-semibold">{label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{descricao}</p>
            </button>
          );
        })}
      </div>

      {erro && (
        <p className="text-center text-sm text-destructive">{erro.message}</p>
      )}

      <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        A entidade deve comprovar atuação no segmento escolhido por pelo menos <strong>2 anos</strong>, contados retroativamente à publicação do edital.
      </div>
    </div>
  );
}
