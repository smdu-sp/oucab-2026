"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle, Users, Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";
import { BASE_PATH } from "@/lib/config";


function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function formatarCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone: string): string {
  telefone = telefone.replace(/[^\d]/g, '');
  if (telefone.length === 0) return '';
  if (telefone.length <= 2) return `(${telefone}`;
  if (telefone.length <= 6) return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  if (telefone.length <= 10) return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
}

type CandidatoPrefix = "titular" | "suplente";

export function CandidatoPFForm({ prefix }: { prefix: CandidatoPrefix }) {
  const { register, setValue, watch, setError, clearErrors, formState: { errors } } = useFormContext<FormularioInscricaoData>();
  const [validandoCPF, setValidandoCPF] = useState(false);
  const [validandoEmail, setValidandoEmail] = useState(false);
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);
  const [emailValido, setEmailValido] = useState<boolean | null>(null);

  const erros = (errors as any)[prefix] || {};

  const validarCPFUnico = async (cpf: string) => {
    if (!cpf || cpf.length < 14) return;
    const cpfLimpo = cpf.replace(/[^\d]/g, '');
    if (!validarCPF(cpfLimpo)) {
      setError(`${prefix}.cpf` as any, { type: "manual", message: "CPF inválido" });
      setCpfValido(false);
      return;
    }
    setValidandoCPF(true);
    try {
      const response = await fetch(`${BASE_PATH}/api/validacao/cpf/${cpfLimpo}`);
      const data = await response.json();
      if (data.disponivel) {
        clearErrors(`${prefix}.cpf` as any);
        setCpfValido(true);
      } else {
        setError(`${prefix}.cpf` as any, { type: "manual", message: "Este CPF já está cadastrado" });
        setCpfValido(false);
      }
    } catch {
      setError(`${prefix}.cpf` as any, { type: "manual", message: "Erro ao validar CPF" });
      setCpfValido(false);
    } finally {
      setValidandoCPF(false);
    }
  };

  const validarEmailUnico = async (email: string) => {
    if (!email || !email.includes("@")) return;
    setValidandoEmail(true);
    try {
      const response = await fetch(`${BASE_PATH}/api/validacao/email/${encodeURIComponent(email)}`);
      const data = await response.json();
      if (!data.disponivel) {
        setError(`${prefix}.email` as any, { type: "manual", message: "Este e-mail já está cadastrado" });
        setEmailValido(false);
      } else {
        clearErrors(`${prefix}.email` as any);
        setEmailValido(true);
      }
    } catch {
      setError(`${prefix}.email` as any, { type: "manual", message: "Erro ao validar e-mail" });
      setEmailValido(false);
    } finally {
      setValidandoEmail(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nome Completo *</Label>
        <Input
          {...register(`${prefix}.nome` as any)}
          placeholder="Nome completo"
          className={cn(erros.nome && "border-red-500")}
        />
        {erros.nome && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.nome.message}</p>}
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
            onChange={(e) => {
              const formatted = formatarCPF(e.target.value);
              setValue(`${prefix}.cpf` as any, formatted);
              setCpfValido(null);
              setTimeout(() => validarCPFUnico(formatted), 500);
            }}
            placeholder="000.000.000-00"
            maxLength={14}
            className={cn(erros.cpf && "border-red-500", cpfValido === true && "border-green-500")}
          />
          {validandoCPF && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>}
          {!validandoCPF && cpfValido === true && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-500" /></div>}
        </div>
        {erros.cpf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.cpf.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Data de Nascimento *</Label>
        <Input
          {...register(`${prefix}.dataNascimento` as any)}
          placeholder="DD/MM/AAAA"
          maxLength={10}
          onChange={(e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5);
            setValue(`${prefix}.dataNascimento` as any, v);
          }}
          className={cn(erros.dataNascimento && "border-red-500")}
        />
        {erros.dataNascimento && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.dataNascimento.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Telefone *</Label>
        <Input
          {...register(`${prefix}.telefone` as any)}
          onChange={(e) => setValue(`${prefix}.telefone` as any, formatarTelefone(e.target.value))}
          placeholder="(00) 00000-0000"
          maxLength={15}
          className={cn(erros.telefone && "border-red-500")}
        />
        {erros.telefone && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.telefone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Gênero *</Label>
        <Select
          onValueChange={(value) => setValue(`${prefix}.genero` as any, value as "MASCULINO" | "FEMININO" | "OUTRO")}
          value={watch(`${prefix}.genero` as any)}
        >
          <SelectTrigger className={cn(erros.genero && "border-red-500")}>
            <SelectValue placeholder="Selecione o gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MASCULINO">Masculino</SelectItem>
            <SelectItem value="FEMININO">Feminino</SelectItem>
            <SelectItem value="OUTRO">Outro / Autodeclarado</SelectItem>
          </SelectContent>
        </Select>
        {erros.genero && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.genero.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>E-mail *</Label>
        <div className="relative">
          <Input
            type="email"
            {...register(`${prefix}.email` as any)}
            onBlur={(e) => validarEmailUnico(e.target.value)}
            placeholder="email@exemplo.com"
            className={cn(erros.email && "border-red-500", emailValido === true && "border-green-500")}
          />
          {validandoEmail && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>}
          {!validandoEmail && emailValido === true && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-500" /></div>}
        </div>
        {erros.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Título de Eleitor *</Label>
        <Input
          {...register(`${prefix}.tituloEleitor` as any)}
          onChange={(e) => setValue(`${prefix}.tituloEleitor` as any, e.target.value.replace(/\D/g, "").slice(0, 12))}
          placeholder="000000000000"
          maxLength={12}
          className={cn(erros.tituloEleitor && "border-red-500")}
        />
        {erros.tituloEleitor && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{erros.tituloEleitor.message}</p>}
      </div>
    </div>
  );
}

export default function EtapaDadosOrganizacao() {
  const { register, setValue, formState: { errors } } = useFormContext<FormularioInscricaoData>();
  const errosOrg = (errors as any).organizacao || {};

  return (
    <div className="space-y-6">
      <Alert>
        <Users className="h-4 w-4" />
        <AlertDescription>
          Informe os dados da entidade. Nas próximas etapas você indicará os candidatos titular e suplente.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label>CNPJ *</Label>
        <Input
          {...register("organizacao.cnpj" as any)}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 14);
            setValue("organizacao.cnpj" as any, digits);
            let display = digits;
            if (digits.length > 2) display = digits.slice(0, 2) + "." + digits.slice(2);
            if (digits.length > 5) display = display.slice(0, 6) + "." + display.slice(6);
            if (digits.length > 8) display = display.slice(0, 10) + "/" + display.slice(10);
            if (digits.length > 12) display = display.slice(0, 15) + "-" + display.slice(15);
            e.target.value = display;
          }}
          placeholder="00.000.000/0000-00"
          maxLength={18}
          className={cn(errosOrg.cnpj && "border-red-500")}
        />
        {errosOrg.cnpj && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errosOrg.cnpj.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Razão Social *</Label>
        <Input
          {...register("organizacao.razaoSocial" as any)}
          placeholder="Razão social da entidade"
          className={cn(errosOrg.razaoSocial && "border-red-500")}
        />
        {errosOrg.razaoSocial && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errosOrg.razaoSocial.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>E-mail da Organização *</Label>
        <Input
          type="email"
          {...register("organizacao.email" as any)}
          placeholder="email@organizacao.org.br"
          className={cn(errosOrg.email && "border-red-500")}
        />
        {errosOrg.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errosOrg.email.message}</p>}
        <p className="text-xs text-muted-foreground">As credenciais de acesso ao portal serão enviadas para este e-mail.</p>
      </div>
    </div>
  );
}
