"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle, Loader2, Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";
import Link from "next/link";

type Prefix = "titular" | "suplente";

function formatarCPF(v: string) {
  const d = v.replace(/[^\d]/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatarTelefone(v: string) {
  const d = v.replace(/[^\d]/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatarData(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(cpf[i]) * (10 - i);
  let r = 11 - (s % 11); if (r >= 10) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(cpf[i]) * (11 - i);
  r = 11 - (s % 11); if (r >= 10) r = 0;
  return r === parseInt(cpf[10]);
}

function CandidatoForm({ prefix }: { prefix: Prefix }) {
  const { register, setValue, watch, setError, clearErrors, formState: { errors } } = useFormContext<FormularioAiusceData>();
  const [validandoCPF, setValidandoCPF] = useState(false);
  const [validandoEmail, setValidandoEmail] = useState(false);
  const [cpfStatus, setCpfStatus] = useState<"ok" | "erro" | null>(null);
  const [emailStatus, setEmailStatus] = useState<"ok" | "erro" | null>(null);

  const e = (errors[prefix] ?? {}) as Record<string, { message?: string }>;
  const onCpfChange = (v: string) => {
    const formatted = formatarCPF(v);
    setValue(`${prefix}.cpf` as any, formatted);
    setCpfStatus(null);
  };

  const validarCPFRemoto = async (v: string) => {
    const cpf = v.replace(/[^\d]/g, "");
    if (cpf.length !== 11) return;
    if (!validarCPF(cpf)) {
      setError(`${prefix}.cpf` as any, { type: "manual", message: "CPF inválido" });
      setCpfStatus("erro");
      return;
    }
    setValidandoCPF(true);
    try {
      const res = await fetch(`/api/aiusce/validacao/cpf/${cpf}`);
      const data = await res.json();
      if (data.disponivel) {
        clearErrors(`${prefix}.cpf` as any);
        setCpfStatus("ok");
      } else {
        setError(`${prefix}.cpf` as any, { type: "manual", message: "Este CPF já está cadastrado" });
        setCpfStatus("erro");
      }
    } catch {
      setCpfStatus(null);
    } finally {
      setValidandoCPF(false);
    }
  };

  const validarEmailRemoto = async (email: string) => {
    if (!email.includes("@")) return;
    setValidandoEmail(true);
    try {
      const res = await fetch(`/api/aiusce/validacao/email/${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.disponivel) {
        clearErrors(`${prefix}.email` as any);
        setEmailStatus("ok");
      } else {
        setError(`${prefix}.email` as any, { type: "manual", message: "Este e-mail já está cadastrado" });
        setEmailStatus("erro");
      }
    } catch {
      setEmailStatus(null);
    } finally {
      setValidandoEmail(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Nome Completo *</Label>
          <Input {...register(`${prefix}.nome` as any)} placeholder="Nome completo" className={cn(e.nome && "border-red-500")} />
          {e.nome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.nome.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Nome Social</Label>
          <Input {...register(`${prefix}.nomeSocial` as any)} placeholder="Nome social (opcional)" />
        </div>
        <div className="space-y-2">
          <Label>CPF *</Label>
          <div className="relative">
            <Input
              {...register(`${prefix}.cpf` as any)}
              onChange={(ev) => onCpfChange(ev.target.value)}
              onBlur={(ev) => validarCPFRemoto(ev.target.value)}
              placeholder="000.000.000-00"
              maxLength={14}
              className={cn(e.cpf && "border-red-500", cpfStatus === "ok" && "border-green-500")}
            />
            {validandoCPF && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>}
            {!validandoCPF && cpfStatus === "ok" && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-500" /></div>}
          </div>
          {e.cpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.cpf.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Data de Nascimento *</Label>
          <Input
            {...register(`${prefix}.dataNascimento` as any)}
            onChange={(ev) => setValue(`${prefix}.dataNascimento` as any, formatarData(ev.target.value))}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(e.dataNascimento && "border-red-500")}
          />
          {e.dataNascimento && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.dataNascimento.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Gênero * <Link href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-56021-de-31-de-marco-de-2015" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Decreto 56.021/2015</Link></Label>
          <Select
            onValueChange={(v) => setValue(`${prefix}.genero` as any, v as "MASCULINO" | "FEMININO")}
            value={watch(`${prefix}.genero` as any)}
          >
            <SelectTrigger className={cn(e.genero && "border-red-500")}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MASCULINO">Masculino</SelectItem>
              <SelectItem value="FEMININO">Feminino</SelectItem>
            </SelectContent>
          </Select>
          {e.genero && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.genero.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>E-mail *</Label>
          <div className="relative">
            <Input
              type="email"
              {...register(`${prefix}.email` as any)}
              onBlur={(ev) => validarEmailRemoto(ev.target.value)}
              placeholder="email@exemplo.com"
              className={cn(e.email && "border-red-500", emailStatus === "ok" && "border-green-500")}
            />
            {validandoEmail && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>}
            {!validandoEmail && emailStatus === "ok" && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-500" /></div>}
          </div>
          {e.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input
            {...register(`${prefix}.telefone` as any)}
            onChange={(ev) => setValue(`${prefix}.telefone` as any, formatarTelefone(ev.target.value))}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
        </div>
        <div className="space-y-2">
          <Label>Título de Eleitor</Label>
          <Input
            {...register(`${prefix}.tituloEleitor` as any)}
            onChange={(ev) => setValue(`${prefix}.tituloEleitor` as any, ev.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="000000000000"
            maxLength={12}
          />
        </div>
        <div className="space-y-2">
          <Label>Domicílio Eleitoral</Label>
          <Input {...register(`${prefix}.domicilioEleitoral` as any)} placeholder="Município/UF" />
        </div>
      </div>

    </div>
  );
}

export function EtapaDadosTitular() {
  return (
    <div className="space-y-5">
      <Alert>
        <Trophy className="h-4 w-4" />
        <AlertDescription>
          Informe os dados do <strong>candidato titular</strong> — representante principal da entidade.
        </AlertDescription>
      </Alert>
      <CandidatoForm prefix="titular" />
    </div>
  );
}

export function EtapaDadosSuplente() {
  return (
    <div className="space-y-5">
      <Alert>
        <Award className="h-4 w-4" />
        <AlertDescription>
          Informe os dados do <strong>candidato suplente</strong> — substituto em caso de impedimento do titular.
        </AlertDescription>
      </Alert>
      <CandidatoForm prefix="suplente" />
    </div>
  );
}
