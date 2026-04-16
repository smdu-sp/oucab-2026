import { auth } from "@/auth/aiusce";
import { dbAiusce as db } from "@/lib/prisma-aiusce";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusLabel: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  EM_ANALISE: { label: "Em Análise", variant: "secondary" },
  DEFERIDO: { label: "Deferido", variant: "default" },
  INDEFERIDO: { label: "Indeferido", variant: "destructive" },
};

const segmentoLabel: Record<string, string> = {
  ONG_CULTURAL: "ONG Cultural",
  ENTIDADE_URB_AMB: "Entidade profissional, acadêmica ou de pesquisa",
};

function cnpjFormatado(cnpj: string) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
function cpfFormatado(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default async function MinhaInscricaoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/aiusce/login");

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
          procurador: true,
          arquivos: true,
        },
      },
    },
  });

  if (!usuario) redirect("/aiusce/login");

  const candidatura = usuario.candidatura;
  const eleitor = usuario.eleitor;

  if (!candidatura && !eleitor) redirect("/aiusce/login");

  const isCandidato = !!candidatura;
  const { label: statusLbl, variant } = statusLabel[
    (candidatura?.status ?? eleitor?.status ?? "EM_ANALISE")
  ] ?? { label: "Em Análise", variant: "secondary" };

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
          <Badge variant="outline">
            {isCandidato ? "Candidato" : "Eleitor"}
          </Badge>
          <Badge variant={variant}>{statusLbl}</Badge>
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
                <div><span className="text-muted-foreground">Segmento:</span> <span className="font-medium">{segmentoLabel[candidatura.organizacao.segmento]}</span></div>
                <div><span className="text-muted-foreground">Sede:</span> <span className="font-medium">{candidatura.organizacao.sede}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{candidatura.organizacao.emailEntidade}</span></div>
                {candidatura.organizacao.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{candidatura.organizacao.telefone}</span></div>
                )}
                <div><span className="text-muted-foreground">Representante Legal:</span> <span className="font-medium">{candidatura.organizacao.repNome}</span></div>
                <div><span className="text-muted-foreground">CPF do Representante:</span> <span className="font-medium">{cpfFormatado(candidatura.organizacao.repCpf)}</span></div>
                <div><span className="text-muted-foreground">Forma Chapa:</span> <span className="font-medium">{candidatura.organizacao.formaChapa ? "Sim" : "Não"}</span></div>
                {candidatura.organizacao.cnpjChapa && (
                  <div><span className="text-muted-foreground">CNPJ da Chapa:</span> <span className="font-medium">{cnpjFormatado(candidatura.organizacao.cnpjChapa)}</span></div>
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
                <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{format(c.dataNascimento, "dd/MM/yyyy")}</span></div>
                <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{c.genero.toLowerCase()}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{c.email}</span></div>
                {c.telefone && <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{c.telefone}</span></div>}
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
                <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{format(c.dataNascimento, "dd/MM/yyyy")}</span></div>
                <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{c.genero.toLowerCase()}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{c.email}</span></div>
                {c.telefone && <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{c.telefone}</span></div>}
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
                  {candidatura.candidatos.flatMap(c => c.arquivos).map((a) => (
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
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* ELEITORA */}
      {!isCandidato && eleitor && (
        <>
          {eleitor.organizacao && (
            <Card>
              <CardHeader><CardTitle className="text-base">Entidade Eleitora</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Razão Social:</span> <span className="font-medium">{eleitor.organizacao.razaoSocial}</span></div>
                <div><span className="text-muted-foreground">CNPJ:</span> <span className="font-medium">{cnpjFormatado(eleitor.organizacao.cnpj)}</span></div>
                <div><span className="text-muted-foreground">Segmento:</span> <span className="font-medium">{segmentoLabel[eleitor.organizacao.segmento]}</span></div>
                <div><span className="text-muted-foreground">Sede:</span> <span className="font-medium">{eleitor.organizacao.sede}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{eleitor.organizacao.emailEntidade}</span></div>
                {eleitor.organizacao.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{eleitor.organizacao.telefone}</span></div>
                )}
                <div><span className="text-muted-foreground">Representante Legal:</span> <span className="font-medium">{eleitor.organizacao.repNome}</span></div>
                <div><span className="text-muted-foreground">CPF do Representante:</span> <span className="font-medium">{cpfFormatado(eleitor.organizacao.repCpf)}</span></div>
              </CardContent>
            </Card>
          )}

          {eleitor.procurador && (
            <Card>
              <CardHeader><CardTitle className="text-base">Procurador</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{eleitor.procurador.nome}</span></div>
                <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(eleitor.procurador.cpf)}</span></div>
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
