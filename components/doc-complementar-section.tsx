"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Trash2, FileIcon, AlertTriangle, Clock, Eye, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { BASE_PATH } from "@/lib/config";
import DragDropInput from "@/components/drag-drop-input";

interface ArquivoInfo {
  id: string;
  nome: string;
  tamanho: number;
  criadoEm: string;
}

interface ApiResponse {
  status: string;
  periodoAberto: boolean;
  arquivos: ArquivoInfo[];
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const MAX_ARQUIVO = 50 * 1024 * 1024;
const MAX_TOTAL   = 200 * 1024 * 1024;

interface Props {
  apiBase: string;
  linkOrientacao?: string;
}

export default function DocComplementarSection({ apiBase, linkOrientacao }: Props) {
  const [dados, setDados] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [novosArquivos, setNovosArquivos] = useState<File[]>([]);

  async function carregar() {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}${apiBase}`);
      if (!res.ok) return;
      setDados(await res.json());
    } catch {
      toast.error("Erro ao carregar documentos complementares.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!dados || dados.status !== "AGUARDANDO_DOCUMENTACAO") return null;

  const totalExistente = dados.arquivos.reduce((s, a) => s + a.tamanho, 0);
  const totalNovos = novosArquivos.reduce((s, f) => s + f.size, 0);
  const totalGeral = totalExistente + totalNovos;
  const espacoDisponivel = MAX_TOTAL - totalGeral;

  function handleDragDrop(files: File[]) {
    if (!files.length) {
      setNovosArquivos([]);
      return;
    }
    const erros: string[] = [];
    const validos = files.filter((f) => {
      if (f.size > MAX_ARQUIVO) {
        erros.push(`"${f.name}" excede 50 MB`);
        return false;
      }
      if (!f.type.startsWith("image/") && f.type !== "application/pdf") {
        erros.push(`"${f.name}" não é imagem ou PDF`);
        return false;
      }
      return true;
    });
    if (erros.length) toast.error(erros.join("; "));
    const novoTotal = totalExistente + validos.reduce((s, f) => s + f.size, 0);
    if (novoTotal > MAX_TOTAL) {
      toast.error("O total de arquivos ultrapassaria 200 MB.");
      return;
    }
    setNovosArquivos(validos);
  }

  async function enviar() {
    if (novosArquivos.length === 0) return;
    setIsUploading(true);
    try {
      const fd = new FormData();
      novosArquivos.forEach((f) => fd.append("arquivos", f));
      const res = await fetch(`${BASE_PATH}${apiBase}`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao enviar");
      setDados((prev) => prev ? { ...prev, arquivos: [...prev.arquivos, ...data.criados] } : prev);
      setNovosArquivos([]);
      toast.success("Documentos enviados com sucesso!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar arquivos.");
    } finally {
      setIsUploading(false);
    }
  }

  async function excluir(arquivoId: string) {
    setDeletingId(arquivoId);
    try {
      const res = await fetch(`${BASE_PATH}${apiBase}/${arquivoId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao excluir");
      setDados((prev) => prev ? { ...prev, arquivos: prev.arquivos.filter((a) => a.id !== arquivoId) } : prev);
      toast.success("Arquivo excluído.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir arquivo.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card className="border-amber-300 bg-amber-50/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-amber-800">
          <Clock className="w-4 h-4" />
          Documentação Complementar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dados.periodoAberto ? (
          <Alert className="border-amber-400 bg-amber-50">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <AlertDescription className="text-amber-800 space-y-1">
              <p>
                Sua inscrição está <strong>aguardando documentação complementar</strong>. Envie os arquivos solicitados dentro do prazo.
              </p>
              <p className="text-xs">Limite: 50 MB por arquivo · 200 MB no total · PDF ou imagem (JPG, PNG etc.)</p>
              {linkOrientacao && (
                <a
                  href={linkOrientacao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-700 underline underline-offset-2 font-medium text-xs mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Ver quais documentos são necessários
                </a>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <Eye className="w-4 h-4" />
            <AlertDescription>
              O prazo para envio de documentação complementar encerrou. Abaixo estão os arquivos que foram enviados.
            </AlertDescription>
          </Alert>
        )}

        {/* Arquivos já enviados */}
        {dados.arquivos.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Arquivos enviados ({dados.arquivos.length}) — {formatBytes(totalExistente)} utilizados
            </p>
            {dados.arquivos.map((arq) => (
              <div key={arq.id} className="flex items-center gap-2 bg-white border rounded p-2 text-sm">
                <FileIcon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{arq.nome}</span>
                <span className="flex-shrink-0 text-muted-foreground">{formatBytes(arq.tamanho)}</span>
                {dados.periodoAberto && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    disabled={deletingId === arq.id}
                    onClick={() => excluir(arq.id)}>
                    {deletingId === arq.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload drag-and-drop — só durante o período */}
        {dados.periodoAberto && (
          <div className="space-y-3">
            <DragDropInput
              multiple
              maxFiles={50}
              maxSize={espacoDisponivel > 0 ? espacoDisponivel : 1}
              accept="image/*,.pdf"
              buttonText="Selecionar arquivos"
              dropzoneText="Arraste e solte os arquivos aqui"
              helperText={`PDF ou imagem · máx. 50 MB por arquivo · espaço disponível: ${formatBytes(Math.max(0, espacoDisponivel))}`}
              disabled={espacoDisponivel <= 0}
              onChange={handleDragDrop}
              value={novosArquivos}
            />

            {novosArquivos.length > 0 && (
              <Button
                className="w-full"
                disabled={isUploading}
                onClick={enviar}>
                {isUploading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enviando...</>
                ) : (
                  <>Enviar {novosArquivos.length} arquivo{novosArquivos.length !== 1 ? "s" : ""} ({formatBytes(totalNovos)})</>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
