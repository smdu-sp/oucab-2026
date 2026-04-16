import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const ANEXOS = [
  { nome: "Anexo I — Requerimento de Inscrição (Candidatura)", arquivo: "anexo_I.pdf" },
  { nome: "Anexo II — Declaração de Atuação na Área da AIUSCE", arquivo: "anexo_II.pdf" },
  { nome: "Anexo III — Declaração de Hipóteses de Inelegibilidade", arquivo: "anexo_III.pdf" },
  { nome: "Anexo IV — Declaração de Idoneidade", arquivo: "anexo_IV.pdf" },
  { nome: "Anexo V — Requerimento de Procurador", arquivo: "anexo_V.pdf" },
  { nome: "Anexo VI — Requerimento de Inscrição (Eleitora)", arquivo: "anexo_VI.pdf" },
];

export default function EditalAiusce001Page() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Edital Nº 001/2026 — SPURBANISMO/AIUSCE</h1>
        <p className="text-muted-foreground mt-1">Documentos e anexos para download</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Edital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="/aiusce/editais/Edital 001_2026_SPURBANISMO_AIUSCE 1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="flex-1 font-medium">Edital Nº 001/2026 — SPURBANISMO/AIUSCE</span>
            <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Anexos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {ANEXOS.map(({ nome, arquivo }) => (
            <a
              key={arquivo}
              href={`/aiusce/editais/anexos/${arquivo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted transition-colors"
            >
              <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="flex-1 font-medium">{nome}</span>
              <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
