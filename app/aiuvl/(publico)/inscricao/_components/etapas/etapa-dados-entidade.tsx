"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Building2, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { FormularioAiuvlData } from "@/lib/schemas/formulario-aiuvl";

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

type Prefix = "entidadeCandidata" | "entidadeEleitora";

function EntidadeForm({ prefix }: { prefix: Prefix }) {
  const { register, setValue, watch, setError, clearErrors, formState: { errors } } = useFormContext<FormularioAiuvlData>();
  const [validandoCnpj, setValidandoCnpj] = useState(false);
  const [cnpjStatus, setCnpjStatus] = useState<"ok" | "erro" | null>(null);

  const e = (errors[prefix] ?? {}) as Record<string, { message?: string }>;
  const emailAtual = watch(`${prefix}.emailEntidade` as any) as string | undefined;
  const confirmEmail = watch(`${prefix}.confirmEmailEntidade` as any) as string | undefined;
  const emailsMismatch = emailAtual && confirmEmail && emailAtual !== confirmEmail;

  useEffect(() => {
    if (confirmEmail && emailAtual && emailAtual !== confirmEmail) {
      setError(`${prefix}.confirmEmailEntidade` as any, { type: "manual", message: "Os e-mails não coincidem" });
    } else if (confirmEmail) {
      clearErrors(`${prefix}.confirmEmailEntidade` as any);
    }
  }, [emailAtual, confirmEmail, prefix, setError, clearErrors]);

  const validarCnpjRemoto = async (v: string) => {
    const cnpj = v.replace(/[^\d]/g, "");
    if (cnpj.length !== 14) return;
    setValidandoCnpj(true);
    try {
      const res = await fetch(`/api/aiuvl/validacao/cnpj/${cnpj}`);
      const data = await res.json();
      if (data.disponivel) {
        clearErrors(`${prefix}.cnpj` as any);
        setCnpjStatus("ok");
      } else {
        setError(`${prefix}.cnpj` as any, { type: "manual", message: "CNPJ já cadastrado no sistema" });
        setCnpjStatus("erro");
      }
    } catch {
      setCnpjStatus(null);
    } finally {
      setValidandoCnpj(false);
    }
  };

  const isEleitora = prefix === "entidadeEleitora";

  return (
    <div className="space-y-5">
      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          {isEleitora
            ? "Informe os dados da entidade eleitora e do seu representante legal."
            : "Informe os dados da entidade candidata. Nas próximas etapas você indicará os representantes titular e suplente."}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Razão Social *</Label>
          <Input {...register(`${prefix}.razaoSocial` as any)} placeholder="Nome completo da entidade" className={cn(e.razaoSocial && "border-red-500")} />
          {e.razaoSocial && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.razaoSocial.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CNPJ *</Label>
          <div className="relative">
            <Input
              {...register(`${prefix}.cnpj` as any)}
              onChange={(ev) => { setValue(`${prefix}.cnpj` as any, formatarCNPJ(ev.target.value)); setCnpjStatus(null); }}
              onBlur={(ev) => validarCnpjRemoto(ev.target.value)}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className={cn(e.cnpj && "border-red-500", cnpjStatus === "ok" && "border-green-500")}
            />
            {validandoCnpj && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>}
            {!validandoCnpj && cnpjStatus === "ok" && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-500" /></div>}
          </div>
          {e.cnpj && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.cnpj.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Data de Abertura/Fundação *</Label>
          <Input
            {...register(`${prefix}.dataAbertura` as any)}
            onChange={(ev) => setValue(`${prefix}.dataAbertura` as any, formatarData(ev.target.value))}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(e.dataAbertura && "border-red-500")}
          />
          {e.dataAbertura && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.dataAbertura.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Telefone da Entidade</Label>
          <Input
            {...register(`${prefix}.telefone` as any)}
            onChange={(ev) => setValue(`${prefix}.telefone` as any, formatarTelefone(ev.target.value))}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>E-mail da Entidade *</Label>
          <Input
            type="email"
            {...register(`${prefix}.emailEntidade` as any)}
            placeholder="email@entidade.org.br"
            className={cn(e.emailEntidade && "border-red-500")}
          />
          {e.emailEntidade && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.emailEntidade.message}</p>}
          <p className="text-xs text-muted-foreground">As credenciais de acesso ao portal serão enviadas para este e-mail.</p>
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label>Confirmar E-mail da Entidade *</Label>
          <Input
            type="email"
            {...register(`${prefix}.confirmEmailEntidade` as any)}
            placeholder="Repita o e-mail acima"
            onPaste={(e) => e.preventDefault()}
            className={cn((e.confirmEmailEntidade || emailsMismatch) && "border-red-500")}
          />
          {e.confirmEmailEntidade && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.confirmEmailEntidade.message}</p>}
          <p className="text-xs text-muted-foreground">Digite o e-mail novamente. Não é permitido colar.</p>
        </div>

        <div className="space-y-2">
          <Label>Nome do Representante Legal *</Label>
          <Input {...register(`${prefix}.repNome` as any)} placeholder="Nome completo" className={cn(e.repNome && "border-red-500")} />
          {e.repNome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repNome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>CPF do Representante Legal *</Label>
          <Input
            {...register(`${prefix}.repCpf` as any)}
            onChange={(ev) => setValue(`${prefix}.repCpf` as any, formatarCPF(ev.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            className={cn(e.repCpf && "border-red-500")}
          />
          {e.repCpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.repCpf.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Título de Eleitor do Representante</Label>
          <Input
            {...register(`${prefix}.repTituloEleitor` as any)}
            onChange={(ev) => setValue(`${prefix}.repTituloEleitor` as any, ev.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="000000000000"
            maxLength={12}
          />
        </div>

        <div className="space-y-2">
          <Label>Domicílio Eleitoral do Representante</Label>
          <Input {...register(`${prefix}.repDomicilio` as any)} placeholder="Município/UF" />
        </div>

        {isEleitora && (
          <div className="md:col-span-2 space-y-2">
            <Label>Segmento de Votação *</Label>
            <Select
              onValueChange={(v) => setValue(`${prefix}.segmentoVotacao` as any, v as any, { shouldValidate: true })}
              value={watch(`${prefix}.segmentoVotacao` as any) ?? ""}
            >
              <SelectTrigger className={cn((e as any).segmentoVotacao && "border-red-500")}>
                <SelectValue placeholder="Selecione o segmento em que votará" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONG">Organização Não Governamental</SelectItem>
                <SelectItem value="ASSOCIACAO_BAIRRO">Associação de Bairro</SelectItem>
                <SelectItem value="ENTIDADE_ACADEMICA">Entidade Acadêmica / Pesquisa</SelectItem>
                <SelectItem value="REP_EMPRESARIAL">Setor Empresarial</SelectItem>
              </SelectContent>
            </Select>
            {(e as any).segmentoVotacao && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{(e as any).segmentoVotacao.message}</p>}
            <p className="text-xs text-muted-foreground">Em qual segmento a entidade participará da eleição (pode ser diferente do seu próprio segmento).</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function EtapaDadosEntidadeCandidata() {
  return <EntidadeForm prefix="entidadeCandidata" />;
}

export function EtapaDadosEntidadeEleitora() {
  return <EntidadeForm prefix="entidadeEleitora" />;
}
