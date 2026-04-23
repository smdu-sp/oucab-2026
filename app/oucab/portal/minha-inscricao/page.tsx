import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDateBR } from "@/lib/utils";
import DocComplementarSection from "@/components/doc-complementar-section";
import { EnumBadge } from "@/components/enum-badge";
import { STATUS_INFO, TIPO_INSCRICAO_INFO, TIPO_CADASTRO_INFO, getInfo } from "@/lib/labels";

export default async function MinhaInscricaoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/oucab/login");

  const candidatura = await db.candidatura.findUnique({
    where: { usuarioId: session.user.id as string },
    include: {
      usuario: true,
      candidatos: true,
      endereco: true,
      arquivos: true,
      organizacao: { include: { arquivos: true } },
    },
  });

  if (!candidatura) redirect("/oucab/login");

  const candidato = candidatura.candidatos.find((c) => c.tipoCandidato === "INDIVIDUAL");
  const titular = candidatura.candidatos.find((c) => c.tipoCandidato === "TITULAR");
  const suplente = candidatura.candidatos.find((c) => c.tipoCandidato === "SUPLENTE");

  const cpfFormatado = (cpf: string) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const cepFormatado = candidatura.endereco?.cep.replace(/(\d{5})(\d{3})/, "$1-$2") ?? "";

  const isRep = ["REP_MORADIA", "REP_ONGS", "REP_PROFISSIONAIS", "REP_EMPRESARIAIS"].includes(
    candidatura.tipoInscricao
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Minha Inscrição</h1>
          <p className="text-muted-foreground text-sm">
            Inscrito em {format(candidatura.criadoEm, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <EnumBadge info={getInfo(TIPO_CADASTRO_INFO, candidatura.tipoCadastro)} />
          <EnumBadge info={getInfo(TIPO_INSCRICAO_INFO, candidatura.tipoInscricao)} />
          <EnumBadge info={getInfo(STATUS_INFO, candidatura.status)} />
        </div>
      </div>

      {!isRep && candidato && (
        <Card>
          <CardHeader><CardTitle className="text-base">Dados Pessoais</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{candidatura.usuario?.nome}</span></div>
            {candidato.nomeSocial && (
              <div><span className="text-muted-foreground">Nome Social:</span> <span className="font-medium">{candidato.nomeSocial}</span></div>
            )}
            <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(candidato.cpf)}</span></div>
            <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{formatDateBR(candidato.dataNascimento)}</span></div>
            <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{candidato.genero.toLowerCase()}</span></div>
            <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{candidatura.usuario?.email}</span></div>
            {candidato.telefone && (
              <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{candidato.telefone}</span></div>
            )}
            {candidato.nomeEmpresa && (
              <div><span className="text-muted-foreground">Empresa:</span> <span className="font-medium">{candidato.nomeEmpresa}</span></div>
            )}
          </CardContent>
        </Card>
      )}

      {isRep && (
        <>
          {candidatura.organizacao && (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Organização</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Razão Social:</span> <span className="font-medium">{candidatura.organizacao.razaoSocial}</span></div>
                  <div><span className="text-muted-foreground">CNPJ:</span> <span className="font-medium">{candidatura.organizacao.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</span></div>
                  <div><span className="text-muted-foreground">Inscrição de Chapa:</span> <span className="font-medium">{candidatura.organizacao.formaChapa ? "Sim" : "Não"}</span></div>
                  {candidatura.organizacao.formaChapa && candidatura.organizacao.chapaCNPJ && (
                    <div><span className="text-muted-foreground">CNPJ da 2ª Entidade:</span> <span className="font-medium">{candidatura.organizacao.chapaCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</span></div>
                  )}
                  {candidatura.organizacao.formaChapa && candidatura.organizacao.chapaRazaoSocial && (
                    <div className="sm:col-span-2"><span className="text-muted-foreground">Razão Social da 2ª Entidade:</span> <span className="font-medium">{candidatura.organizacao.chapaRazaoSocial}</span></div>
                  )}
                </CardContent>
              </Card>

              {candidatura.organizacao.formaChapa && candidatura.organizacao.chapaLogradouro && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Endereço da 2ª Entidade</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Logradouro:</span>{" "}
                      <span className="font-medium">
                        {candidatura.organizacao.chapaLogradouro}
                        {candidatura.organizacao.chapaNumero ? `, ${candidatura.organizacao.chapaNumero}` : ""}
                      </span>
                    </div>
                    {candidatura.organizacao.chapaComplemento && (
                      <div><span className="text-muted-foreground">Complemento:</span> <span className="font-medium">{candidatura.organizacao.chapaComplemento}</span></div>
                    )}
                    <div><span className="text-muted-foreground">Bairro:</span> <span className="font-medium">{candidatura.organizacao.chapaBairro}</span></div>
                    <div><span className="text-muted-foreground">Cidade/UF:</span> <span className="font-medium">{candidatura.organizacao.chapaCidade} — {candidatura.organizacao.chapaEstado}</span></div>
                    {candidatura.organizacao.chapaCep && (
                      <div><span className="text-muted-foreground">CEP:</span> <span className="font-medium">{candidatura.organizacao.chapaCep.replace(/(\d{5})(\d{3})/, "$1-$2")}</span></div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
          {titular && (
            <Card>
              <CardHeader><CardTitle className="text-base">Candidato Titular</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{titular.nome}</span></div>
                <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(titular.cpf)}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{titular.email}</span></div>
                {titular.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{titular.telefone}</span></div>
                )}
              </CardContent>
            </Card>
          )}
          {suplente && (
            <Card>
              <CardHeader><CardTitle className="text-base">Candidato Suplente</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{suplente.nome}</span></div>
                <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado(suplente.cpf)}</span></div>
                <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{suplente.email}</span></div>
                {suplente.telefone && (
                  <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{suplente.telefone}</span></div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {candidatura.endereco && (
        <Card>
          <CardHeader><CardTitle className="text-base">Endereço</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Logradouro:</span>{" "}
              <span className="font-medium">
                {candidatura.endereco.logradouro}
                {candidatura.endereco.numero ? `, ${candidatura.endereco.numero}` : ""}
              </span>
            </div>
            {candidatura.endereco.complemento && (
              <div><span className="text-muted-foreground">Complemento:</span> <span className="font-medium">{candidatura.endereco.complemento}</span></div>
            )}
            <div><span className="text-muted-foreground">Bairro:</span> <span className="font-medium">{candidatura.endereco.bairro}</span></div>
            <div><span className="text-muted-foreground">Cidade/UF:</span> <span className="font-medium">{candidatura.endereco.cidade} — {candidatura.endereco.estado}</span></div>
            <div><span className="text-muted-foreground">CEP:</span> <span className="font-medium">{cepFormatado}</span></div>
          </CardContent>
        </Card>
      )}

      <DocComplementarSection
        apiBase="/api/portal/doc-complementar"
        linkOrientacao={process.env.NEXT_PUBLIC_LINK_DOC_COMPLEMENTAR_OUCAB}
      />

      <Card>
        <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
        <CardContent>
          {candidatura.arquivos.length === 0 && (!candidatura.organizacao?.arquivos?.length) ? (
            <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>
          ) : (
            <ul className="space-y-2">
              {candidatura.arquivos.map((a) => (
                <li key={a.id} className="flex items-center justify-between text-sm">
                  <span>{a.nome}</span>
                  <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
              {candidatura.organizacao?.arquivos?.map((a) => (
                <li key={a.id} className="flex items-center justify-between text-sm">
                  <span>{a.nome}</span>
                  <span className="text-muted-foreground">{(a.tamanho / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
