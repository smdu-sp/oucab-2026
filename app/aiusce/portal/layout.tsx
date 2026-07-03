import { auth } from "@/auth/aiusce";
import { redirect } from "next/navigation";
import { AuthProviderAiusce } from "@/providers/AuthProviderAiusce";
import { SignOutBtn } from "./_components/sign-out-btn";
import { FileText, Upload, KeyRound } from "lucide-react";
import { PortalNav } from "@/components/portal-nav";

const NAV_ITEMS = [
  { href: "/aiusce/portal/minha-inscricao", label: "Minha Inscrição", icon: <FileText className="w-4 h-4" /> },
  { href: "/aiusce/portal/meus-arquivos", label: "Meus Arquivos", icon: <Upload className="w-4 h-4" /> },
  { href: "/aiusce/portal/alterar-senha", label: "Alterar Senha", icon: <KeyRound className="w-4 h-4" /> },
];

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

      <PortalNav items={NAV_ITEMS} signOutSlot={<SignOutBtn />} />

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AuthProviderAiusce>{children}</AuthProviderAiusce>
      </main>
    </div>
  );
}
