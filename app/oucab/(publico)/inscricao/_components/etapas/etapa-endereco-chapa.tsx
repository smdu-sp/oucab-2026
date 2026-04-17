"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, Building2 } from "lucide-react";
import { toast } from "sonner";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export default function EtapaEnderecoChapa() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const cep = (watch("enderecoChapa.cep") as string) || "";

  const buscarCep = async () => {
    if (!cep || cep.replace(/\D/g, "").length < 8) {
      toast.error("Digite um CEP válido");
      return;
    }

    setIsLoadingCep(true);
    try {
      const cepLimpo = cep.replace(/\D/g, "");
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setValue("enderecoChapa.logradouro", data.logradouro);
      setValue("enderecoChapa.bairro", data.bairro);
      setValue("enderecoChapa.cidade", data.localidade);
      setValue("enderecoChapa.estado", data.uf);
      if (data.complemento) setValue("enderecoChapa.complemento", data.complemento);
      toast.success("Endereço preenchido a partir do CEP");
    } catch {
      toast.error("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoadingCep(false);
    }
  };

  const erros = (errors as any).enderecoChapa || {};

  return (
    <div className="space-y-6">
      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          Informe o endereço da segunda entidade que compõe a chapa.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="chapa-cep">CEP *</Label>
          <Input
            id="chapa-cep"
            placeholder="00000-000"
            {...register("enderecoChapa.cep")}
            maxLength={9}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 5) value = value.replace(/(\d{5})(\d)/, "$1-$2");
              e.target.value = value;
              setValue("enderecoChapa.cep", value);
            }}
          />
          {erros.cep && <p className="text-sm text-red-500 mt-1">{erros.cep.message}</p>}
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            onClick={buscarCep}
            disabled={isLoadingCep || !cep}
            className="flex items-center gap-2"
          >
            {isLoadingCep ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Buscar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="chapa-logradouro">Logradouro *</Label>
          <Input
            id="chapa-logradouro"
            placeholder="Rua, Avenida, etc."
            {...register("enderecoChapa.logradouro")}
          />
          {erros.logradouro && <p className="text-sm text-red-500 mt-1">{erros.logradouro.message}</p>}
        </div>
        <div>
          <Label htmlFor="chapa-numero">Número</Label>
          <Input id="chapa-numero" placeholder="123" {...register("enderecoChapa.numero")} />
        </div>
      </div>

      <div>
        <Label htmlFor="chapa-complemento">Complemento</Label>
        <Input
          id="chapa-complemento"
          placeholder="Apto, Bloco, etc."
          {...register("enderecoChapa.complemento")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="chapa-bairro">Bairro *</Label>
          <Input id="chapa-bairro" placeholder="Nome do bairro" {...register("enderecoChapa.bairro")} />
          {erros.bairro && <p className="text-sm text-red-500 mt-1">{erros.bairro.message}</p>}
        </div>
        <div>
          <Label htmlFor="chapa-cidade">Cidade *</Label>
          <Input id="chapa-cidade" placeholder="Nome da cidade" {...register("enderecoChapa.cidade")} />
          {erros.cidade && <p className="text-sm text-red-500 mt-1">{erros.cidade.message}</p>}
        </div>
        <div>
          <Label htmlFor="chapa-estado">Estado *</Label>
          <Input
            id="chapa-estado"
            placeholder="SP"
            maxLength={2}
            {...register("enderecoChapa.estado")}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              setValue("enderecoChapa.estado", e.target.value);
            }}
          />
          {erros.estado && <p className="text-sm text-red-500 mt-1">{erros.estado.message}</p>}
        </div>
      </div>
    </div>
  );
}
