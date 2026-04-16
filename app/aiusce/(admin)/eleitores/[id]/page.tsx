import { notFound, redirect } from "next/navigation";
import { buscarEleitorAiuscePorId } from "@/services/candidaturas-aiusce";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusActions } from "./_components/status-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BASE_PATH } from "@/lib/config";

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

const categoriaLabel: Record<string, string> = {
  ELET_ENT_REQUERIMENTO: "Requerimento (Entidade)",
  ELET_ENT_ESTATUTO: "Estatuto Social",
  ELET_ENT_ATA_ELEICAO: "Ata de Eleição",
  ELET_ENT_CNPJ: "Comprovante CNPJ",
  ELET_ENT_DECLARACAO_IDONEIDADE: "Declaração de Idoneidade",
  ELET_REP_IDENTIDADE: "Documento de Identidade",
  ELET_REP_TITULO_ELEITOR: "Título de Eleitor",
  ELET_REP_CPF: "CPF",
};

export default async function EleitorAiusceDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const usuario = await validaUsuarioAiusce();
  if (!usuario?.permissao || !["DEV", "ADM"].includes(usuario.permissao)) redirect("/aiusce/login");

  const { id } = await params;
  const eleitor = await buscarEleitorAiuscePorId(id);
  if (!eleitor) notFound();

  const org = eleitor.organizacao ?? eleitor.eleitorPai?.organizacao ?? null;
  const proc = eleitor.procurador;
  const cand = eleitor.candidato;
  const membros = eleitor.membros ?? [];
  const fmt = (d: Date) => format(new Date(d), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return (
    <div className="px-0 md:px-8 pb-20 container mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/aiusce/eleitores">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl md:text-4xl font-bold">Eleitor AIUSCE</h1>
          <p className="text-muted-foreground text-sm mt-1">Criado em {fmt(eleitor.criadoEm)}</p>
        </div>
        <Badge variant={statusVariant[eleitor.status] ?? "secondary"} className="text-sm px-3 py-1">
          {statusLabel[eleitor.status] ?? eleitor.status}
        </Badge>
      </div>

      <StatusActions id={eleitor.id} statusAtual={eleitor.status} />

      {cand && (
        <Card>
          <CardHeader>
            <CardTitle>
              {cand.tipoCandidato === "TITULAR" ? "Titular" : "Suplente"} (Candidato)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Nome</p>
              <p className="font-medium">{cand.nomeSocial ?? cand.nome}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CPF</p>
              <p className="font-medium">{cand.cpf}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gênero</p>
              <p className="font-medium">{cand.genero}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data de Nascimento</p>
              <p className="font-medium">{format(new Date(cand.dataNascimento), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">E-mail</p>
              <p className="font-medium">{cand.email}</p>
            </div>
            {cand.telefone && (
              <div>
                <p className="text-muted-foreground">Telefone</p>
                <p className="font-medium">{cand.telefone}</p>
              </div>
            )}
            {cand.tituloEleitor && (
              <div>
                <p className="text-muted-foreground">Título de Eleitor</p>
                <p className="font-medium">{cand.tituloEleitor}</p>
              </div>
            )}
            {cand.domicilioEleitoral && (
              <div>
                <p className="text-muted-foreground">Domicílio Eleitoral</p>
                <p className="font-medium">{cand.domicilioEleitoral}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
              <p className="font-medium">{segmentoLabel[org.segmento] ?? org.segmento}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data de Abertura</p>
              <p className="font-medium">{format(new Date(org.dataAbertura), "dd/MM/yyyy")}</p>
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
                    <a key={arq.id} href={`${BASE_PATH}/api/aiusce/arquivos/${arq.id}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded border hover:bg-muted transition-colors">
                      {categoriaLabel[arq.categoria] ?? arq.categoria} — {arq.nome}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {membros.length > 0 && (
              <div className="md:col-span-3 border-t pt-4 mt-2">
                <p className="text-muted-foreground mb-3">Candidatos da Entidade</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {membros.map((m) => m.candidato && (
                    <div key={m.id} className="rounded-lg border p-3 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{m.candidato.nomeSocial ?? m.candidato.nome}</span>
                        <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                          {m.candidato.tipoCandidato === "TITULAR" ? "Titular" : "Suplente"}
                        </span>
                      </div>
                      <p className="text-muted-foreground">CPF: {m.candidato.cpf}</p>
                      {m.candidato.tituloEleitor && (
                        <p className="text-muted-foreground">Título: {m.candidato.tituloEleitor}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {proc && (
        <Card>
          <CardHeader><CardTitle>Procurador</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Nome</p>
              <p className="font-medium">{proc.nome}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CPF</p>
              <p className="font-medium">{proc.cpf}</p>
            </div>
            {proc.tituloEleitor && (
              <div>
                <p className="text-muted-foreground">Título de Eleitor</p>
                <p className="font-medium">{proc.tituloEleitor}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {eleitor.arquivos.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Documentos do Eleitor</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {eleitor.arquivos.map((arq) => (
                <a key={arq.id} href={`${BASE_PATH}/api/aiusce/arquivos/${arq.id}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm px-3 py-2 rounded border hover:bg-muted transition-colors">
                  {categoriaLabel[arq.categoria] ?? arq.categoria} — {arq.nome}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
