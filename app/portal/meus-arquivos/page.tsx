"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import DragDropInput from "@/components/drag-drop-input";
import { BASE_PATH } from "@/lib/config";

const PRAZO_INSCRICAO = new Date("2026-11-30T23:59:59.999Z");

export default function MeusArquivosPage() {
  const [arquivosAtuais, setArquivosAtuais] = useState<{ id: string; nome: string; tamanho: number }[]>([]);
  const [novosArquivos, setNovosArquivos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusInscricao, setStatusInscricao] = useState<string>("");
  const prazoEncerrado = new Date() > PRAZO_INSCRICAO;

  useEffect(() => {
    fetch(`${BASE_PATH}/api/portal/arquivos`)
      .then((r) => r.json())
      .then((data) => {
        setArquivosAtuais(data.arquivos ?? []);
        setStatusInscricao(data.status ?? "");
      })
      .catch(() => toast.error("Erro ao carregar arquivos."))
      .finally(() => setIsLoading(false));
  }, []);

  const podeAtualizar = !prazoEncerrado && statusInscricao !== "DEFERIDO";

  const handleSalvar = async () => {
    if (novosArquivos.length === 0) {
      toast.error("Selecione pelo menos um arquivo.");
      return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      novosArquivos.forEach((f, i) => formData.append(`arquivos[${i}]`, f));
      const res = await fetch(`${BASE_PATH}/api/portal/arquivos`, { method: "PUT", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao salvar");
      toast.success("Arquivos atualizados com sucesso!");
      setArquivosAtuais(data.arquivos ?? []);
      setNovosArquivos([]);
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

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Meus Arquivos</h1>
        <p className="text-muted-foreground text-sm">Gerencie os documentos enviados na sua inscrição.</p>
      </div>

      {prazoEncerrado && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>O prazo de inscrições encerrou em 30/11/2025. Não é mais possível atualizar documentos.</AlertDescription>
        </Alert>
      )}

      {!prazoEncerrado && statusInscricao === "DEFERIDO" && (
        <Alert>
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>Sua inscrição foi deferida. Não é possível alterar os documentos.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Arquivos Atuais</CardTitle>
          <CardDescription>{arquivosAtuais.length} arquivo(s) enviado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {arquivosAtuais.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>
          ) : (
            <ul className="space-y-2">
              {arquivosAtuais.map((a) => (
                <li key={a.id} className="flex justify-between text-sm border rounded p-2">
                  <span>{a.nome}</span>
                  <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {podeAtualizar && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Substituir Arquivos</CardTitle>
            <CardDescription>
              Os novos arquivos substituirão completamente os anteriores. Máx. 5 arquivos · 30 MB total.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DragDropInput
              value={novosArquivos}
              onChange={setNovosArquivos}
            />
            <Button onClick={handleSalvar} disabled={isSaving || novosArquivos.length === 0} className="w-full">
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
              ) : (
                <><Upload className="w-4 h-4 mr-2" /> Salvar Novos Arquivos</>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
