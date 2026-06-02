"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, AlertTriangle, CheckCircle, FileIcon } from "lucide-react";
import { toast } from "sonner";
import DragDropInput from "@/components/drag-drop-input";
import { BASE_PATH, prazoCandidatosAiuvlEncerrado, prazoEleitoresAiuvlEncerrado, periodoDocComplementarAbertoAiuvl, DOC_COMPLEMENTAR_FIM_AIUVL } from "@/lib/config";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ArquivoInfo {
  id: string;
  nome: string;
  tamanho: number;
}

interface ApiResponse {
  tipoInscricao: string;
  status: string;
  arquivosAtuais: Record<string, ArquivoInfo>;
}

interface CampoDoc {
  campo: string;
  label: string;
  obrigatorio?: boolean;
}

const CAMPOS_ORG_CAND: CampoDoc[] = [
  { campo: "candEntRequerimento",         label: "Requerimento de Inscrição (Anexo I)" },
  { campo: "candEntDeclaracaoAtuacao",    label: "Declaração de Atuação na Região (Anexo II)" },
  { campo: "candEntEstatuto",             label: "Estatuto Social da Entidade" },
  { campo: "candEntAtaEleicao",           label: "Ata de Eleição da Diretoria" },
  { campo: "candEntCnpj",                 label: "Comprovante de CNPJ" },
  { campo: "candEntDeclaracaoIdoneidade", label: "Declaração de Idoneidade (Anexo V)" },
];

const CAMPOS_REP_CAND: CampoDoc[] = [
  { campo: "repIdentidade",            label: "Documento de Identificação — Representante Legal" },
  { campo: "repCpfDoc",                label: "CPF — Representante Legal", obrigatorio: false },
  { campo: "repTituloEleitor",         label: "Título de Eleitor — Representante Legal", obrigatorio: false },
  { campo: "repComprovanteResidencia", label: "Comprovante de Residência — Representante Legal" },
];

const CAMPOS_TITULAR: CampoDoc[] = [
  { campo: "titularIdentidade",    label: "Documento de Identificação — Titular" },
  { campo: "titularCpfDoc",        label: "CPF — Titular", obrigatorio: false },
  { campo: "titularFoto",          label: "Foto 3×4 — Titular" },
  { campo: "titularTituloEleitor", label: "Título de Eleitor — Titular", obrigatorio: false },
  { campo: "titularResidencia",    label: "Comprovante de Residência — Titular" },
  { campo: "titularDeclaracao",    label: "Declaração do(a) Candidato(a) — Titular (Anexo III)" },
];

const CAMPOS_SUPLENTE: CampoDoc[] = [
  { campo: "suplenteIdentidade",    label: "Documento de Identificação — Suplente" },
  { campo: "suplenteCpfDoc",        label: "CPF — Suplente", obrigatorio: false },
  { campo: "suplenteFoto",          label: "Foto 3×4 — Suplente" },
  { campo: "suplenteTituloEleitor", label: "Título de Eleitor — Suplente", obrigatorio: false },
  { campo: "suplenteResidencia",    label: "Comprovante de Residência — Suplente" },
  { campo: "suplenteDeclaracao",    label: "Declaração do(a) Candidato(a) — Suplente (Anexo III)" },
];

const CAMPOS_ORG_ELEIT: CampoDoc[] = [
  { campo: "eleitEntRequerimento",         label: "Requerimento de Inscrição como Eleitor (Anexo VI)" },
  { campo: "eleitEntDeclaracaoAtuacao",    label: "Declaração de Atuação na Região (Anexo II)" },
  { campo: "eleitEntEstatuto",             label: "Estatuto Social da Entidade" },
  { campo: "eleitEntAtaEleicao",           label: "Ata de Eleição da Diretoria" },
  { campo: "eleitEntCnpj",                 label: "Comprovante de CNPJ" },
  { campo: "eleitEntDeclaracaoIdoneidade", label: "Declaração de Idoneidade (Anexo V)" },
];

const CAMPOS_REP_ELEIT: CampoDoc[] = [
  { campo: "eleitRepIdentidade",    label: "Documento de Identificação — Representante Legal" },
  { campo: "eleitRepCpfDoc",        label: "CPF — Representante Legal", obrigatorio: false },
  { campo: "eleitRepTituloEleitor", label: "Título de Eleitor — Representante Legal", obrigatorio: false },
  { campo: "eleitRepResidencia",    label: "Comprovante de Residência — Representante Legal" },
];

interface GrupoCampos {
  titulo: string;
  campos: CampoDoc[];
}

function getGrupos(tipoInscricao: string): GrupoCampos[] {
  if (tipoInscricao === "CANDIDATO") {
    return [
      { titulo: "Documentos da Entidade",           campos: CAMPOS_ORG_CAND },
      { titulo: "Documentos do Representante Legal", campos: CAMPOS_REP_CAND },
      { titulo: "Documentos do Candidato Titular",  campos: CAMPOS_TITULAR },
      { titulo: "Documentos do Candidato Suplente", campos: CAMPOS_SUPLENTE },
    ];
  }
  if (tipoInscricao === "ELEITOR") {
    return [
      { titulo: "Documentos da Entidade",           campos: CAMPOS_ORG_ELEIT },
      { titulo: "Documentos do Representante Legal", campos: CAMPOS_REP_ELEIT },
    ];
  }
  return [];
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

interface DocFieldProps {
  campo: CampoDoc;
  atual: ArquivoInfo | undefined;
  disabled: boolean;
  onFileChange: (campo: string, file: File | null) => void;
}

function DocField({ campo, atual, disabled, onFileChange }: DocFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{campo.label}</span>
        {campo.obrigatorio === false && (
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">opcional</span>
        )}
      </div>

      {atual && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded p-2">
          <FileIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate flex-1">{atual.nome}</span>
          <span className="flex-shrink-0">{formatBytes(atual.tamanho)}</span>
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
        </div>
      )}

      <DragDropInput
        multiple={false}
        maxFiles={1}
        maxSize={250 * 1024 * 1024}
        accept="image/*,.pdf"
        buttonText="Selecionar arquivo"
        dropzoneText={atual ? "Substituir arquivo" : "Arraste e solte o arquivo aqui"}
        helperText="JPG, PNG ou PDF — máximo 250 MB"
        disabled={disabled}
        onChange={(files) => onFileChange(campo.campo, files[0] ?? null)}
        value={[]}
      />
    </div>
  );
}

export default function MeusArquivosAiuvlPage() {
  const [dados, setDados] = useState<ApiResponse | null>(null);
  const [newFiles, setNewFiles] = useState<Record<string, File>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_PATH}/api/aiuvl/portal/arquivos`)
      .then((r) => r.json())
      .then((data: ApiResponse) => setDados(data))
      .catch(() => toast.error("Erro ao carregar arquivos."))
      .finally(() => setIsLoading(false));
  }, []);

  const prazoEncerrado = dados?.tipoInscricao === "CANDIDATO"
    ? prazoCandidatosAiuvlEncerrado()
    : prazoEleitoresAiuvlEncerrado();
  const deferido = dados?.status === "DEFERIDO";
  const indeferido = dados?.status === "INDEFERIDO";
  const complementarAberto = periodoDocComplementarAbertoAiuvl();
  const podeAtualizar = (!prazoEncerrado && !deferido) || (complementarAberto && indeferido);

  const handleFileChange = (campo: string, file: File | null) => {
    setNewFiles((prev) => {
      const next = { ...prev };
      if (file) next[campo] = file;
      else delete next[campo];
      return next;
    });
  };

  const handleSalvar = async () => {
    const campos = Object.keys(newFiles);
    if (campos.length === 0) {
      toast.error("Selecione pelo menos um arquivo para substituir.");
      return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      for (const campo of campos) {
        formData.append(campo, newFiles[campo]);
      }
      const res = await fetch(`${BASE_PATH}/api/aiuvl/portal/arquivos`, { method: "PUT", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao salvar");

      setDados((prev) =>
        prev ? { ...prev, arquivosAtuais: { ...prev.arquivosAtuais, ...data.atualizados } } : prev,
      );
      setNewFiles({});
      toast.success("Documentos atualizados com sucesso!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar arquivos.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-2xl font-bold">Meus Arquivos</h1>
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>Inscrição não encontrada.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const grupos = getGrupos(dados.tipoInscricao);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Meus Arquivos</h1>
        <p className="text-muted-foreground text-sm">Gerencie os documentos enviados na sua inscrição.</p>
      </div>

      {prazoEncerrado && !complementarAberto && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>O prazo de inscrições encerrou. Não é mais possível atualizar documentos.</AlertDescription>
        </Alert>
      )}

      {prazoEncerrado && complementarAberto && indeferido && (
        <Alert className="border-amber-400 bg-amber-50 dark:bg-amber-950/20">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Sua inscrição está <strong>indeferida</strong>. O período de envio de documentação complementar está aberto até{" "}
            <strong>{format(DOC_COMPLEMENTAR_FIM_AIUVL, "dd/MM/yyyy", { locale: ptBR })}</strong>. Aproveite para substituir os documentos que precisam de correção.
          </AlertDescription>
        </Alert>
      )}

      {prazoEncerrado && complementarAberto && !indeferido && !deferido && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>O prazo de inscrições encerrou. Não é mais possível atualizar documentos.</AlertDescription>
        </Alert>
      )}

      {!prazoEncerrado && deferido && (
        <Alert>
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>Sua inscrição foi deferida. Não é possível alterar os documentos.</AlertDescription>
        </Alert>
      )}

      {grupos.length === 0 && (
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>Tipo de inscrição não reconhecido: {dados.tipoInscricao}</AlertDescription>
        </Alert>
      )}

      {grupos.map((grupo) => (
        <Card key={grupo.titulo}>
          <CardHeader>
            <CardTitle className="text-base">{grupo.titulo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {grupo.campos.map((campo) => (
              <DocField
                key={campo.campo}
                campo={campo}
                atual={dados.arquivosAtuais[campo.campo]}
                disabled={!podeAtualizar}
                onFileChange={handleFileChange}
              />
            ))}
          </CardContent>
        </Card>
      ))}

      {podeAtualizar && grupos.length > 0 && (
        <Button
          onClick={handleSalvar}
          disabled={isSaving || Object.keys(newFiles).length === 0}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {isSaving ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
          ) : (
            <><Upload className="w-4 h-4 mr-2" /> Salvar Documentos ({Object.keys(newFiles).length} selecionado{Object.keys(newFiles).length !== 1 ? "s" : ""})</>
          )}
        </Button>
      )}
    </div>
  );
}
