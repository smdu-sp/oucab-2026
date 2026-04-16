import { FileCheck, UserCheck, Users } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "../link";
import { validaUsuarioAiusce } from "@/services/usuario-aiusce";

export async function NavMainAiusce() {
  const usuario = await validaUsuarioAiusce();
  if (!usuario) return null;

  const isAdmin =
    usuario.permissao && ["DEV", "ADM"].includes(usuario.permissao.toString());

  return (
    <SidebarContent>
      <SidebarGroup className="space-y-2">
        {isAdmin && (
          <>
            <SidebarGroupLabel>AIUSCE</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem className="z-50">
                <Link href="/aiusce/candidaturas">
                  <FileCheck />
                  <span>Candidaturas</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="z-50">
                <Link href="/aiusce/eleitores">
                  <UserCheck />
                  <span>Eleitores</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="z-50">
                <Link href="/aiusce/usuarios">
                  <Users />
                  <span>Usuários</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}
      </SidebarGroup>
    </SidebarContent>
  );
}
