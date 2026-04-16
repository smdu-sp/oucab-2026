import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/auth/aiusce";
import BtnSignOutAiusce from "@/components/btn-signout-aiusce";

export async function NavUserAiusce() {
  const session = await auth();
  if (!session?.user) return null;

  const nome = session.user.nome ?? "";

  function abreviaNome(n: string) {
    const parts = n.split(" ");
    return `${parts[0][0]}${parts[parts.length - 1][0]}`;
  }

  function reduzNome(n: string) {
    if (n.length <= 20) return n;
    const parts = n.split(" ");
    return `${parts[0]} ${parts[parts.length - 1]}`;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-full aspect-square">
                <AvatarFallback className="rounded-full">
                  {abreviaNome(nome)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{reduzNome(nome)}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            sideOffset={4}>
            <div className="flex items-center gap-2 px-2 py-2 text-sm">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback className="rounded-full">
                  {abreviaNome(nome)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{reduzNome(nome)}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <BtnSignOutAiusce />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
