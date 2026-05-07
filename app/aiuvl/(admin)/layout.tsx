import { AppSidebarAiuvl } from "@/components/sidebar/app-sidebar-aiuvl";
import Breadcrumbs from "@/components/breadcrumbs";
import { ModeToggle } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/auth/aiuvl";
import { redirect } from "next/navigation";
import RelogioServidor from "@/components/relogio-servidor";
import {
  PRAZO_INSCRICAO,
  PRAZO_INSCRICAO_AIUSCE,
  INICIO_INSCRICAO_AIUVL_CANDIDATOS,
  PRAZO_INSCRICAO_AIUVL_CANDIDATOS,
  INICIO_INSCRICAO_AIUVL_ELEITORES,
  PRAZO_INSCRICAO_AIUVL_ELEITORES,
} from "@/lib/config";

export default async function AiuvlAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/aiuvl/login");

  const isAdmin =
    session.user?.permissao &&
    ["DEV", "ADM"].includes(session.user.permissao.toString());
  if (!isAdmin) redirect("/aiuvl/login");

  const isDev = session.user?.permissao?.toString() === "DEV";

  return (
    <div className="relative w-full bg-muted/50 dark:bg-background">
      <ModeToggle className="absolute top-4 right-4 z-50" />
      <SidebarProvider>
        <AppSidebarAiuvl />
        <SidebarInset>
          <header className="h-16 bg-muted/50 dark:bg-background shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 flex">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 md:hidden" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 md:ml-[-16px]"
              />
              <Breadcrumbs />
            </div>
          </header>
          <div className="h-full gap-4 p-4 sm:pt-0 items-center w-full bg-muted/50 dark:bg-background pt-10">
            {children}
          </div>
          {isDev && (() => {
            const now = new Date();
            return (
              <RelogioServidor
                serverTimeISO={now.toISOString()}
                serverTzOffsetMinutes={-now.getTimezoneOffset()}
                prazoISO={PRAZO_INSCRICAO.toISOString()}
                prazoAiusceISO={PRAZO_INSCRICAO_AIUSCE.toISOString()}
                inicioAiuvlCandidatosISO={INICIO_INSCRICAO_AIUVL_CANDIDATOS.toISOString()}
                prazoAiuvlCandidatosISO={PRAZO_INSCRICAO_AIUVL_CANDIDATOS.toISOString()}
                inicioAiuvlEleitoresISO={INICIO_INSCRICAO_AIUVL_ELEITORES.toISOString()}
                prazoAiuvlEleitoresISO={PRAZO_INSCRICAO_AIUVL_ELEITORES.toISOString()}
              />
            );
          })()}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
