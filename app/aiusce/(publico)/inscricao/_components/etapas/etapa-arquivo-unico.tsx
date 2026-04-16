"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle } from "lucide-react";
import DragDropInput from "@/components/drag-drop-input";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

const MAX_SIZE = 250 * 1024 * 1024; // 250 MB

interface EtapaArquivoUnicoProps {
  fieldPath: keyof FormularioAiusceData;
  titulo: string;
  descricao: string;
  instrucoes?: string[];
  obrigatorio?: boolean;
}

export default function EtapaArquivoUnico({
  fieldPath,
  titulo,
  descricao,
  instrucoes,
  obrigatorio = true,
}: EtapaArquivoUnicoProps) {
  const { control, watch } = useFormContext<FormularioAiusceData>();
  const currentFile = watch(fieldPath) as File | null | undefined;

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>{titulo}</strong>
          {descricao && <p className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: descricao }} />}
          {instrucoes && instrucoes.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {instrucoes.map((inst, i) => (
                <li key={i}>• {inst}</li>
              ))}
            </ul>
          )}
        </AlertDescription>
      </Alert>

      {!obrigatorio && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Este documento é <strong>opcional</strong>. Você pode pular esta etapa se não possuir o documento.
          </AlertDescription>
        </Alert>
      )}

      <Controller
        name={fieldPath}
        control={control}
        render={({ field, fieldState }) => (
          <DragDropInput
            onChange={(files) => field.onChange(files[0] ?? null)}
            value={field.value ? [field.value as File] : []}
            multiple={false}
            maxFiles={1}
            maxSize={MAX_SIZE}
            accept="image/*,.pdf"
            buttonText="Selecionar arquivo"
            dropzoneText="Arraste e solte o arquivo aqui"
            helperText="Formatos aceitos: JPG, PNG, PDF — máximo 250 MB"
            error={fieldState.error?.message}
          />
        )}
      />

      {currentFile && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>Arquivo selecionado: {(currentFile as File).name}</span>
        </div>
      )}
    </div>
  );
}

// Factory para criar componentes de etapa de documento com configuração fixa
export function criarEtapaDocumento(
  fieldPath: keyof FormularioAiusceData,
  titulo: string,
  descricao: string,
  instrucoes: string[] = [],
  obrigatorio = true,
): React.ComponentType {
  function EtapaDoc() {
    return (
      <EtapaArquivoUnico
        fieldPath={fieldPath}
        titulo={titulo}
        descricao={descricao}
        instrucoes={instrucoes}
        obrigatorio={obrigatorio}
      />
    );
  }
  EtapaDoc.displayName = `EtapaDoc_${String(fieldPath)}`;
  return EtapaDoc;
}
