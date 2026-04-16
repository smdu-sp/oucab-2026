"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormularioAiusceData } from "@/lib/schemas/formulario-aiusce";

type Prefix = "entidadeCandidata" | "entidadeEleitora";

function formatarCEP(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

function EnderecoForm({ prefix }: { prefix: Prefix }) {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormularioAiusceData>();
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroViaCep, setErroViaCep] = useState("");

  const e = (errors[prefix] ?? {}) as Record<string, { message?: string }>;

  const buscarCep = async (cep: string) => {
    const soDigitos = cep.replace(/\D/g, "");
    if (soDigitos.length !== 8) return;
    setBuscandoCep(true);
    setErroViaCep("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${soDigitos}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErroViaCep("CEP não encontrado.");
        return;
      }
      if (data.logradouro) setValue(`${prefix}.logradouro`, data.logradouro);
      if (data.bairro)     setValue(`${prefix}.bairro`, data.bairro);
      if (data.localidade) setValue(`${prefix}.cidade`, data.localidade);
      if (data.uf)         setValue(`${prefix}.uf`, data.uf.toUpperCase());
    } catch {
      setErroViaCep("Erro ao buscar CEP. Preencha manualmente.");
    } finally {
      setBuscandoCep(false);
    }
  };

  return (
    <div className="space-y-5">
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertDescription>
          Informe o endereço da sede da entidade. O CEP preenche automaticamente logradouro, bairro, cidade e UF.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* CEP */}
        <div className="md:col-span-2 space-y-2">
          <Label>CEP *</Label>
          <div className="relative">
            <Input
              {...register(`${prefix}.cep`)}
              onChange={(ev) => {
                const formatted = formatarCEP(ev.target.value);
                setValue(`${prefix}.cep`, formatted);
                if (formatted.length === 9) buscarCep(formatted);
              }}
              placeholder="00000-000"
              maxLength={9}
              className={cn(e.cep && "border-red-500")}
            />
            {buscandoCep && (
              <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
          {e.cep && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.cep.message}</p>}
          {erroViaCep && <p className="text-sm text-amber-600">{erroViaCep}</p>}
        </div>

        {/* Logradouro */}
        <div className="md:col-span-4 space-y-2">
          <Label>Logradouro *</Label>
          <Input
            {...register(`${prefix}.logradouro`)}
            placeholder="Rua, Avenida, etc."
            className={cn(e.logradouro && "border-red-500")}
          />
          {e.logradouro && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.logradouro.message}</p>}
        </div>

        {/* Número */}
        <div className="md:col-span-2 space-y-2">
          <Label>Número *</Label>
          <Input
            {...register(`${prefix}.numero`)}
            placeholder="123"
            className={cn(e.numero && "border-red-500")}
          />
          {e.numero && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.numero.message}</p>}
        </div>

        {/* Complemento */}
        <div className="md:col-span-4 space-y-2">
          <Label>Complemento</Label>
          <Input
            {...register(`${prefix}.complemento`)}
            placeholder="Sala, Andar, Bloco, etc. (opcional)"
          />
        </div>

        {/* Bairro */}
        <div className="md:col-span-3 space-y-2">
          <Label>Bairro *</Label>
          <Input
            {...register(`${prefix}.bairro`)}
            placeholder="Bairro"
            className={cn(e.bairro && "border-red-500")}
          />
          {e.bairro && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.bairro.message}</p>}
        </div>

        {/* Cidade */}
        <div className="md:col-span-2 space-y-2">
          <Label>Cidade *</Label>
          <Input
            {...register(`${prefix}.cidade`)}
            placeholder="São Paulo"
            className={cn(e.cidade && "border-red-500")}
          />
          {e.cidade && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.cidade.message}</p>}
        </div>

        {/* UF */}
        <div className="md:col-span-1 space-y-2">
          <Label>UF *</Label>
          <Input
            {...register(`${prefix}.uf`)}
            onChange={(ev) => setValue(`${prefix}.uf`, ev.target.value.toUpperCase().slice(0, 2))}
            placeholder="SP"
            maxLength={2}
            className={cn(e.uf && "border-red-500", "uppercase")}
          />
          {e.uf && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{e.uf.message}</p>}
        </div>
      </div>
    </div>
  );
}

export function EtapaEnderecoCandidata() {
  return <EnderecoForm prefix="entidadeCandidata" />;
}

export function EtapaEnderecoEleitora() {
  return <EnderecoForm prefix="entidadeEleitora" />;
}
