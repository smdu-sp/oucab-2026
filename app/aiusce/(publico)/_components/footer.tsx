import Link from "next/link";
import { LogIn } from "lucide-react";

export default function FooterAiusce() {
  return (
    <footer className="border-t bg-muted/40 mt-4">
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} Prefeitura de São Paulo — SMUL/AIUSCE
        </p>
        <Link
          href="/aiusce/login"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Área de Login
        </Link>
      </div>
    </footer>
  );
}
