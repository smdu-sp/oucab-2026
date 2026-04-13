import { BASE_PATH } from "@/lib/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

const ANEXOS = [
  { nome: "Anexo I", arquivo: "I.pdf" },
  { nome: "Anexo II", arquivo: "II.pdf" },
  { nome: "Anexo III", arquivo: "III.pdf" },
  { nome: "Anexo IV", arquivo: "IV.pdf" },
  { nome: "Anexo V", arquivo: "V.pdf" },
  { nome: "Anexo VI", arquivo: "VI.pdf" },
  { nome: "Anexo VII", arquivo: "VII.pdf" },
];

export default function Edital002Page() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Edital Nº 002/2026 — SMUL/OUCAB</h1>
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
            href={`${BASE_PATH}/editais/Edital_N__002_2026_SMUL_OUCAB.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="flex-1 font-medium">Edital Nº 002/2026 — SMUL/OUCAB</span>
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
              href={`${BASE_PATH}/editais/anexos/2/${arquivo}`}
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
