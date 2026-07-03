import { auth } from "@/auth/aiuvl";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, SEGMENTO_AIUVL_INFO, TIPO_INSCRICAO_INFO, TIPO_CANDIDATO_INFO, getInfo } from "@/lib/labels";
import { FileIcon, FolderOpen, RefreshCw } from "lucide-react";
import Link from "next/link";
import DocComplementarSection from "@/components/doc-complementar-section";
import {
  DOC_COMPLEMENTAR_INICIO_AIUVL,
  DOC_COMPLEMENTAR_FIM_AIUVL,
  DOC_COMPLEMENTAR_ELEITOR_INICIO_AIUVL,
  DOC_COMPLEMENTAR_ELEITOR_FIM_AIUVL,
  DOC_COMPLEMENTAR_RODADA2_INICIO_AIUVL,
  DOC_COMPLEMENTAR_RODADA2_FIM_AIUVL,
} from "@/lib/config";

const CATEGORIA_LABEL: Record<string, string> = {
  CAND_ENT_REQUERIMENTO:          "Requerimento de Inscrição (Anexo I)",
  CAND_ENT_DECLARACAO_ATUACAO:    "Declaração de Atuação na Região (Anexo II)",
  CAND_ENT_ESTATUTO:              "Estatuto Social da Entidade",
  CAND_ENT_ATA_ELEICAO:           "Ata de Eleição da Diretoria",
  CAND_ENT_CNPJ:                  "Comprovante de CNPJ",
  CAND_ENT_DECLARACAO_IDONEIDADE: "Declaração de Idoneidade (Anexo V)",
  CAND_REP_IDENTIDADE:            "Documento de Identificação — Representante Legal",
  CAND_REP_CPF:                   "CPF — Representante Legal",
  CAND_REP_TITULO_ELEITOR:        "Título de Eleitor — Representante Legal",
  CAND_REP_COMPROVANTE_RESIDENCIA:"Comprovante de Residência — Representante Legal",
  CAND_CAN_IDENTIDADE:            "Documento de Identificação — Candidato",
  CAND_CAN_CPF:                   "CPF — Candidato",
  CAND_CAN_FOTO:                  "Foto 3×4 — Candidato",
  CAND_CAN_TITULO_ELEITOR:        "Título de Eleitor — Candidato",
  CAND_CAN_COMPROVANTE_RESIDENCIA:"Comprovante de Residência — Candidato",
  CAND_CAN_DECLARACAO:            "Declaração do(a) Candidato(a) (Anexo III)",
  ELEIT_ENT_REQUERIMENTO:          "Requerimento de Inscrição como Eleitor (Anexo VI)",
  ELEIT_ENT_DECLARACAO_ATUACAO:    "Declaração de Atuação na Região (Anexo II)",
  ELEIT_ENT_ESTATUTO:              "Estatuto Social da Entidade",
  ELEIT_ENT_ATA_ELEICAO:           "Ata de Eleição da Diretoria",
  ELEIT_ENT_CNPJ:                  "Comprovante de CNPJ",
  ELEIT_ENT_DECLARACAO_IDONEIDADE: "Declaração de Idoneidade (Anexo V)",
  ELEIT_REP_IDENTIDADE:            "Documento de Identificação — Representante Legal",
  ELEIT_REP_CPF:                   "CPF — Representante Legal",
  ELEIT_REP_TITULO_ELEITOR:        "Título de Eleitor — Representante Legal",
  ELEIT_REP_COMPROVANTE_RESIDENCIA:"Comprovante de Residência — Representante Legal",
};

function isAtualizadoNoComplementar(atualizadoEm: Date, isCandidato: boolean, rodada?: number): boolean {
  if (isCandidato && rodada === 2) {
    return atualizadoEm >= DOC_COMPLEMENTAR_RODADA2_INICIO_AIUVL && atualizadoEm <= DOC_COMPLEMENTAR_RODADA2_FIM_AIUVL;
  }
  const inicio = isCandidato ? DOC_COMPLEMENTAR_INICIO_AIUVL : DOC_COMPLEMENTAR_ELEITOR_INICIO_AIUVL;
  const fim    = isCandidato ? DOC_COMPLEMENTAR_FIM_AIUVL    : DOC_COMPLEMENTAR_ELEITOR_FIM_AIUVL;
  return atualizadoEm >= inicio && atualizadoEm <= fim;
}

function cnpjFormatado(cnpj: string) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
function cpfFormatado(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default async function MinhaInscricaoAiuvlPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/aiuvl/login");

  const usuario = await db.usuario.findUnique({
    where: { id: session.user.id as string },
    include: {
      candidaturas: {
        orderBy: { rodada: "desc" },
        take: 1,
        include: {
          organizacao: { include: { arquivos: true } },
          candidatos: { include: { arquivos: true } },
          arquivos: true,
        },
      },
      eleitor: {
        include: {
          organizacao: { include: { arquivos: true } },
          arquivos: true,
        },
      },
    },
  });

  if (!usuario) redirect("/aiuvl/login");

  const candidatura = usuario.candidaturas[0] ?? null;
  const eleitor = usuario.eleitor;

  if (!candidatura && !eleitor) redirect("/aiuvl/login");

  const isCandidato = !!candidatura;
  const statusAtual = candidatura?.status ?? eleitor?.status ?? "EM_ANALISE";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Minha Inscrição</h1>
          <p className="text-muted-foreground text-sm">
            Inscrito em {format(
              (candidatura?.criadoEm ?? eleitor?.criadoEm)!,
              "dd/MM/yyyy 'às' HH:mm",
              { locale: ptBR }
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <EnumBadge info={getInfo(TIPO_INSCRICAO_INFO, isCandidato ? "CANDIDATO" : "ELEITOR")} />
          <EnumBadge info={getInfo(STATUS_INFO, statusAtual)} />
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/aiuvl/portal/meus-arquivos">
              <FolderOpen className="w-4 h-4 mr-1.5" />
              Meus Arquivos
            </Link>
          </Button>
        </div>
      </div>

      {/* CANDIDATURA */}
      {isCandidato && candidatura && (
        <>
          {candidatura.organizacao && (
            <Card>
              <CardHeader><CardTitle className="text-base">Entidade Candidata</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Razão Social:</span> <span className="font-medium">{candidatura.organizacao.razaoSocial}</span></div>
                <div><span className="text-muted-foreground">CNPJ:</span> <span className="font-medium">{cnpjFormatado(candidatura.organizacao.cnpj)}</span></div>
                <div><span className="text-muted-foreground">Segmento:</span> <EnumBadge info={getInfo(SEGMENTO_AIUVL_INFO, candidatura.organizacao.segmento)} /></div>
                <div><span className="text-muted-foreground">Sede:</span> <span className="font-medium">{candidatura.organizacao.sede}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{candidatura.organizacao.emailEntidade}</span></div>
                {candidatura.organizacao.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{candidatura.organizacao.telefone}</span></div>
                )}
                <div><span className="text-muted-foreground">Representante Legal:</span> <span className="font-medium">{candidatura.organizacao.repNome}</span></div>
                <div><span className="text-muted-foreground">CPF do Representante:</span> <span className="font-medium">{cpfFormatado(candidatura.organizacao.repCpf)}</span></div>
                {candidatura.organizacao.repTituloEleitor && (
                  <div><span className="text-muted-foreground">Título de Eleitor (Rep.):</span> <span className="font-medium">{candidatura.organizacao.repTituloEleitor}</span></div>
                )}
                {candidatura.organizacao.repDomicilio && (
                  <div><span className="text-muted-foreground">Domicílio Eleitoral (Rep.):</span> <span className="font-medium">{candidatura.organizacao.repDomicilio}</span></div>
                )}
              </CardContent>
            </Card>
          )}

          {candidatura.candidatos.filter(c => c.tipoCandidato === "TITULAR").map((c) => (
            <Card key={c.id}>
              <CardHeader><CardTitle className="text-base">Candidato Titular</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{c.nome}</span></div>
                {c.nomeSocial && <div><span className="text-muted-foreground">Nome Social:</span> <span className="font-medium">{c.nomeSocial}</span></div>}
                <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(c.cpf)}</span></div>
                <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{formatDateBR(c.dataNascimento)}</span></div>
                <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{c.genero.toLowerCase()}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{c.email}</span></div>
                {c.telefone && <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{c.telefone}</span></div>}
                {c.tituloEleitor && <div><span className="text-muted-foreground">Título de Eleitor:</span> <span className="font-medium">{c.tituloEleitor}</span></div>}
              </CardContent>
            </Card>
          ))}

          {candidatura.candidatos.filter(c => c.tipoCandidato === "SUPLENTE").map((c) => (
            <Card key={c.id}>
              <CardHeader><CardTitle className="text-base">Candidato Suplente</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{c.nome}</span></div>
                {c.nomeSocial && <div><span className="text-muted-foreground">Nome Social:</span> <span className="font-medium">{c.nomeSocial}</span></div>}
                <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(c.cpf)}</span></div>
                <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{formatDateBR(c.dataNascimento)}</span></div>
                <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{c.genero.toLowerCase()}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{c.email}</span></div>
                {c.telefone && <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{c.telefone}</span></div>}
                {c.tituloEleitor && <div><span className="text-muted-foreground">Título de Eleitor:</span> <span className="font-medium">{c.tituloEleitor}</span></div>}
              </CardContent>
            </Card>
          ))}

          {candidatura.rodada === 2 && (
            <DocComplementarSection
              apiBase="/api/aiuvl/portal/doc-complementar"
              statusAtivador="INDEFERIDO"
              mensagem="Sua inscrição foi indeferida. Você pode enviar documentação complementar para reanálise dentro do prazo."
              linkOrientacao={process.env.NEXT_PUBLIC_LINK_DOC_COMPLEMENTAR_AIUVL}
            />
          )}

          <Card>
            <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
            <CardContent>
              {(() => {
                const titular  = candidatura.candidatos.find(c => c.tipoCandidato === "TITULAR");
                const suplente = candidatura.candidatos.find(c => c.tipoCandidato === "SUPLENTE");
                const grupos: { titulo: string; arquivos: typeof candidatura.arquivos }[] = [
                  { titulo: "Entidade Candidata",      arquivos: (candidatura.organizacao?.arquivos ?? []).filter(a => a.categoria !== "COMPLEMENTAR") },
                  { titulo: "Representante Legal",     arquivos: candidatura.arquivos.filter(a => a.categoria !== "COMPLEMENTAR") },
                  { titulo: "Candidato Titular",       arquivos: (titular?.arquivos  ?? []).filter(a => a.categoria !== "COMPLEMENTAR") },
                  { titulo: "Candidato Suplente",      arquivos: (suplente?.arquivos ?? []).filter(a => a.categoria !== "COMPLEMENTAR") },
                ].filter(g => g.arquivos.length > 0);

                if (grupos.length === 0) return <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>;

                return (
                  <div className="space-y-4">
                    {grupos.map(grupo => (
                      <div key={grupo.titulo}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{grupo.titulo}</p>
                        <ul className="space-y-1.5">
                          {grupo.arquivos.map(a => {
                            const label = CATEGORIA_LABEL[a.categoria] ?? a.nome;
                            const complementar = isAtualizadoNoComplementar(a.atualizadoEm, true, candidatura.rodada);
                            return (
                              <li key={a.id} className="flex items-center gap-2 text-sm rounded p-1.5 hover:bg-muted/40">
                                <FileIcon className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                                <span className="flex-1 truncate" title={a.nome}>{label}</span>
                                <span className="flex-shrink-0 text-muted-foreground text-xs">{format(a.atualizadoEm, "dd/MM/yyyy", { locale: ptBR })}</span>
                                {complementar && (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 flex-shrink-0">
                                    <RefreshCw className="w-3 h-3" />
                                    Atualizado no período complementar
                                  </span>
                                )}
                                <span className="flex-shrink-0 text-muted-foreground text-xs">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </>
      )}

      {/* ELEITOR */}
      {!isCandidato && eleitor && (
        <>
          {eleitor.organizacao && (
            <Card>
              <CardHeader><CardTitle className="text-base">Entidade Eleitora</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Razão Social:</span> <span className="font-medium">{eleitor.organizacao.razaoSocial}</span></div>
                <div><span className="text-muted-foreground">CNPJ:</span> <span className="font-medium">{cnpjFormatado(eleitor.organizacao.cnpj)}</span></div>
                <div><span className="text-muted-foreground">Segmento:</span> <EnumBadge info={getInfo(SEGMENTO_AIUVL_INFO, eleitor.organizacao.segmento)} /></div>
                <div><span className="text-muted-foreground">Segmento de Votação:</span> <EnumBadge info={getInfo(SEGMENTO_AIUVL_INFO, eleitor.organizacao.segmentoVotacao)} /></div>
                <div><span className="text-muted-foreground">Sede:</span> <span className="font-medium">{eleitor.organizacao.sede}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{eleitor.organizacao.emailEntidade}</span></div>
                {eleitor.organizacao.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{eleitor.organizacao.telefone}</span></div>
                )}
                <div><span className="text-muted-foreground">Representante Legal:</span> <span className="font-medium">{eleitor.organizacao.repNome}</span></div>
                <div><span className="text-muted-foreground">CPF do Representante:</span> <span className="font-medium">{cpfFormatado(eleitor.organizacao.repCpf)}</span></div>
                {eleitor.organizacao.repTituloEleitor && (
                  <div><span className="text-muted-foreground">Título de Eleitor (Rep.):</span> <span className="font-medium">{eleitor.organizacao.repTituloEleitor}</span></div>
                )}
                {eleitor.organizacao.repDomicilio && (
                  <div><span className="text-muted-foreground">Domicílio Eleitoral (Rep.):</span> <span className="font-medium">{eleitor.organizacao.repDomicilio}</span></div>
                )}
              </CardContent>
            </Card>
          )}

          <DocComplementarSection
            apiBase="/api/aiuvl/portal/doc-complementar"
            statusAtivador="INDEFERIDO"
            mensagem="Sua inscrição foi indeferida. Você pode enviar documentação complementar para reanálise dentro do prazo."
            linkOrientacao={process.env.NEXT_PUBLIC_LINK_DOC_COMPLEMENTAR_AIUVL}
          />

          <Card>
            <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
            <CardContent>
              {(() => {
                const grupos: { titulo: string; arquivos: typeof eleitor.arquivos }[] = [
                  { titulo: "Entidade Eleitora",   arquivos: (eleitor.organizacao?.arquivos ?? []).filter(a => a.categoria !== "COMPLEMENTAR") },
                  { titulo: "Representante Legal", arquivos: eleitor.arquivos.filter(a => a.categoria !== "COMPLEMENTAR") },
                ].filter(g => g.arquivos.length > 0);

                if (grupos.length === 0) return <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>;

                return (
                  <div className="space-y-4">
                    {grupos.map(grupo => (
                      <div key={grupo.titulo}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{grupo.titulo}</p>
                        <ul className="space-y-1.5">
                          {grupo.arquivos.map(a => {
                            const label = CATEGORIA_LABEL[a.categoria] ?? a.nome;
                            const complementar = isAtualizadoNoComplementar(a.atualizadoEm, false);
                            return (
                              <li key={a.id} className="flex items-center gap-2 text-sm rounded p-1.5 hover:bg-muted/40">
                                <FileIcon className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                                <span className="flex-1 truncate" title={a.nome}>{label}</span>
                                <span className="flex-shrink-0 text-muted-foreground text-xs">{format(a.atualizadoEm, "dd/MM/yyyy", { locale: ptBR })}</span>
                                {complementar && (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 flex-shrink-0">
                                    <RefreshCw className="w-3 h-3" />
                                    Atualizado no período complementar
                                  </span>
                                )}
                                <span className="flex-shrink-0 text-muted-foreground text-xs">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
