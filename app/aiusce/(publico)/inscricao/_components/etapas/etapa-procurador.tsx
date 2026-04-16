"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

function formatarCPF(v: string) {
  const d = v.replace(/[^\d]/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export default function EtapaProcurador() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormularioAiusceData>();
  const temProcurador = watch("temProcurador") ?? false;
  const ep = (errors.procurador ?? {}) as Record<string, { message?: string }>;

  return (
    <div className="space-y-5">
      <Alert>
        <UserCheck className="h-4 w-4" />
        <AlertDescription>
          A entidade pode indicar um procurador para representá-la no processo eleitoral. O procurador é opcional.
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-3 rounded-lg border p-4">
        <Checkbox
          id="temProcurador"
          checked={temProcurador}
          onCheckedChange={(v) => {
            setValue("temProcurador", !!v);
            if (!v) {
              setValue("procurador", undefined);
            }
          }}
        />
        <Label htmlFor="temProcurador" className="cursor-pointer font-medium">
          A entidade será representada por procurador no processo eleitoral
        </Label>
      </div>

      {temProcurador && (
        <div className="space-y-4 rounded-lg border p-4">
          <h4 className="font-medium">Dados do Procurador</h4>

          <div className="space-y-2">
            <Label>Nome Completo do Procurador *</Label>
            <Input
              {...register("procurador.nome")}
              placeholder="Nome completo"
              className={cn(ep.nome && "border-red-500")}
            />
            {ep.nome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{ep.nome.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>CPF do Procurador *</Label>
            <Input
              {...register("procurador.cpf")}
              onChange={(ev) => setValue("procurador.cpf", formatarCPF(ev.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className={cn(ep.cpf && "border-red-500")}
            />
            {ep.cpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{ep.cpf.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Título de Eleitor do Procurador</Label>
            <Input
              {...register("procurador.tituloEleitor")}
              onChange={(ev) => setValue("procurador.tituloEleitor", ev.target.value.replace(/\D/g, "").slice(0, 12))}
              placeholder="000000000000"
              maxLength={12}
              className={cn(ep.tituloEleitor && "border-red-500")}
            />
            {ep.tituloEleitor && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{ep.tituloEleitor.message}</p>}
          </div>

          <p className="text-xs text-muted-foreground">
            O procurador deverá apresentar procuração — o documento será solicitado na próxima etapa.
          </p>
        </div>
      )}
    </div>
  );
}
