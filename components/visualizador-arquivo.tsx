"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText } from "lucide-react";

interface Props {
  id: string;
  nome: string;
  tipo: string;
  label: string;
  url: string;
}

export default function VisualizadorArquivo({ nome, tipo, label, url }: Props) {
  const [aberto, setAberto] = useState(false);

  const isImage = tipo.startsWith("image/");
  const isPdf = tipo === "application/pdf";
  const podeVisualizar = isImage || isPdf;

  return (
    <>
      {podeVisualizar ? (
        <button
          onClick={() => setAberto(true)}
          className="text-sm px-3 py-2 rounded border hover:bg-muted transition-colors text-left flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate max-w-[200px]">{label}</span>
        </button>
      ) : (
        <a
          href={url}
          download={nome}
          className="text-sm px-3 py-2 rounded border hover:bg-muted transition-colors text-left flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate max-w-[200px]">{label}</span>
          <Download className="w-3 h-3 shrink-0 ml-auto" />
        </a>
      )}

      {podeVisualizar && (
        <Dialog open={aberto} onOpenChange={setAberto}>
          <DialogContent className="w-[90vw] sm:max-w-none sm:w-[90vw] md:w-[80vw] h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="px-4 py-3 border-b shrink-0">
              <DialogTitle className="text-sm font-medium truncate pr-8">{nome}</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-hidden bg-muted/30">
              {isImage && (
                <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={nome}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              )}
              {isPdf && (
                <iframe
                  src={url}
                  title={nome}
                  className="w-full h-full border-0"
                />
              )}
            </div>

            <div className="px-4 py-2 border-t shrink-0 flex items-center justify-end gap-2">
              <a href={url} download={nome}>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Baixar
                </Button>
              </a>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir em nova aba
                </Button>
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
