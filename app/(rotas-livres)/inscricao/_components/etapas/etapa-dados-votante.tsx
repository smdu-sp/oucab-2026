"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioInscricaoData } from "@/lib/schemas/formulario-inscricao";
import { BASE_PATH } from "@/lib/config";

// Validação local do título de eleitor (espelho da lógica do schema)
function validarTituloEleitor(titulo: string): boolean {
  const t = titulo.replace(/\D/g, "");
  if (t.length !== 12) return false;
  const digits = t.split("").map(Number);
  const state = digits[8] * 10 + digits[9];
  if (state === 0 || state > 28) return false;
  const weights1 = [9, 8, 7, 6, 5, 4, 3, 2];
  const sum1 = digits.slice(0, 8).reduce((acc, d, i) => acc + d * weights1[i], 0);
  const r1 = sum1 % 11;
  const d1 = (state === 1 || state === 2) ? (r1 === 0 ? 0 : r1 === 1 ? 1 : 11 - r1) : (r1 < 2 ? 0 : 11 - r1);
  if (d1 !== digits[10]) return false;
  const sum2 = digits[8] * 7 + digits[9] * 8 + d1 * 9;
  const r2 = sum2 % 11;
  const d2 = r2 < 2 ? 1 : 11 - r2;
  return d2 === digits[11];
}

// Função para validar CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  return true;
}

// Função para formatar CPF
function formatarCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar telefone
function formatarTelefone(telefone: string): string {
  telefone = telefone.replace(/[^\d]/g, '');
  
  if (telefone.length === 0) {
    return '';
  }
  
  if (telefone.length <= 2) {
    return `(${telefone}`;
  }
  
  if (telefone.length <= 6) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  }
  
  if (telefone.length <= 10) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
  }
  
  // Para telefones com 11 dígitos (celular)
  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
}

export default function EtapaDadosVotante() {
  const { 
    register, 
    formState: { errors }, 
    watch, 
    setValue,
    setError,
    clearErrors
  } = useFormContext<FormularioInscricaoData>();

  const [validandoCPF, setValidandoCPF] = useState(false);
  const [validandoEmail, setValidandoEmail] = useState(false);
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);
  const [emailValido, setEmailValido] = useState<boolean | null>(null);
  const [tituloValido, setTituloValido] = useState<boolean | null>(null);

  const cpfValue = watch("votante.cpf");
  const emailValue = watch("votante.email");
  const telefoneValue = watch("votante.telefone");
  const tipoInscricao = watch("tipoInscricao");

  // Validação de CPF em tempo real
  const validarCPFUnico = async (cpf: string) => {
    if (!cpf || cpf.length < 14) return;
    const cpfLimpo = cpf.replace(/[^\d]/g, '');
    if (!validarCPF(cpfLimpo)) {
      setError("votante.cpf", { 
        type: "manual", 
        message: "CPF inválido" 
      });
      setCpfValido(false);
      return;
    }
    setValidandoCPF(true);
    try {
      const response = await fetch(`${BASE_PATH}/api/validacao/cpf/${cpfLimpo}`);
      const data = await response.json();
      if (data.disponivel) {
        clearErrors("votante.cpf");
        setCpfValido(true);
      } else {
        setError("votante.cpf", { 
          type: "manual", 
          message: "Este CPF já está cadastrado" 
        });
        setCpfValido(false);
      }
    } catch (error) {
      console.error("Erro ao validar CPF:", error);
      setError("votante.cpf", { 
        type: "manual", 
        message: "Erro ao validar CPF. Tente novamente." 
      });
      setCpfValido(false);
    } finally {
      setValidandoCPF(false);
    }
  };

  // Validação de email único
  const validarEmailUnico = async (email: string) => {
    if (!email || !email.includes("@")) return;

    setValidandoEmail(true);
    try {
      const response = await fetch(`${BASE_PATH}/api/validacao/email/${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (!data.disponivel) {
        setError("votante.email", { 
          type: "manual", 
          message: "Este e-mail já está cadastrado" 
        });
        setEmailValido(false);
      } else {
        clearErrors("votante.email");
        setEmailValido(true);
      }
    } catch (error) {
      console.error("Erro ao validar e-mail:", error);
      setError("votante.email", { 
        type: "manual", 
        message: "Erro ao validar e-mail. Tente novamente." 
      });
      setEmailValido(false);
    } finally {
      setValidandoEmail(false);
    }
  };

  // Handler para formatação do CPF
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const cpfFormatado = formatarCPF(valor);
    setValue("votante.cpf", cpfFormatado);
    
    // Reset do estado de validação
    setCpfValido(null);
    
    // Validar após um delay
    setTimeout(() => {
      validarCPFUnico(cpfFormatado);
    }, 500);
  };

  // Handler para validação do email
  const handleEmailBlur = () => {
    if (emailValue) {
      validarEmailUnico(emailValue);
    }
  };

  // Handler para formatação do telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setValue("votante.telefone", telefoneFormatado);
  };

  // Handler para validação do título de eleitor
  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 12);
    setValue("votante.tituloEleitor", v);
    setTituloValido(null);
    if (v.length === 12) {
      if (validarTituloEleitor(v)) {
        clearErrors("votante.tituloEleitor" as any);
        setTituloValido(true);
      } else {
        setError("votante.tituloEleitor" as any, { type: "manual", message: "Título de eleitor inválido" });
        setTituloValido(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Nome Completo */}
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo *</Label>
        <Input
          id="nome"
          {...register("votante.nome")}
          placeholder="Digite seu nome completo"
          className={cn(
            errors.votante?.nome && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.votante?.nome && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.nome.message}
          </p>
        )}
      </div>

      {/* Nome Social */}
      <div className="space-y-2">
        <Label htmlFor="nomeSocial">Nome Social</Label>
        <Input
          id="nomeSocial"
          {...register("votante.nomeSocial")}
          placeholder="Digite seu nome social (opcional)"
          className={cn(
            errors.votante?.nomeSocial && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.votante?.nomeSocial && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.nomeSocial.message}
          </p>
        )}
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone *</Label>
        <Input
          id="telefone"
          {...register("votante.telefone")}
          onChange={handleTelefoneChange}
          placeholder="Digite seu telefone"
          maxLength={15}
          className={cn(
            errors.votante?.telefone && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.votante?.telefone && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.telefone.message}
          </p>
        )}
      </div>

      {/* Gênero */}
      <div className="space-y-2">
        <Label htmlFor="genero">Gênero *</Label>
        <Select
          onValueChange={(value) => setValue("votante.genero", value as "MASCULINO" | "FEMININO" | "OUTRO")}
          value={watch("votante.genero")}
        >
          <SelectTrigger className={cn(
            errors.votante?.genero && "border-red-500 focus-visible:ring-red-500"
          )}>
            <SelectValue placeholder="Selecione seu gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MASCULINO">Masculino</SelectItem>
            <SelectItem value="FEMININO">Feminino</SelectItem>
            <SelectItem value="OUTRO">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.votante?.genero && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.genero.message}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            {...register("votante.email")}
            onBlur={handleEmailBlur}
            placeholder="Digite seu e-mail"
            className={cn(
              errors.votante?.email && "border-red-500 focus-visible:ring-red-500",
              emailValido === true && "border-green-500 focus-visible:ring-green-500"
            )}
          />
          {validandoEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
          {!validandoEmail && emailValido === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>
        {errors.votante?.email && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.email.message}
          </p>
        )}
      </div>

      {/* CPF */}
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF *</Label>
        <div className="relative">
          <Input
            id="cpf"
            {...register("votante.cpf")}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            maxLength={14}
            className={cn(
              errors.votante?.cpf && "border-red-500 focus-visible:ring-red-500",
              cpfValido === true && "border-green-500 focus-visible:ring-green-500"
            )}
          />
          {validandoCPF && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
          {!validandoCPF && cpfValido === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>
        {errors.votante?.cpf && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.cpf.message}
          </p>
        )}
      </div>

      {/* Data de Nascimento */}
      <div className="space-y-2">
        <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
        <Input
          id="dataNascimento"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          {...register("votante.dataNascimento")}
          onChange={(e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
            if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5);
            setValue("votante.dataNascimento", v);
          }}
          className={cn(
            errors.votante?.dataNascimento && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.votante?.dataNascimento && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.votante.dataNascimento.message}
          </p>
        )}
      </div>

      {/* Título de Eleitor */}
      <div className="space-y-2">
        <Label htmlFor="tituloEleitor">Título de Eleitor *</Label>
        <div className="relative">
          <Input
            id="tituloEleitor"
            {...register("votante.tituloEleitor" as any)}
            onChange={handleTituloChange}
            placeholder="000000000000"
            maxLength={12}
            className={cn(
              (errors.votante as any)?.tituloEleitor && "border-red-500 focus-visible:ring-red-500",
              tituloValido === true && "border-green-500 focus-visible:ring-green-500"
            )}
          />
          {tituloValido === true && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          )}
          {tituloValido === false && !(errors.votante as any)?.tituloEleitor && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
        {(errors.votante as any)?.tituloEleitor && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {(errors.votante as any).tituloEleitor.message}
          </p>
        )}
      </div>

      {/* Campo Empresa - apenas para TRABALHADOR */}
      {tipoInscricao === "TRABALHADOR" && (
        <div className="space-y-2">
          <Label htmlFor="empresa">Nome da Empresa *</Label>
          <Input
            id="empresa"
            {...register("votante.empresa")}
            placeholder="Digite o nome da empresa onde trabalha"
            className={cn(
              errors.votante?.empresa && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.votante?.empresa && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.votante.empresa.message}
            </p>
          )}
        </div>
      )}

      {/* Informações importantes */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Certifique-se de que todos os dados estão corretos. 
          O CPF e e-mail serão verificados automaticamente para evitar duplicatas.
        </AlertDescription>
      </Alert>
    </div>
  );
}