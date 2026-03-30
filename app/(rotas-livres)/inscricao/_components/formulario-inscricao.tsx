"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

import {
  formularioInscricaoSchema,
  type FormularioInscricaoData,
  etapaSchemas,
} from "@/lib/schemas/formulario-inscricao";

import EtapaTipoCadastro from "./etapas/etapa-tipo-cadastro";
import EtapaTipoInscricao from "./etapas/etapa-tipo-inscricao";
import EtapaDadosVotante from "./etapas/etapa-dados-votante";
import EtapaEndereco from "./etapas/etapa-endereco";
import EtapaArquivo from "./etapas/etapa-arquivo";
import EtapaRevisaoDados from "./etapas/etapa-revisao-dados";
import EtapaDeclaracoes from "./etapas/etapa-declaracoes";
import { toast } from "sonner";
import { isWithinOUCABPerimeter } from "@/lib/utils/polygon-validation";

const etapas = [
  {
    id: 1,
    titulo: "Tipo de Cadastro",
    descricao: "Selecione como você deseja participar",
    component: EtapaTipoCadastro,
  },
  {
    id: 2,
    titulo: "Tipo de Inscrição",
    descricao: "Selecione sua relação com a área da Operação Urbana",
    component: EtapaTipoInscricao,
  },
  {
    id: 3,
    titulo: "Endereço",
    descricao: "Informe seu endereço completo",
    component: EtapaEndereco,
  },
  {
    id: 4,
    titulo: "Dados Pessoais",
    descricao: "Informe seus dados pessoais",
    component: EtapaDadosVotante,
  },
  {
    id: 5,
    titulo: "Documentos",
    descricao: "Envie os documentos necessários",
    component: EtapaArquivo,
  },
  {
    id: 6,
    titulo: "Revisão de Dados",
    descricao: "Confira todas as informações",
    component: EtapaRevisaoDados,
  },
  {
    id: 7,
    titulo: "Declarações",
    descricao: "Aceite as declarações obrigatórias",
    component: EtapaDeclaracoes,
  },
];

export default function FormularioInscricao() {
  const router = useRouter();
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [etapasCompletas, setEtapasCompletas] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const methods = useForm<FormularioInscricaoData>({
    resolver: zodResolver(formularioInscricaoSchema),
    mode: "onChange",
    defaultValues: {
      tipoCadastro: undefined as any,
      tipoInscricao: undefined as any,
      votante: {
        nome: "",
        nomeSocial: "",
        telefone: "",
        genero: undefined as any,
        email: "",
        cpf: "",
        dataNascimento: "",
        empresa: "",
      },
      endereco: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        latitude: null,
        longitude: null,
      },
      arquivos: { arquivos: [] },
      declaracoes: {
        declaracaoIdentidade: false,
        declaracaoVotacao: false,
        declaracaoDocumento: false,
        declaracaoAutorizacao: false,
        declaracaoVeracidade: false,
      },
    },
  });

  const { trigger, getValues, handleSubmit, watch } = methods;

  const verificarPodeAvancar = () => {
    const dados = getValues();
    switch (etapaAtual) {
      case 1:
        return !!dados.tipoCadastro;
      case 2:
        return !!dados.tipoInscricao;
      case 3: {
        const e = dados.endereco;
        return !!(e?.logradouro && e?.bairro && e?.cidade && e?.estado && e?.cep && e?.latitude && e?.longitude);
      }
      case 4: {
        const v = dados.votante;
        const camposBasicos = !!(v?.nome && v?.telefone && v?.genero && v?.email && v?.cpf && v?.dataNascimento);
        const empresaOk = dados.tipoInscricao !== "TRABALHADOR" || !!v?.empresa;
        return camposBasicos && empresaOk;
      }
      case 5:
        return !!(dados.arquivos?.arquivos && dados.arquivos.arquivos.length > 0);
      case 6:
        return true;
      case 7: {
        const d = dados.declaracoes;
        return !!(d?.declaracaoIdentidade && d?.declaracaoVotacao && d?.declaracaoDocumento && d?.declaracaoAutorizacao && d?.declaracaoVeracidade);
      }
      default:
        return false;
    }
  };

  useEffect(() => {
    const subscription = watch(() => setPodeAvancar(verificarPodeAvancar()));
    setPodeAvancar(verificarPodeAvancar());
    return () => subscription.unsubscribe();
  }, [etapaAtual, watch]);

  useEffect(() => {
    setPodeAvancar(verificarPodeAvancar());
  }, [etapaAtual]);

  const proximaEtapa = async () => {
    let isValid = false;

    if (etapaAtual === 1) {
      isValid = await trigger(["tipoCadastro"]);
    } else if (etapaAtual === 2) {
      isValid = await trigger(["tipoInscricao"]);
    } else if (etapaAtual === 3) {
      isValid = await trigger(["endereco.logradouro", "endereco.bairro", "endereco.cidade", "endereco.estado", "endereco.cep"]);
      if (isValid) {
        const latitude = getValues("endereco.latitude");
        const longitude = getValues("endereco.longitude");
        if (!latitude || !longitude) {
          toast.error("Por favor, selecione um local no mapa.");
          isValid = false;
        } else {
          const dentroPerimetro = await isWithinOUCABPerimeter(latitude, longitude);
          if (!dentroPerimetro) {
            toast.error("O endereço selecionado está fora das áreas de abrangência da OUCAB.");
            isValid = false;
          }
        }
      }
    } else if (etapaAtual === 4) {
      const tipoInscricao = getValues("tipoInscricao");
      const campos: any[] = ["votante.nome", "votante.telefone", "votante.genero", "votante.email", "votante.cpf", "votante.dataNascimento"];
      if (tipoInscricao === "TRABALHADOR") campos.push("votante.empresa");
      isValid = true;
      for (const campo of campos) {
        const ok = await trigger(campo);
        if (!ok) { isValid = false; break; }
      }
      if (isValid) isValid = await trigger("votante");
    } else if (etapaAtual === 5) {
      isValid = await trigger(["arquivos"]);
    } else if (etapaAtual === 6) {
      isValid = true;
    } else if (etapaAtual === 7) {
      isValid = await trigger(["declaracoes"]);
    }

    if (isValid) {
      if (!etapasCompletas.includes(etapaAtual)) setEtapasCompletas([...etapasCompletas, etapaAtual]);
      if (etapaAtual < etapas.length) setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("tipoCadastro", data.tipoCadastro);
      formData.append("tipoInscricao", data.tipoInscricao);

      formData.append("votante.nome", data.votante.nome);
      if (data.votante.nomeSocial) formData.append("votante.nomeSocial", data.votante.nomeSocial);
      formData.append("votante.telefone", data.votante.telefone);
      formData.append("votante.genero", data.votante.genero);
      formData.append("votante.email", data.votante.email);
      formData.append("votante.cpf", data.votante.cpf);
      formData.append("votante.dataNascimento", data.votante.dataNascimento);
      if (data.votante.empresa) formData.append("votante.empresa", data.votante.empresa);
      if (data.votante.tituloEleitor) formData.append("votante.tituloEleitor", data.votante.tituloEleitor);

      formData.append("endereco.logradouro", data.endereco.logradouro);
      if (data.endereco.numero) formData.append("endereco.numero", data.endereco.numero);
      if (data.endereco.complemento) formData.append("endereco.complemento", data.endereco.complemento);
      formData.append("endereco.bairro", data.endereco.bairro);
      formData.append("endereco.cidade", data.endereco.cidade);
      formData.append("endereco.estado", data.endereco.estado);
      formData.append("endereco.cep", data.endereco.cep);
      if (data.endereco.latitude) formData.append("endereco.latitude", data.endereco.latitude.toString());
      if (data.endereco.longitude) formData.append("endereco.longitude", data.endereco.longitude.toString());
      if (data.endereco.areaPerimetro) formData.append("endereco.areaPerimetro", data.endereco.areaPerimetro);

      if (data.arquivos?.arquivos?.length > 0) {
        data.arquivos.arquivos.forEach((arquivo: File, index: number) => {
          formData.append(`arquivos[${index}]`, arquivo);
        });
      }

      formData.append("declaracoes.declaracaoIdentidade", data.declaracoes.declaracaoIdentidade.toString());
      formData.append("declaracoes.declaracaoVotacao", data.declaracoes.declaracaoVotacao.toString());
      formData.append("declaracoes.declaracaoDocumento", data.declaracoes.declaracaoDocumento.toString());
      formData.append("declaracoes.declaracaoAutorizacao", data.declaracoes.declaracaoAutorizacao.toString());
      formData.append("declaracoes.declaracaoVeracidade", data.declaracoes.declaracaoVeracidade.toString());

      const response = await fetch("/api/inscricao", { method: "POST", body: formData });
      const resultado = await response.json();

      if (!response.ok) throw new Error(resultado.error || "Erro ao enviar formulário");

      router.push("/agradecimento");
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : "Erro ao realizar inscrição. Tente novamente.";
      toast.error(mensagem);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progresso = (etapaAtual / etapas.length) * 100;
  const EtapaComponent = etapas[etapaAtual - 1].component;

  return (
    <div className="max-w-4xl mx-auto p-0 md:p-6">
      <Card className="border-0 shadow-none md:border-1 md:shadow">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Formulário de Inscrição
          </CardTitle>
          <CardDescription className="text-center">
            Preencha todas as etapas para completar sua inscrição
          </CardDescription>
          <div className="space-y-2">
            <Progress value={progresso} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Etapa {etapaAtual} de {etapas.length}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold">{etapas[etapaAtual - 1].titulo}</h3>
                <p className="text-muted-foreground">{etapas[etapaAtual - 1].descricao}</p>
              </div>
              <EtapaComponent />
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={etapaAnterior}
                  disabled={etapaAtual === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </Button>
                {etapaAtual < etapas.length ? (
                  <Button
                    type="button"
                    onClick={proximaEtapa}
                    disabled={!podeAvancar}
                    className="flex items-center space-x-2"
                  >
                    <span>Próxima</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || etapasCompletas.length < etapas.length - 1}
                    className="flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Finalizar Inscrição</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
