"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FileDown } from "lucide-react";

export interface GrupoExportacao {
  id: string;
  label: string;
  descricao?: string;
}

interface Props {
  url: string;
  grupos: GrupoExportacao[];
  filtros?: Record<string, string | undefined>;
  label?: string;
}

export default function DialogExportar({ url, grupos, filtros, label = "Exportar XLSX" }: Props) {
  const [open, setOpen] = useState(false);
  const [selecionados, setSelecionados] = useState<Set<string>>(
    new Set(grupos.map((g) => g.id)),
  );

  function toggle(id: string) {
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirmar() {
    if (selecionados.size === 0) return;
    const params = new URLSearchParams();
    params.set("grupos", Array.from(selecionados).join(","));
    if (filtros) {
      for (const [key, value] of Object.entries(filtros)) {
        if (value && value !== "all") params.set(key, value);
      }
    }
    window.location.href = `${url}?${params.toString()}`;
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="gap-2">
          <FileDown className="size-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar dados para exportar</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {grupos.map((grupo) => (
            <div key={grupo.id} className="flex items-start gap-3">
              <Checkbox
                id={`grupo-${grupo.id}`}
                checked={selecionados.has(grupo.id)}
                onCheckedChange={() => toggle(grupo.id)}
              />
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={`grupo-${grupo.id}`} className="cursor-pointer font-medium">
                  {grupo.label}
                </Label>
                {grupo.descricao && (
                  <p className="text-xs text-muted-foreground">{grupo.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar} disabled={selecionados.size === 0}>
            Confirmar exportação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
