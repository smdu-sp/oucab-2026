import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const ANEXOS = [
  { nome: "Anexo I — Requerimento de Inscrição", arquivo: "anexo1.docx" },
  { nome: "Anexo II — Declaração de Atuação na Região", arquivo: "anexo2.docx" },
  { nome: "Anexo III — Declaração do Candidato(a)", arquivo: "anexo3.docx" },
  { nome: "Anexo IV — Declaração de Apresentação de Recurso", arquivo: "anexo4.docx" },
  { nome: "Anexo V — Declaração de Idoneidade da Entidade", arquivo: "anexo5.docx" },
  { nome: "Anexo VI — Requerimento do Representante Legal como Eleitor", arquivo: "anexo6.docx" },
  { nome: "Anexo VII — Cronograma", arquivo: "anexo7.docx" },
];

export default function EditalAiuvl001Page() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Edital de Eleição AIU-VL — 2026</h1>
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
            href="/aiuvl/editais/Edital de Eleição AIU-VL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="flex-1 font-medium">Edital de Eleição AIU-VL — Biênio 2026-2028</span>
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
              href={`/aiuvl/editais/anexos/${encodeURIComponent(arquivo)}`}
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
