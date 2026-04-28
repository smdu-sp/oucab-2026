import { auth } from "@/auth/aiusce";
import { redirect } from "next/navigation";
import { AuthProviderAiusce } from "@/providers/AuthProviderAiusce";
import { SignOutBtn } from "./_components/sign-out-btn";
import Link from "next/link";
import { FileText, Upload, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user?.tipo !== "externo") {
    redirect("/aiusce/login");
  }

  const nome = session.user?.nome ?? "";
  const tipoCadastro = session.user?.tipoCadastro as string;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-purple-700 text-lg">AIUSCE 2026</span>
            <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              Portal do Inscrito
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {nome} · <span className="capitalize">{tipoCadastro?.toLowerCase()}</span>
            </span>
            <SignOutBtn />
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 py-1">
          <Link href="/aiusce/portal/minha-inscricao">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <FileText className="w-4 h-4" /> Minha Inscrição
            </Button>
          </Link>
          <Link href="/aiusce/portal/meus-arquivos">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Upload className="w-4 h-4" /> Meus Arquivos
            </Button>
          </Link>
          <Link href="/aiusce/portal/alterar-senha">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <KeyRound className="w-4 h-4" /> Alterar Senha
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AuthProviderAiusce>{children}</AuthProviderAiusce>
      </main>
    </div>
  );
}
