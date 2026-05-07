import { FileCheck, UserCheck, Users, Mail } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "../link";
import { validaUsuarioAiuvl } from "@/services/usuario-aiuvl";

export async function NavMainAiuvl() {
  const usuario = await validaUsuarioAiuvl();
  if (!usuario) return null;

  const isAdmin = usuario.permissao && ["DEV", "ADM"].includes(usuario.permissao.toString());
  const isDev = usuario.permissao?.toString() === "DEV";

  return (
    <SidebarContent>
      <SidebarGroup className="space-y-2">
        {isAdmin && (
          <>
            <SidebarGroupLabel>AIU-VL</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem className="z-50">
                <Link href="/aiuvl/candidaturas">
                  <FileCheck />
                  <span>Candidaturas</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="z-50">
                <Link href="/aiuvl/eleitores">
                  <UserCheck />
                  <span>Eleitores</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="z-50">
                <Link href="/aiuvl/usuarios">
                  <Users />
                  <span>Usuários</span>
                </Link>
              </SidebarMenuItem>
              {isDev && (
                <SidebarMenuItem className="z-50">
                  <Link href="/aiuvl/dev/emails">
                    <Mail />
                    <span>Modelos de E-mail</span>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </>
        )}
      </SidebarGroup>
    </SidebarContent>
  );
}
