import { redirect } from "next/navigation";
import FormularioInscricaoAiuvl from "./_components/formulario-inscricao";
import {
  periodoInscricaoCandidatosAiuvlAberto,
  periodoInscricaoEleitoresAiuvlAberto,
  periodoReinscricaoCandidatosAiuvlAberto,
  AIUVL_REABERTURA_SEGMENTOS,
} from "@/lib/config";

export default async function InscricaoAiuvlPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const candidatosVisivel = periodoInscricaoCandidatosAiuvlAberto();
  const eleitoresVisivel = periodoInscricaoEleitoresAiuvlAberto();
  const reinscricaoVisivel = periodoReinscricaoCandidatosAiuvlAberto();

  if (!candidatosVisivel && !eleitoresVisivel && !reinscricaoVisivel) {
    redirect("/aiuvl");
  }

  const { tipo } = await searchParams;

  const candidatosOuReinscricao = candidatosVisivel || reinscricaoVisivel;

  let tipoInicial: "CANDIDATO" | "ELEITOR" | undefined;
  if (candidatosOuReinscricao && !eleitoresVisivel) {
    tipoInicial = "CANDIDATO";
  } else if (eleitoresVisivel && !candidatosOuReinscricao) {
    tipoInicial = "ELEITOR";
  } else if (reinscricaoVisivel && !candidatosVisivel) {
    // Reabertura is only for CANDIDATO; when eleitores is also open simultaneously,
    // prefer CANDIDATO unless the user explicitly arrived via the eleitores button.
    tipoInicial = tipo === "ELEITOR" ? "ELEITOR" : "CANDIDATO";
  } else {
    tipoInicial = tipo === "CANDIDATO" || tipo === "ELEITOR" ? tipo : undefined;
  }

  const segmentosHabilitados = reinscricaoVisivel && !candidatosVisivel ? AIUVL_REABERTURA_SEGMENTOS : undefined;

  return <FormularioInscricaoAiuvl tipoInicial={tipoInicial} segmentosHabilitados={segmentosHabilitados} />;
}
