"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, KeyRound, Info } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { BASE_PATH } from "@/lib/config";

export default function AlterarSenhaPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const primeiroAcesso = (session?.user as any)?.primeiroAcesso;

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSenha.length < 8) {
      toast.error("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      toast.error("As senhas não conferem.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/portal/alterar-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao alterar senha");

      await update({ primeiroAcesso: false });
      toast.success("Senha alterada com sucesso!");
      router.push("/portal/minha-inscricao");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao alterar senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Alterar Senha</h1>
        <p className="text-muted-foreground text-sm">Defina uma senha pessoal para o portal.</p>
      </div>

      {primeiroAcesso && (
        <Alert>
          <Info className="w-4 h-4" />
          <AlertDescription>
            Este é seu primeiro acesso. Por segurança, crie uma nova senha antes de continuar.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <KeyRound className="w-4 h-4" /> Nova Senha
          </CardTitle>
          <CardDescription>A nova senha deve ter no mínimo 8 caracteres.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senhaAtual">Senha Atual</Label>
              <Input
                id="senhaAtual"
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Senha enviada por e-mail"
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="novaSenha">Nova Senha</Label>
              <Input
                id="novaSenha"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmar">Confirmar Nova Senha</Label>
              <Input
                id="confirmar"
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
              ) : (
                "Salvar Nova Senha"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
