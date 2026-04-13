import { auth } from "@/auth";
import Link from "next/link";
import { LayoutDashboard, UserCircle } from "lucide-react";

export default async function UserTopbar() {
  const session = await auth();
  if (!session) return null;

  const isExterno = session.user?.tipo === "externo";
  const nome = session.user?.nome ?? session.user?.email ?? "";
  const href = isExterno ? "/portal/minha-inscricao" : "/usuarios";
  const label = isExterno ? "Área do Inscrito" : "Painel Administrativo";
  const Icon = isExterno ? UserCircle : LayoutDashboard;

  return (
    <div className="bg-purple-700 text-white text-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-between gap-2">
        <span className="truncate text-purple-200">
          Olá, <span className="font-medium text-white">{nome}</span>
        </span>
        <Link
          href={href}
          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors rounded px-3 py-1 font-medium whitespace-nowrap"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      </div>
    </div>
  );
}
