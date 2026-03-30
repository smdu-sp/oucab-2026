import { auth } from "@/auth";
import { db } from "@/lib/prisma";
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

export default async function MinhaInscricaoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/portal/login");

  const votante = await db.votante.findUnique({
    where: { id: session.user.id as string },
    include: { usuario: true, endereco: true, arquivos: true },
  });

  if (!votante) redirect("/portal/login");

  const cpfFormatado = votante.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const cepFormatado = votante.endereco?.cep.replace(/(\d{5})(\d{3})/, "$1-$2") ?? "";
  const { label: statusLbl, variant } = statusLabel[votante.status] ?? { label: votante.status, variant: "secondary" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Minha Inscrição</h1>
          <p className="text-muted-foreground text-sm">
            Inscrito em {format(votante.criadoEm, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{votante.tipoCadastro === "CANDIDATO" ? "Candidato(a)" : "Eleitor(a)"}</Badge>
          <Badge variant="outline">{votante.tipoInscricao === "TRABALHADOR" ? "Trabalhador(a)" : "Morador(a)"}</Badge>
          <Badge variant={variant}>{statusLbl}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Nome:</span> <span className="font-medium">{votante.usuario?.nome}</span></div>
          {votante.nomeSocial && <div><span className="text-muted-foreground">Nome Social:</span> <span className="font-medium">{votante.nomeSocial}</span></div>}
          <div><span className="text-muted-foreground">CPF:</span> <span className="font-medium">{cpfFormatado}</span></div>
          <div><span className="text-muted-foreground">Data de Nascimento:</span> <span className="font-medium">{format(votante.dataNascimento, "dd/MM/yyyy")}</span></div>
          <div><span className="text-muted-foreground">Gênero:</span> <span className="font-medium capitalize">{votante.genero.toLowerCase()}</span></div>
          <div><span className="text-muted-foreground">E-mail:</span> <span className="font-medium">{votante.usuario?.email}</span></div>
          {votante.telefone && <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{votante.telefone}</span></div>}
          {votante.empresa && <div><span className="text-muted-foreground">Empresa:</span> <span className="font-medium">{votante.empresa}</span></div>}
        </CardContent>
      </Card>

      {votante.endereco && (
        <Card>
          <CardHeader><CardTitle className="text-base">Endereço</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Logradouro:</span> <span className="font-medium">{votante.endereco.logradouro}{votante.endereco.numero ? `, ${votante.endereco.numero}` : ""}</span></div>
            {votante.endereco.complemento && <div><span className="text-muted-foreground">Complemento:</span> <span className="font-medium">{votante.endereco.complemento}</span></div>}
            <div><span className="text-muted-foreground">Bairro:</span> <span className="font-medium">{votante.endereco.bairro}</span></div>
            <div><span className="text-muted-foreground">Cidade/UF:</span> <span className="font-medium">{votante.endereco.cidade} — {votante.endereco.estado}</span></div>
            <div><span className="text-muted-foreground">CEP:</span> <span className="font-medium">{cepFormatado}</span></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">Documentos Enviados</CardTitle></CardHeader>
        <CardContent>
          {votante.arquivos.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum arquivo enviado.</p>
          ) : (
            <ul className="space-y-2">
              {votante.arquivos.map((a) => (
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
