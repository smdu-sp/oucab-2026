"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Minus, ChevronUp } from "lucide-react";

interface Props {
  serverTimeISO: string;
  serverTzOffsetMinutes: number;
  prazoISO: string;
  prazoAiusceISO: string;
}

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
  const [minimizado, setMinimizado] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date(Date.now() + delta)), 1000);
    return () => clearInterval(id);
  }, [delta]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    }
    function onMouseUp() { dragging.current = false; }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function onDragStart(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    // Ao iniciar o drag, converte posição bottom/right para top/left
    if (!pos) setPos({ x: rect.left, y: rect.top });
    dragging.current = true;
    e.preventDefault();
  }

  const prazo = new Date(prazoISO);
  const prazoAiusce = new Date(prazoAiusceISO);
  const inscricoesAbertas = agora < prazo;
  const aiusceAberta = agora < prazoAiusce;

  const posStyle = pos
    ? { top: pos.y, left: pos.x, bottom: "auto", right: "auto" }
    : { bottom: "1rem", right: "1rem" };

  return (
    <div
      ref={cardRef}
      style={posStyle}
      className="fixed z-50 bg-background border rounded-lg shadow-lg text-xs min-w-[240px] opacity-90 hover:opacity-100 transition-opacity select-none"
    >
      {/* Cabeçalho — área de drag */}
      <div
        onMouseDown={onDragStart}
        className="flex items-center justify-between gap-1.5 px-3 py-2 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-1.5 font-semibold text-sm text-foreground">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          Horário do Servidor
        </div>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setMinimizado((v) => !v)}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
          title={minimizado ? "Expandir" : "Minimizar"}
        >
          {minimizado ? <ChevronUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Conteúdo recolhível */}
      {!minimizado && (
        <div className="px-3 pb-3 space-y-1">
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
      )}
    </div>
  );
}
