"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import DragDropInput from "@/components/drag-drop-input";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";

const MAX_SIZE = 250 * 1024 * 1024; // 250MB

function DocumentosNecessarios({ tipoCadastro, tipoInscricao }: { tipoCadastro: string; tipoInscricao: string }) {
  if (tipoCadastro === "ELEITOR") {
    return (
      <ul className="mt-2 space-y-1 text-sm">
        <li>• Documento oficial com foto</li>
        <li>• CPF (caso não conste no documento de identificação)</li>
        {tipoInscricao === "TRABALHADOR" ? (
          <li>• Comprovante de vínculo empregatício em empresa no perímetro da OUCAB</li>
        ) : (
          <li>• Comprovante de residência no perímetro da OUCAB</li>
        )}
      </ul>
    );
  }

  if (tipoInscricao === "REP_MOVIMENTOS_MORADIA") {
    return (
      <ul className="mt-2 space-y-1 text-sm">
        <strong className="block mb-1">Documentos da entidade (pessoa jurídica):</strong>
        <li>• Requerimento de inscrição assinado pelo representante legal (Anexo II)</li>
        <li>• Declaração de atuação de ao menos 2 anos na região (conforme Anexo II)</li>
        <li>• Estatuto Social registrado, comprovando ao menos 2 anos de existência</li>
        <li>• Ata da última eleição dos representantes legais com mandato em vigor (registrada)</li>
        <li>• Certidão de regularidade do CNPJ (emitida nos últimos 30 dias), com sede em São Paulo/SP</li>
        <strong className="block mt-2 mb-1">Documentos dos candidatos (titular e suplente):</strong>
        <li>• Documento oficial com foto de cada candidato</li>
        <li>• CPF de cada candidato (caso não conste no documento de identificação)</li>
        <li>• Título de Eleitor regular com domicílio eleitoral em São Paulo/SP de cada candidato</li>
        <li>• Comprovante de residência ou trabalho no perímetro (máximo 60 dias de emissão)</li>
        <li>• Foto 3x4 recente de cada candidato</li>
        <li>• Declaração de não exercício de cargo público/mandato eletivo (Anexo IV) de cada candidato</li>
      </ul>
    );
  }

  // CANDIDATO MORADOR ou TRABALHADOR
  return (
    <ul className="mt-2 space-y-1 text-sm">
      <li>• Requerimento de inscrição (Anexo I)</li>
      <li>• Documento oficial com foto</li>
      <li>• CPF (caso não conste no documento de identificação)</li>
      <li>• Título de Eleitor regular com domicílio eleitoral em São Paulo/SP</li>
      {tipoInscricao === "TRABALHADOR" ? (
        <li>• Comprovante de vínculo empregatício em empresa no perímetro da OUCAB (máximo 60 dias de emissão)</li>
      ) : (
        <li>• Comprovante de residência no perímetro da OUCAB (máximo 60 dias de emissão)</li>
      )}
      <li>• <strong>Foto 3x4 recente</strong> (para identificação na urna)</li>
      <li>• Declaração de não exercício de cargo público/mandato eletivo (Anexo IV)</li>
    </ul>
  );
}

export default function EtapaArquivo() {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext<FormularioInscricaoData>();

  const tipoCadastro = watch("tipoCadastro");
  const tipoInscricao = watch("tipoInscricao");

  const [arquivosInfo, setArquivosInfo] = useState<Array<{
    nome: string;
    tamanho: string;
    tipo: string;
  }>>([]);

  const arquivosValue = watch("arquivos.arquivos");

  const formatarTamanho = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  useEffect(() => {
    if (arquivosValue && Array.isArray(arquivosValue) && arquivosValue.length > 0) {
      const infos = arquivosValue.map(arquivo => ({
        nome: arquivo.name,
        tamanho: formatarTamanho(arquivo.size),
        tipo: arquivo.type || "Arquivo"
      }));
      setArquivosInfo(infos);
    } else {
      setArquivosInfo([]);
    }
  }, [arquivosValue, formatarTamanho]);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setArquivosInfo(files.map(arquivo => ({
        nome: arquivo.name,
        tamanho: formatarTamanho(arquivo.size),
        tipo: arquivo.type || "Arquivo"
      })));
    } else {
      setArquivosInfo([]);
    }
  };

  const tipoLabel = tipoInscricao === "TRABALHADOR"
    ? "Trabalhador(a)"
    : tipoInscricao === "REP_MOVIMENTOS_MORADIA"
    ? "Representante de Movimento de Moradia"
    : "Morador(a)";

  return (
    <div className="space-y-6">
      {/* Lista de documentos necessários por tipo */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Documentos necessários — {tipoCadastro === "CANDIDATO" ? "Candidato(a)" : "Eleitor(a)"} / {tipoLabel}:</strong>
          <DocumentosNecessarios tipoCadastro={tipoCadastro} tipoInscricao={tipoInscricao} />
        </AlertDescription>
      </Alert>

      {/* Informações sobre o upload */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Requisitos dos arquivos:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Tipos aceitos: Imagens (JPG, PNG, GIF, WebP), PDF e arquivos ZIP</li>
            <li>• Máximo 10 arquivos</li>
            <li>• Tamanho total: Máximo 250MB</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Campo de upload */}
      <div className="space-y-2">
        <Label htmlFor="arquivos">Arquivos de Documentos *</Label>
        <Controller
          name="arquivos.arquivos"
          control={control}
          render={({ field }) => (
            <DragDropInput
              onChange={(files) => {
                field.onChange(files);
                handleFileChange(files);
              }}
              value={field.value || []}
              multiple={true}
              maxFiles={10}
              maxSize={MAX_SIZE}
              accept="image/*,.pdf,.zip"
              buttonText="Selecionar arquivos"
              dropzoneText="Arraste e solte seus arquivos aqui"
              helperText="Imagens (JPG, PNG, GIF, WebP), PDF e ZIP aceitos. Máximo 10 arquivos e 250MB total"
              error={errors.arquivos?.message}
            />
          )}
        />
      </div>

      {errors.arquivos && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errors.arquivos.message}
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Certifique-se de que todos os documentos estão legíveis e dentro do prazo de validade exigido. Inscrições com documentação incompleta serão indeferidas.
        </AlertDescription>
      </Alert>
    </div>
  );
}
