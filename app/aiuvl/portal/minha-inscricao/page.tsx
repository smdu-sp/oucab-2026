import { auth } from "@/auth/aiuvl";
import { dbAiuvl as db } from "@/lib/prisma-aiuvl";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, SEGMENTO_AIUVL_INFO, TIPO_INSCRICAO_INFO, TIPO_CANDIDATO_INFO, getInfo } from "@/lib/labels";

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
      candidatura: {
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

  const candidatura = usuario.candidatura;
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
        <div className="flex gap-2 flex-wrap">
          <EnumBadge info={getInfo(TIPO_INSCRICAO_INFO, isCandidato ? "CANDIDATO" : "ELEITOR")} />
          <EnumBadge info={getInfo(STATUS_INFO, statusAtual)} />
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

          <Card>
            <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
            <CardContent>
              {(candidatura.arquivos.length + (candidatura.organizacao?.arquivos.length ?? 0) + candidatura.candidatos.flatMap(c => c.arquivos).length) === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {candidatura.organizacao?.arquivos.map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.nome}</span>
                      <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                  {candidatura.arquivos.map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.nome}</span>
                      <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                  {candidatura.candidatos.flatMap(c => c.arquivos).map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.nome}</span>
                      <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                </ul>
              )}
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

          <Card>
            <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
            <CardContent>
              {(eleitor.arquivos.length + (eleitor.organizacao?.arquivos.length ?? 0)) === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {eleitor.organizacao?.arquivos.map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.nome}</span>
                      <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                  {eleitor.arquivos.map((a) => (
                    <li key={a.id} className="flex items-center justify-between">
                      <span>{a.nome}</span>
                      <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
