"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { FolderArchive, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  url: string;
  filename?: string;
  variant?: "icon" | "default";
}

export default function BtnDownloadArquivos({ url, filename = "arquivos.zip", variant = "default" }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Erro ao baixar arquivos. Tente novamente.");
        return;
      }
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {
      toast.error("Erro ao baixar arquivos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "icon") {
    return (
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={loading}
        onClick={handleDownload}
        title="Baixar todos os arquivos (ZIP)"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FolderArchive className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <Button type="button" variant="outline" disabled={loading} onClick={handleDownload} className="gap-2">
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <FolderArchive className="size-4" />
      )}
      Baixar arquivos
    </Button>
  );
}
