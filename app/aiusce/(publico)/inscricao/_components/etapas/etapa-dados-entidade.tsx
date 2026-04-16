"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

function formatarCNPJ(v: string): string {
  const d = v.replace(/[^\d]/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function formatarCPF(v: string): string {
  const d = v.replace(/[^\d]/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatarTelefone(v: string): string {
  const d = v.replace(/[^\d]/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatarData(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

// ---------------------------------------------------------------------------
// Entidade Candidata
// ---------------------------------------------------------------------------

export function EtapaDadosEntidadeCandidata() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormularioAiusceData>();
  const e = (errors.entidadeCandidata ?? {}) as Record<string, { message?: string }>;
  const formaChapa = watch("entidadeCandidata.formaChapa") ?? false;

  return (
    <div className="space-y-5">
      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          Informe os dados da entidade candidato. Nas próximas etapas você indicará os representantes titular e suplente.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Razão Social *</Label>
          <Input {...register("entidadeCandidata.razaoSocial")} placeholder="Nome completo da entidade" className={cn(e.razaoSocial && "border-red-500")} />
          {e.razaoSocial && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.razaoSocial.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CNPJ *</Label>
          <Input
            {...register("entidadeCandidata.cnpj")}
            onChange={(e) => setValue("entidadeCandidata.cnpj", formatarCNPJ(e.target.value))}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className={cn(errors.entidadeCandidata?.cnpj && "border-red-500")}
          />
          {errors.entidadeCandidata?.cnpj && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeCandidata.cnpj.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Data de Abertura/Fundação *</Label>
          <Input
            {...register("entidadeCandidata.dataAbertura")}
            onChange={(ev) => setValue("entidadeCandidata.dataAbertura", formatarData(ev.target.value))}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(errors.entidadeCandidata?.dataAbertura && "border-red-500")}
          />
          {errors.entidadeCandidata?.dataAbertura && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeCandidata.dataAbertura.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Telefone da Entidade</Label>
          <Input
            {...register("entidadeCandidata.telefone")}
            onChange={(ev) => setValue("entidadeCandidata.telefone", formatarTelefone(ev.target.value))}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={cn(errors.entidadeCandidata?.telefone && "border-red-500")}
          />
          {errors.entidadeCandidata?.telefone && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeCandidata.telefone.message}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>E-mail da Entidade *</Label>
          <Input type="email" {...register("entidadeCandidata.emailEntidade")} placeholder="email@entidade.org.br" className={cn(errors.entidadeCandidata?.emailEntidade && "border-red-500")} />
          {errors.entidadeCandidata?.emailEntidade && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeCandidata.emailEntidade.message}</p>}
          <p className="text-xs text-muted-foreground">As credenciais de acesso ao portal serão enviadas para este e-mail.</p>
        </div>

        <div className="space-y-2">
          <Label>Nome do Representante Legal *</Label>
          <Input {...register("entidadeCandidata.repNome")} placeholder="Nome completo" className={cn(e.repNome && "border-red-500")} />
          {e.repNome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repNome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CPF do Representante Legal *</Label>
          <Input
            {...register("entidadeCandidata.repCpf")}
            onChange={(ev) => setValue("entidadeCandidata.repCpf", formatarCPF(ev.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            className={cn(e.repCpf && "border-red-500")}
          />
          {e.repCpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repCpf.message}</p>}
        </div>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Checkbox
            id="formaChapa"
            checked={formaChapa}
            onCheckedChange={(v) => setValue("entidadeCandidata.formaChapa", !!v)}
          />
          <Label htmlFor="formaChapa" className="cursor-pointer font-medium">
            A entidade forma chapa com outra organização?
          </Label>
        </div>

        {formaChapa && (
          <div className="space-y-2 ml-7">
            <Label>CNPJ da entidade parceira na chapa *</Label>
            <Input
              {...register("entidadeCandidata.cnpjChapa")}
              onChange={(ev) => setValue("entidadeCandidata.cnpjChapa", formatarCNPJ(ev.target.value))}
              placeholder="00.000.000/0000-00"
              maxLength={18}
            />
            <p className="text-xs text-muted-foreground">
              Informe o CNPJ da entidade parceira. Ambas as organizações devem se inscrever separadamente indicando o CNPJ da outra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Entidade Eleitora
// ---------------------------------------------------------------------------

export function EtapaDadosEntidadeEleitora() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormularioAiusceData>();
  const e = (errors.entidadeEleitora ?? {}) as Record<string, { message?: string }>;

  return (
    <div className="space-y-5">
      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          Informe os dados da entidade eleitor e do seu representante legal.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Razão Social *</Label>
          <Input {...register("entidadeEleitora.razaoSocial")} placeholder="Nome completo da entidade" className={cn(e.razaoSocial && "border-red-500")} />
          {e.razaoSocial && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.razaoSocial.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CNPJ *</Label>
          <Input
            {...register("entidadeEleitora.cnpj")}
            onChange={(ev) => setValue("entidadeEleitora.cnpj", formatarCNPJ(ev.target.value))}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className={cn(errors.entidadeEleitora?.cnpj && "border-red-500")}
          />
          {errors.entidadeEleitora?.cnpj && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeEleitora.cnpj.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Data de Abertura/Fundação *</Label>
          <Input
            {...register("entidadeEleitora.dataAbertura")}
            onChange={(ev) => setValue("entidadeEleitora.dataAbertura", formatarData(ev.target.value))}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(errors.entidadeEleitora?.dataAbertura && "border-red-500")}
          />
          {errors.entidadeEleitora?.dataAbertura && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeEleitora.dataAbertura.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Telefone da Entidade</Label>
          <Input
            {...register("entidadeEleitora.telefone")}
            onChange={(ev) => setValue("entidadeEleitora.telefone", formatarTelefone(ev.target.value))}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={cn(errors.entidadeEleitora?.telefone && "border-red-500")}
          />
          {errors.entidadeEleitora?.telefone && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeEleitora.telefone.message}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>E-mail da Entidade *</Label>
          <Input type="email" {...register("entidadeEleitora.emailEntidade")} placeholder="email@entidade.org.br" className={cn(errors.entidadeEleitora?.emailEntidade && "border-red-500")} />
          {errors.entidadeEleitora?.emailEntidade && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.entidadeEleitora.emailEntidade.message}</p>}
          <p className="text-xs text-muted-foreground">As credenciais de acesso ao portal serão enviadas para este e-mail.</p>
        </div>

        <div className="space-y-2">
          <Label>Nome do Representante Legal *</Label>
          <Input {...register("entidadeEleitora.repNome")} placeholder="Nome completo" className={cn(e.repNome && "border-red-500")} />
          {e.repNome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repNome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CPF do Representante Legal *</Label>
          <Input
            {...register("entidadeEleitora.repCpf")}
            onChange={(ev) => setValue("entidadeEleitora.repCpf", formatarCPF(ev.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            className={cn(e.repCpf && "border-red-500")}
          />
          {e.repCpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repCpf.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Título de Eleitor do Representante</Label>
          <Input
            {...register("entidadeEleitora.repTituloEleitor")}
            onChange={(ev) => setValue("entidadeEleitora.repTituloEleitor", ev.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="000000000000"
            maxLength={12}
          />
        </div>

        <div className="space-y-2">
          <Label>Domicílio Eleitoral do Representante</Label>
          <Input {...register("entidadeEleitora.repDomicilio")} placeholder="Município/UF" />
        </div>
      </div>
    </div>
  );
}
