"use client";

import { useState } from "react";

export type EmailTemplate = {
  id: string;
  grupo: string;
  label: string;
  subject: string;
  html: string;
  text: string;
};

export default function EmailPreviewClient({ templates }: { templates: EmailTemplate[] }) {
  const [selectedId, setSelectedId] = useState(templates[0]?.id ?? "");
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const selected = templates.find((t) => t.id === selectedId);
  const grupos = [...new Set(templates.map((t) => t.grupo))];

  async function handleSend() {
    if (!selected || !testEmail) return;
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/dev/email-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: testEmail, subject: selected.subject, html: selected.html, text: selected.text }),
      });
      const data = await res.json();
      if (res.ok) setMsg({ type: "ok", text: "E-mail enviado com sucesso!" });
      else setMsg({ type: "err", text: data.error ?? "Erro ao enviar." });
    } catch {
      setMsg({ type: "err", text: "Erro de rede." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r overflow-y-auto p-3 space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Modelos</p>
        {grupos.map((grupo) => (
          <div key={grupo}>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-1">
              {grupo}
            </p>
            <div className="space-y-0.5">
              {templates
                .filter((t) => t.grupo === grupo)
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedId(t.id); setMsg(null); }}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                      selectedId === t.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b bg-muted/30 shrink-0">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{selected?.label}</p>
            <p className="text-xs text-muted-foreground truncate">
              Assunto: {selected?.subject}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="email@teste.com"
              className="text-sm border rounded-md px-3 py-1.5 w-52 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={sending || !testEmail.trim()}
              className="text-sm px-4 py-1.5 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {sending ? "Enviando…" : "Enviar teste"}
            </button>
          </div>
          {msg && (
            <span className={`text-xs font-medium ${msg.type === "ok" ? "text-green-600" : "text-red-500"}`}>
              {msg.text}
            </span>
          )}
        </div>

        {/* Preview iframe */}
        <iframe
          key={selectedId}
          srcDoc={selected?.html ?? ""}
          title="Pré-visualização do e-mail"
          className="flex-1 w-full border-0"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
