import { auth } from "@/auth/aiuvl";
import { redirect } from "next/navigation";
import { AuthProviderAiuvl } from "@/providers/AuthProviderAiuvl";
import { SignOutBtn } from "./_components/sign-out-btn";
import { FileText, Upload, KeyRound } from "lucide-react";
import { PortalNav } from "@/components/portal-nav";

const NAV_ITEMS = [
  { href: "/aiuvl/portal/minha-inscricao", label: "Minha Inscrição", icon: <FileText className="w-4 h-4" /> },
  { href: "/aiuvl/portal/meus-arquivos", label: "Meus Arquivos", icon: <Upload className="w-4 h-4" /> },
  { href: "/aiuvl/portal/alterar-senha", label: "Alterar Senha", icon: <KeyRound className="w-4 h-4" /> },
];

export default async function AiuvlPortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user?.tipo !== "externo") {
    redirect("/aiuvl/login");
  }

  const nome = session.user?.nome ?? "";

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-emerald-700 text-lg">AIU-VL 2026</span>
            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              Portal do Inscrito
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{nome}</span>
            <SignOutBtn />
          </div>
        </div>
      </header>

      <PortalNav items={NAV_ITEMS} signOutSlot={<SignOutBtn />} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AuthProviderAiuvl>{children}</AuthProviderAiuvl>
      </main>
    </div>
  );
}
