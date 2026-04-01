"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PortalLoginPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatarCpf = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      toast.error("Informe um CPF válido.");
      return;
    }
    if (!senha) {
      toast.error("Informe sua senha.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("credentials", { login: cpfLimpo, senha, redirect: false });
      if (result?.error) {
        toast.error("CPF ou senha incorretos. Verifique seus dados.");
        return;
      }
      router.push("/portal/minha-inscricao");
      router.refresh();
    } catch {
      toast.error("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700">OUCAB 2026</h1>
          <p className="text-muted-foreground text-sm">Portal do Inscrito</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Acessar o Portal</CardTitle>
            <CardDescription>
              Use o CPF e a senha enviados ao seu e-mail no momento da inscrição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatarCpf(e.target.value))}
                  maxLength={14}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Entrando...</>
                ) : (
                  <><LogIn className="w-4 h-4 mr-2" /> Entrar</>
                )}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Ainda não se inscreveu?{" "}
              <Link href="/inscricao" className="text-purple-700 hover:underline font-medium">
                Faça sua inscrição
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
