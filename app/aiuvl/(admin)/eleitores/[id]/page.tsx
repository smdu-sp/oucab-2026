import { notFound, redirect } from "next/navigation";
import { buscarEleitorAiuvlPorId } from "@/services/candidaturas-aiuvl";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";
import { EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusActions } from "./_components/status-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";
import { BASE_PATH } from "@/lib/config";
import VisualizadorArquivo from "@/components/visualizador-arquivo";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, SEGMENTO_AIUVL_INFO, getInfo } from "@/lib/labels";

const categoriaLabel: Record<string, string> = {
  ELEIT_ENT_REQUERIMENTO:          "Requerimento (Entidade)",
  ELEIT_ENT_DECLARACAO_ATUACAO:    "Declaração de Atuação",
  ELEIT_ENT_ESTATUTO:              "Estatuto Social",
  ELEIT_ENT_ATA_ELEICAO:           "Ata de Eleição",
  ELEIT_ENT_CNPJ:                  "Comprovante CNPJ",
  ELEIT_ENT_DECLARACAO_IDONEIDADE: "Declaração de Idoneidade",
  ELEIT_REP_IDENTIDADE:            "RG/Doc. de Identidade (Rep. Legal)",
  ELEIT_REP_CPF:                   "CPF (Rep. Legal)",
  ELEIT_REP_TITULO_ELEITOR:        "Título de Eleitor (Rep. Legal)",
  ELEIT_REP_COMPROVANTE_RESIDENCIA:"Comprovante de Residência (Rep. Legal)",
};

export default async function EleitorAiuvlDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiuvl/login");

  const isDev = usuario.permissao === "DEV";
  const { id } = await params;
  const eleitor = await buscarEleitorAiuvlPorId(id);
  if (!eleitor) notFound();

  const org = eleitor.organizacao;
  const fmt = (d: Date) => format(new Date(d), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <div className="px-0 md:px-8 pb-20 container mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/aiuvl/eleitores">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl md:text-4xl font-bold">Eleitor AIU-VL</h1>
          <p className="text-muted-foreground text-sm mt-1">Criado em {fmt(eleitor.criadoEm)}</p>
        </div>
        <EnumBadge info={getInfo(STATUS_INFO, eleitor.status)} className="text-sm px-3 py-1" />
      </div>

      {eleitor.status === "INDEFERIDO" && eleitor.motivoIndeferimento && (
        <div className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive space-y-0.5">
          <p className="font-semibold">Motivo do indeferimento</p>
          <p className="whitespace-pre-wrap">{eleitor.motivoIndeferimento}</p>
        </div>
      )}

      {isDev && eleitor.oculto && (
        <div className="flex items-center gap-2 rounded-md border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <EyeOff className="h-4 w-4 shrink-0" />
          Esta inscrição eleitoral está <strong>oculta</strong> para outros usuários.
        </div>
      )}

      <StatusActions id={eleitor.id} statusAtual={eleitor.status} isDev={isDev} oculto={eleitor.oculto} />

      {org && (
        <Card>
          <CardHeader><CardTitle>Entidade Eleitora</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Razão Social</p>
              <p className="font-medium">{org.razaoSocial}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CNPJ</p>
              <p className="font-medium">{org.cnpj}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Segmento</p>
              <EnumBadge info={getInfo(SEGMENTO_AIUVL_INFO, org.segmento)} />
            </div>
            <div>
              <p className="text-muted-foreground">Segmento de Votação</p>
              <EnumBadge info={getInfo(SEGMENTO_AIUVL_INFO, org.segmentoVotacao)} />
            </div>
            <div>
              <p className="text-muted-foreground">Data de Abertura</p>
              <p className="font-medium">{formatDateBR(org.dataAbertura)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sede</p>
              <p className="font-medium">{org.sede}</p>
            </div>
            <div>
              <p className="text-muted-foreground">E-mail</p>
              <p className="font-medium">{org.emailEntidade}</p>
            </div>
            {org.telefone && (
              <div>
                <p className="text-muted-foreground">Telefone</p>
                <p className="font-medium">{org.telefone}</p>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Representante Legal</p>
              <p className="font-medium">{org.repNome} — CPF: {org.repCpf}</p>
            </div>
            {org.repTituloEleitor && (
              <div>
                <p className="text-muted-foreground">Título de Eleitor (Rep.)</p>
                <p className="font-medium">{org.repTituloEleitor}</p>
              </div>
            )}
            {org.repDomicilio && (
              <div>
                <p className="text-muted-foreground">Domicílio Eleitoral (Rep.)</p>
                <p className="font-medium">{org.repDomicilio}</p>
              </div>
            )}
            {org.arquivos.length > 0 && (
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-2">Documentos da Entidade</p>
                <div className="flex flex-wrap gap-2">
                  {org.arquivos.map((arq) => (
                    <VisualizadorArquivo
                      key={arq.id}
                      id={arq.id}
                      nome={arq.nome}
                      tipo={arq.tipo}
                      label={`${categoriaLabel[arq.categoria] ?? arq.categoria} — ${arq.nome}`}
                      url={`${BASE_PATH}/api/aiuvl/arquivos/${arq.id}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {eleitor.arquivos.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Documentos do Representante Legal</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {eleitor.arquivos.map((arq) => (
                <VisualizadorArquivo
                  key={arq.id}
                  id={arq.id}
                  nome={arq.nome}
                  tipo={arq.tipo}
                  label={`${categoriaLabel[arq.categoria] ?? arq.categoria} — ${arq.nome}`}
                  url={`${BASE_PATH}/api/aiuvl/arquivos/${arq.id}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
