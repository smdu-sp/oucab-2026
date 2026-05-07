import { redirect } from "next/navigation";
import FormularioInscricaoAiuvl from "./_components/formulario-inscricao";
import {
  periodoInscricaoCandidatosAiuvlAberto,
  periodoInscricaoEleitoresAiuvlAberto,
} from "@/lib/config";

export default async function InscricaoAiuvlPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const candidatosVisivel = periodoInscricaoCandidatosAiuvlAberto();
  const eleitoresVisivel = periodoInscricaoEleitoresAiuvlAberto();

  if (!candidatosVisivel && !eleitoresVisivel) {
    redirect("/aiuvl");
  }

  const { tipo } = await searchParams;

  let tipoInicial: "CANDIDATO" | "ELEITOR" | undefined;
  if (candidatosVisivel && !eleitoresVisivel) {
    tipoInicial = "CANDIDATO";
  } else if (eleitoresVisivel && !candidatosVisivel) {
    tipoInicial = "ELEITOR";
  } else {
    // Ambos visíveis: respeita query param ou deixa o usuário escolher
    tipoInicial = tipo === "CANDIDATO" || tipo === "ELEITOR" ? tipo : undefined;
  }

  return <FormularioInscricaoAiuvl tipoInicial={tipoInicial} />;
}
