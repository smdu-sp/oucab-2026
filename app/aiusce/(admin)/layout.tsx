import { AppSidebarAiusce } from "@/components/sidebar/app-sidebar-aiusce";
import Breadcrumbs from "@/components/breadcrumbs";
import { ModeToggle } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/auth/aiusce";
import { redirect } from "next/navigation";

export default async function AiusceAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/aiusce/login");

  const isAdmin =
    session.user?.permissao &&
    ["DEV", "ADM"].includes(session.user.permissao.toString());
  if (!isAdmin) redirect("/aiusce/login");

  return (
    <div className="relative w-full bg-muted/50 dark:bg-background">
      <ModeToggle className="absolute top-4 right-4 z-50" />
      <SidebarProvider>
        <AppSidebarAiusce />
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
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
