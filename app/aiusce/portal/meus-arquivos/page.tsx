"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, AlertTriangle, CheckCircle, FileIcon } from "lucide-react";
import { toast } from "sonner";
import DragDropInput from "@/components/drag-drop-input";
import { BASE_PATH } from "@/lib/config";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Definição de campos por tipo de inscrição
// ---------------------------------------------------------------------------

interface CampoDoc {
  campo: string;
  label: string;
  obrigatorio?: boolean;
}

const CAMPOS_INDIVIDUAIS: CampoDoc[] = [
  { campo: "docRequerimento",   label: "Requerimento de Inscrição (Anexo I)" },
  { campo: "docIdentidade",     label: "Documento de Identificação com Foto" },
  { campo: "docCPF",            label: "CPF (opcional)", obrigatorio: false },
  { campo: "docTituloEleitor",  label: "Título de Eleitor" },
  { campo: "docComprovante",    label: "Comprovante de Residência" },
  { campo: "docFoto3x4",        label: "Fotografia 3×4 Recente" },
  { campo: "docDeclaracao",     label: "Declaração de Não Impedimento (Anexo IV)" },
];

const CAMPOS_INDIVIDUAIS_TRABALHO: CampoDoc[] = CAMPOS_INDIVIDUAIS.map((c) =>
  c.campo === "docComprovante"
    ? { ...c, label: "Comprovante de Trabalho" }
    : c,
);

const CAMPOS_ORG: CampoDoc[] = [
  { campo: "orgDocRequerimento",      label: "Requerimento de Inscrição da Entidade (Anexo II)" },
  { campo: "orgDocDeclaracaoAtuacao", label: "Declaração de Atuação na Região (Anexo II)" },
  { campo: "orgDocEstatutoSocial",    label: "Estatuto Social da Entidade" },
  { campo: "orgDocAtaEleicao",        label: "Ata da Última Eleição dos Representantes Legais" },
  { campo: "orgDocCertidaoCNPJ",      label: "Certidão de Regularidade do CNPJ" },
  { campo: "orgDocComprovanteCNPJ",   label: "Comprovante de Inscrição e Situação Cadastral do CNPJ (opcional)", obrigatorio: false },
];

const CAMPOS_TITULAR_MORADIA: CampoDoc[] = [
  { campo: "titularDocRequerimento",  label: "Requerimento — Titular" },
  { campo: "titularDocIdentidade",    label: "Documento de Identificação — Titular" },
  { campo: "titularDocCPF",           label: "CPF — Titular (opcional)", obrigatorio: false },
  { campo: "titularDocTituloEleitor", label: "Título de Eleitor — Titular" },
  { campo: "titularDocComprovante",   label: "Comprovante de Residência/Trabalho — Titular" },
  { campo: "titularDocFoto3x4",       label: "Fotografia 3×4 — Titular" },
  { campo: "titularDocDeclaracao",    label: "Declaração de Não Impedimento — Titular" },
];

const CAMPOS_TITULAR_OUTROS: CampoDoc[] = [
  { campo: "titularDocIdentidade",    label: "Documento de Identificação — Titular" },
  { campo: "titularDocCPF",           label: "CPF — Titular (opcional)", obrigatorio: false },
  { campo: "titularDocTituloEleitor", label: "Título de Eleitor — Titular" },
  { campo: "titularDocFoto3x4",       label: "Fotografia 3×4 — Titular" },
  { campo: "titularDocDeclaracao",    label: "Declaração de Não Impedimento — Titular" },
];

const CAMPOS_SUPLENTE_MORADIA: CampoDoc[] = [
  { campo: "suplenteDocRequerimento",  label: "Requerimento — Suplente" },
  { campo: "suplenteDocIdentidade",    label: "Documento de Identificação — Suplente" },
  { campo: "suplenteDocCPF",           label: "CPF — Suplente (opcional)", obrigatorio: false },
  { campo: "suplenteDocTituloEleitor", label: "Título de Eleitor — Suplente" },
  { campo: "suplenteDocComprovante",   label: "Comprovante de Residência/Trabalho — Suplente" },
  { campo: "suplenteDocFoto3x4",       label: "Fotografia 3×4 — Suplente" },
  { campo: "suplenteDocDeclaracao",    label: "Declaração de Não Impedimento — Suplente" },
];

const CAMPOS_SUPLENTE_OUTROS: CampoDoc[] = [
  { campo: "suplenteDocIdentidade",    label: "Documento de Identificação — Suplente" },
  { campo: "suplenteDocCPF",           label: "CPF — Suplente (opcional)", obrigatorio: false },
  { campo: "suplenteDocTituloEleitor", label: "Título de Eleitor — Suplente" },
  { campo: "suplenteDocFoto3x4",       label: "Fotografia 3×4 — Suplente" },
  { campo: "suplenteDocDeclaracao",    label: "Declaração de Não Impedimento — Suplente" },
];

interface GrupoCampos {
  titulo: string;
  campos: CampoDoc[];
}

function getGrupos(tipoInscricao: string): GrupoCampos[] {
  if (tipoInscricao === "MORADOR") {
    return [{ titulo: "Documentos Pessoais", campos: CAMPOS_INDIVIDUAIS }];
  }
  if (tipoInscricao === "TRABALHADOR") {
    return [{ titulo: "Documentos Pessoais", campos: CAMPOS_INDIVIDUAIS_TRABALHO }];
  }
  if (tipoInscricao === "REP_MORADIA") {
    return [
      { titulo: "Documentos da Entidade", campos: CAMPOS_ORG },
      { titulo: "Documentos do Candidato Titular", campos: CAMPOS_TITULAR_MORADIA },
      { titulo: "Documentos do Candidato Suplente", campos: CAMPOS_SUPLENTE_MORADIA },
    ];
  }
  if (["REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(tipoInscricao)) {
    return [
      { titulo: "Documentos da Entidade", campos: CAMPOS_ORG },
      { titulo: "Documentos do Candidato Titular", campos: CAMPOS_TITULAR_OUTROS },
      { titulo: "Documentos do Candidato Suplente", campos: CAMPOS_SUPLENTE_OUTROS },
    ];
  }
  return [];
}

// ---------------------------------------------------------------------------
// Utilitário
// ---------------------------------------------------------------------------

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// ---------------------------------------------------------------------------
// Componente de um campo de documento
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Página principal
// ---------------------------------------------------------------------------

export default function MeusArquivosPage() {
  const [dados, setDados] = useState<ApiResponse | null>(null);
  const [newFiles, setNewFiles] = useState<Record<string, File>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_PATH}/api/aiusce/portal/arquivos`)
      .then((r) => r.json())
      .then((data: ApiResponse) => setDados(data))
      .catch(() => toast.error("Erro ao carregar arquivos."))
      .finally(() => setIsLoading(false));
  }, []);

  const prazoEncerrado = new Date() > new Date("2026-11-30T23:59:59.999Z");
  const deferido = dados?.status === "DEFERIDO";
  const podeAtualizar = !prazoEncerrado && !deferido;

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
      const res = await fetch(`${BASE_PATH}/api/aiusce/portal/arquivos`, { method: "PUT", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao salvar");

      // Atualiza arquivosAtuais com os novos
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
        <Loader2 className="w-6 h-6 animate-spin text-purple-700" />
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

      {prazoEncerrado && (
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
          className="w-full"
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
