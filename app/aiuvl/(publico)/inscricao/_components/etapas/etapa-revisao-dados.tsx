"use client";

import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building2, Trophy, Award, FileText, Info } from "lucide-react";
import type { FormularioAiuvlData } from "@/lib/schemas/formulario-aiuvl";

const SEGMENTO_LABEL: Record<string, string> = {
  ONG:                "Organização Não Governamental",
  ASSOCIACAO_BAIRRO:  "Associação de Bairro",
  ENTIDADE_ACADEMICA: "Entidade Acadêmica / Pesquisa",
  REP_EMPRESARIAL:    "Setor Empresarial",
};

function Campo({ label, valor }: { label: string; valor?: string | null | boolean }) {
  if (!valor && valor !== false) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <span className="text-xs text-muted-foreground min-w-[180px] shrink-0">{label}</span>
      <span className="text-sm font-medium">{typeof valor === "boolean" ? (valor ? "Sim" : "Não") : valor}</span>
    </div>
  );
}

function Secao({ titulo, icone: Icone, children }: { titulo: string; icone: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Icone className="h-4 w-4 text-muted-foreground" />
        {titulo}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ArquivoStatus({ arquivo, label }: { arquivo?: File | null; label: string }) {
  if (!arquivo) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium truncate">{(arquivo as File).name}</span>
    </div>
  );
}

export default function EtapaRevisaoDadosAiuvl() {
  const { watch } = useFormContext<FormularioAiuvlData>();
  const data = watch();
  const isCandidata = data.tipoInscricao === "CANDIDATO";

  return (
    <div className="space-y-5">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Revise os dados antes de enviar. Após o envio, a inscrição será analisada pela Comissão Eleitoral.
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-2">
        <Badge variant={isCandidata ? "default" : "secondary"} className="text-sm">
          {isCandidata ? "Inscrição como Candidato" : "Inscrição como Eleitor"}
        </Badge>
      </div>

      {isCandidata && data.entidadeCandidata && (
        <Secao titulo="Entidade Candidata" icone={Building2}>
          <Campo label="Razão Social" valor={data.entidadeCandidata.razaoSocial} />
          <Campo label="CNPJ" valor={data.entidadeCandidata.cnpj} />
          <Campo label="Segmento" valor={SEGMENTO_LABEL[data.entidadeCandidata.segmento ?? ""]} />
          <Campo label="Data de Abertura" valor={data.entidadeCandidata.dataAbertura} />
          <Campo label="CEP" valor={data.entidadeCandidata.cep} />
          <Campo label="Logradouro" valor={data.entidadeCandidata.logradouro} />
          <Campo label="Número" valor={data.entidadeCandidata.numero} />
          <Campo label="Complemento" valor={data.entidadeCandidata.complemento} />
          <Campo label="Bairro" valor={data.entidadeCandidata.bairro} />
          <Campo label="Cidade/UF" valor={data.entidadeCandidata.cidade && data.entidadeCandidata.uf ? `${data.entidadeCandidata.cidade}/${data.entidadeCandidata.uf}` : undefined} />
          <Campo label="E-mail" valor={data.entidadeCandidata.emailEntidade} />
          <Campo label="Telefone" valor={data.entidadeCandidata.telefone} />
          <Campo label="Representante Legal" valor={data.entidadeCandidata.repNome} />
          <Campo label="CPF do Representante" valor={data.entidadeCandidata.repCpf} />
          <Campo label="Título de Eleitor (Rep.)" valor={data.entidadeCandidata.repTituloEleitor} />
          <Campo label="Domicílio Eleitoral (Rep.)" valor={data.entidadeCandidata.repDomicilio} />
        </Secao>
      )}

      {isCandidata && data.titular && (
        <Secao titulo="Candidato Titular" icone={Trophy}>
          <Campo label="Nome" valor={data.titular.nome} />
          <Campo label="Nome Social" valor={data.titular.nomeSocial} />
          <Campo label="CPF" valor={data.titular.cpf} />
          <Campo label="Data de Nascimento" valor={data.titular.dataNascimento} />
          <Campo label="Gênero" valor={data.titular.genero} />
          <Campo label="E-mail" valor={data.titular.email} />
          <Campo label="Telefone" valor={data.titular.telefone} />
          <Campo label="Título de Eleitor" valor={data.titular.tituloEleitor} />
          <Campo label="Domicílio Eleitoral" valor={data.titular.domicilioEleitoral} />
        </Secao>
      )}

      {isCandidata && data.suplente && (
        <Secao titulo="Candidato Suplente" icone={Award}>
          <Campo label="Nome" valor={data.suplente.nome} />
          <Campo label="Nome Social" valor={data.suplente.nomeSocial} />
          <Campo label="CPF" valor={data.suplente.cpf} />
          <Campo label="Data de Nascimento" valor={data.suplente.dataNascimento} />
          <Campo label="Gênero" valor={data.suplente.genero} />
          <Campo label="E-mail" valor={data.suplente.email} />
          <Campo label="Telefone" valor={data.suplente.telefone} />
          <Campo label="Título de Eleitor" valor={data.suplente.tituloEleitor} />
          <Campo label="Domicílio Eleitoral" valor={data.suplente.domicilioEleitoral} />
        </Secao>
      )}

      {!isCandidata && data.entidadeEleitora && (
        <Secao titulo="Entidade Eleitora" icone={Building2}>
          <Campo label="Razão Social" valor={data.entidadeEleitora.razaoSocial} />
          <Campo label="CNPJ" valor={data.entidadeEleitora.cnpj} />
          <Campo label="Segmento" valor={SEGMENTO_LABEL[data.entidadeEleitora.segmento ?? ""]} />
          <Campo label="Segmento de Votação" valor={SEGMENTO_LABEL[data.entidadeEleitora.segmentoVotacao ?? ""]} />
          <Campo label="Data de Abertura" valor={data.entidadeEleitora.dataAbertura} />
          <Campo label="CEP" valor={data.entidadeEleitora.cep} />
          <Campo label="Logradouro" valor={data.entidadeEleitora.logradouro} />
          <Campo label="Número" valor={data.entidadeEleitora.numero} />
          <Campo label="Complemento" valor={data.entidadeEleitora.complemento} />
          <Campo label="Bairro" valor={data.entidadeEleitora.bairro} />
          <Campo label="Cidade/UF" valor={data.entidadeEleitora.cidade && data.entidadeEleitora.uf ? `${data.entidadeEleitora.cidade}/${data.entidadeEleitora.uf}` : undefined} />
          <Campo label="E-mail" valor={data.entidadeEleitora.emailEntidade} />
          <Campo label="Telefone" valor={data.entidadeEleitora.telefone} />
          <Campo label="Representante Legal" valor={data.entidadeEleitora.repNome} />
          <Campo label="CPF do Representante" valor={data.entidadeEleitora.repCpf} />
          <Campo label="Título de Eleitor (Rep.)" valor={data.entidadeEleitora.repTituloEleitor} />
          <Campo label="Domicílio Eleitoral (Rep.)" valor={data.entidadeEleitora.repDomicilio} />
        </Secao>
      )}

      <Secao titulo="Documentos Anexados" icone={FileText}>
        {isCandidata ? (
          <>
            <ArquivoStatus arquivo={data.candEntRequerimento as File | null} label="Requerimento (entidade)" />
            <ArquivoStatus arquivo={data.candEntDeclaracaoAtuacao as File | null} label="Declaração de Atuação" />
            <ArquivoStatus arquivo={data.candEntEstatuto as File | null} label="Estatuto" />
            <ArquivoStatus arquivo={data.candEntAtaEleicao as File | null} label="Ata de Eleição" />
            <ArquivoStatus arquivo={data.candEntCnpj as File | null} label="Comprovante CNPJ" />
            <ArquivoStatus arquivo={data.candEntDeclaracaoIdoneidade as File | null} label="Declaração de Idoneidade" />
            <ArquivoStatus arquivo={data.repIdentidade as File | null} label="Identidade (representante)" />
            <ArquivoStatus arquivo={data.repCpfDoc as File | null} label="CPF (representante)" />
            <ArquivoStatus arquivo={data.repTituloEleitorDoc as File | null} label="Título de eleitor (representante)" />
            <ArquivoStatus arquivo={data.repComprovanteResidencia as File | null} label="Comprovante de residência (representante)" />
            <ArquivoStatus arquivo={data.titularIdentidade as File | null} label="Identidade (titular)" />
            <ArquivoStatus arquivo={data.titularCpfDoc as File | null} label="CPF (titular)" />
            <ArquivoStatus arquivo={data.titularFoto as File | null} label="Foto 3×4 (titular)" />
            <ArquivoStatus arquivo={data.titularTituloEleitor as File | null} label="Título de eleitor (titular)" />
            <ArquivoStatus arquivo={data.titularResidencia as File | null} label="Comprovante de residência (titular)" />
            <ArquivoStatus arquivo={data.titularDeclaracao as File | null} label="Declaração do candidato (titular)" />
            <ArquivoStatus arquivo={data.suplenteIdentidade as File | null} label="Identidade (suplente)" />
            <ArquivoStatus arquivo={data.suplenteCpfDoc as File | null} label="CPF (suplente)" />
            <ArquivoStatus arquivo={data.suplenteFoto as File | null} label="Foto 3×4 (suplente)" />
            <ArquivoStatus arquivo={data.suplenteTituloEleitor as File | null} label="Título de eleitor (suplente)" />
            <ArquivoStatus arquivo={data.suplenteResidencia as File | null} label="Comprovante de residência (suplente)" />
            <ArquivoStatus arquivo={data.suplenteDeclaracao as File | null} label="Declaração do candidato (suplente)" />
          </>
        ) : (
          <>
            <ArquivoStatus arquivo={data.eleitEntRequerimento as File | null} label="Requerimento (entidade)" />
            <ArquivoStatus arquivo={data.eleitEntDeclaracaoAtuacao as File | null} label="Declaração de Atuação" />
            <ArquivoStatus arquivo={data.eleitEntEstatuto as File | null} label="Estatuto" />
            <ArquivoStatus arquivo={data.eleitEntAtaEleicao as File | null} label="Ata de Eleição" />
            <ArquivoStatus arquivo={data.eleitEntCnpj as File | null} label="Comprovante CNPJ" />
            <ArquivoStatus arquivo={data.eleitEntDeclaracaoIdoneidade as File | null} label="Declaração de Idoneidade" />
            <ArquivoStatus arquivo={data.eleitRepIdentidade as File | null} label="Identidade (representante)" />
            <ArquivoStatus arquivo={data.eleitRepCpfDoc as File | null} label="CPF (representante)" />
            <ArquivoStatus arquivo={data.eleitRepTituloEleitor as File | null} label="Título de eleitor (representante)" />
            <ArquivoStatus arquivo={data.eleitRepResidencia as File | null} label="Comprovante de residência (representante)" />
          </>
        )}
      </Secao>
    </div>
  );
}
