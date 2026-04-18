import { notFound, redirect } from "next/navigation";
import { buscarCandidaturaAiuscePorId } from "@/services/candidaturas-aiusce";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import { Badge } from "@/components/ui/badge";
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

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  EM_ANALISE: "secondary",
  DEFERIDO: "default",
  INDEFERIDO: "destructive",
};

const statusLabel: Record<string, string> = {
  EM_ANALISE: "Em Análise",
  DEFERIDO: "Deferido",
  INDEFERIDO: "Indeferido",
};

const segmentoLabel: Record<string, string> = {
  ONG_CULTURAL: "ONG Cultural",
  ENTIDADE_URB_AMB: "Entidade Urbana / Ambiental",
};

const tipoCandidatoLabel: Record<string, string> = {
  TITULAR: "Titular",
  SUPLENTE: "Suplente",
};

const generoLabel: Record<string, string> = {
  MASCULINO: "Masculino",
  FEMININO: "Feminino",
  OUTRO: "Outro / Autodeclarado",
};

const categoriaLabel: Record<string, string> = {
  CAND_ENT_REQUERIMENTO: "Requerimento (Entidade)",
  CAND_ENT_DECLARACAO_ATUACAO: "Declaração de Atuação",
  CAND_ENT_ESTATUTO: "Estatuto Social",
  CAND_ENT_ATA_ELEICAO: "Ata de Eleição",
  CAND_ENT_CNPJ: "Comprovante CNPJ",
  CAND_ENT_DECLARACAO_IDONEIDADE: "Declaração de Idoneidade",
  CAND_REP_IDENTIDADE: "Documento de Identidade",
  CAND_REP_TITULO_ELEITOR: "Título de Eleitor",
  CAND_REP_CPF: "CPF",
  CAND_REP_FOTO: "Foto 3×4",
  CAND_REP_NAO_IMPEDIMENTO: "Declaração de Não Impedimento",
  CAND_CHAPA_REQUERIMENTO: "Requerimento de Chapa",
};

export default async function CandidaturaAiusceDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiusce/login");

  const { id } = await params;
  const candidatura = await buscarCandidaturaAiuscePorId(id);
  if (!candidatura) notFound();

  const org = candidatura.organizacao;
  const fmt = (d: Date) => format(new Date(d), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <div className="px-0 md:px-8 pb-20 container mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/aiusce/candidaturas">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl md:text-4xl font-bold">Candidatura AIUSCE</h1>
          <p className="text-muted-foreground text-sm mt-1">Criada em {fmt(candidatura.criadoEm)}</p>
        </div>
        <Badge variant={statusVariant[candidatura.status] ?? "secondary"} className="text-sm px-3 py-1">
          {statusLabel[candidatura.status] ?? candidatura.status}
        </Badge>
      </div>

      <StatusActions id={candidatura.id} statusAtual={candidatura.status} />

      {org && (
        <Card>
          <CardHeader><CardTitle>Entidade Candidata</CardTitle></CardHeader>
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
              <p className="font-medium">{segmentoLabel[org.segmento] ?? org.segmento}</p>
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
            <div>
              <p className="text-muted-foreground">Representante</p>
              <p className="font-medium">{org.repNome} — {org.repCpf}</p>
            </div>
            {org.formaChapa && (
              <div>
                <p className="text-muted-foreground">Forma Chapa</p>
                <p className="font-medium">Sim{org.cnpjChapa ? ` — CNPJ: ${org.cnpjChapa}` : ""}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {candidatura.candidatos.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Candidatos</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {candidatura.candidatos.map((c) => (
              <div key={c.id} className="border rounded-lg p-4 space-y-3">
                <Badge variant="outline">{tipoCandidatoLabel[c.tipoCandidato] ?? c.tipoCandidato}</Badge>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nome</p>
                    <p className="font-medium">{c.nome}{c.nomeSocial ? ` (${c.nomeSocial})` : ""}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CPF</p>
                    <p className="font-medium">{c.cpf}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">E-mail</p>
                    <p className="font-medium">{c.email}</p>
                  </div>
                  {c.telefone && (
                    <div>
                      <p className="text-muted-foreground">Telefone</p>
                      <p className="font-medium">{c.telefone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Nascimento</p>
                    <p className="font-medium">{formatDateBR(c.dataNascimento)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gênero</p>
                    <p className="font-medium">{generoLabel[c.genero] ?? c.genero}</p>
                  </div>
                  {c.tituloEleitor && (
                    <div>
                      <p className="text-muted-foreground">Título de Eleitor</p>
                      <p className="font-medium">{c.tituloEleitor}</p>
                    </div>
                  )}
                  {c.domicilioEleitoral && (
                    <div>
                      <p className="text-muted-foreground">Domicílio Eleitoral</p>
                      <p className="font-medium">{c.domicilioEleitoral}</p>
                    </div>
                  )}
                </div>
                {c.arquivos.length > 0 && (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Documentos</p>
                    <div className="flex flex-wrap gap-2">
                      {c.arquivos.map((arq) => (
                        <VisualizadorArquivo
                          key={arq.id}
                          id={arq.id}
                          nome={arq.nome}
                          tipo={arq.tipo}
                          label={`${categoriaLabel[arq.categoria] ?? arq.categoria} — ${arq.nome}`}
                          url={`${BASE_PATH}/api/aiusce/arquivos/${arq.id}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {candidatura.arquivos.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Documentos da Entidade</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {candidatura.arquivos.map((arq) => (
                <VisualizadorArquivo
                  key={arq.id}
                  id={arq.id}
                  nome={arq.nome}
                  tipo={arq.tipo}
                  label={`${categoriaLabel[arq.categoria] ?? arq.categoria} — ${arq.nome}`}
                  url={`${BASE_PATH}/api/aiusce/arquivos/${arq.id}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
