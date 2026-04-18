"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Props {
  /** ISO string capturado no servidor no momento do render */
  serverTimeISO: string;
  /** Offset do fuso do servidor em minutos (ex: -180 para UTC-3) */
  serverTzOffsetMinutes: number;
  /** ISO string do prazo de inscrição OUCAB */
  prazoISO: string;
  /** ISO string do prazo de inscrição AIUSCE */
  prazoAiusceISO: string;
}

/**
 * Formata uma data aplicando manualmente um offset fixo em minutos,
 * sem qualquer conversão de fuso via Intl/toLocaleString.
 */
function formatComOffset(date: Date, offsetMinutes: number): string {
  const local = new Date(date.getTime() + offsetMinutes * 60_000);
  const dd = local.getUTCDate().toString().padStart(2, "0");
  const mm = (local.getUTCMonth() + 1).toString().padStart(2, "0");
  const yyyy = local.getUTCFullYear();
  const hh = local.getUTCHours().toString().padStart(2, "0");
  const min = local.getUTCMinutes().toString().padStart(2, "0");
  const ss = local.getUTCSeconds().toString().padStart(2, "0");
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absMin = Math.abs(offsetMinutes);
  const oh = Math.floor(absMin / 60).toString().padStart(2, "0");
  const om = (absMin % 60).toString().padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss} (UTC${sign}${oh}:${om})`;
}

export default function RelogioServidor({
  serverTimeISO,
  serverTzOffsetMinutes,
  prazoISO,
  prazoAiusceISO,
}: Props) {
  const [delta] = useState(() => new Date(serverTimeISO).getTime() - Date.now());
  const [agora, setAgora] = useState(() => new Date(Date.now() + delta));

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date(Date.now() + delta)), 1000);
    return () => clearInterval(id);
  }, [delta]);

  const prazo = new Date(prazoISO);
  const prazoAiusce = new Date(prazoAiusceISO);
  const inscricoesAbertas = agora < prazo;
  const aiusceAberta = agora < prazoAiusce;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg shadow-lg p-3 text-xs space-y-1 min-w-[240px] opacity-90 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
        <Clock className="w-3.5 h-3.5" />
        Horário do Servidor
      </div>
      <div className="font-mono text-sm font-bold tabular-nums">
        {formatComOffset(agora, serverTzOffsetMinutes)}
      </div>
      <div className="border-t pt-1 space-y-0.5 text-muted-foreground">
        <div className="flex justify-between gap-3">
          <span>Prazo OUCAB:</span>
          <span className={inscricoesAbertas ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {inscricoesAbertas ? "aberto" : "encerrado"}
          </span>
        </div>
        <div className="font-mono text-[10px]">
          {formatComOffset(prazo, serverTzOffsetMinutes)}
        </div>
        <div className="flex justify-between gap-3 pt-0.5">
          <span>Prazo AIUSCE:</span>
          <span className={aiusceAberta ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {aiusceAberta ? "aberto" : "encerrado"}
          </span>
        </div>
        <div className="font-mono text-[10px]">
          {formatComOffset(prazoAiusce, serverTzOffsetMinutes)}
        </div>
      </div>
    </div>
  );
}
