import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavMainAiusce } from "./nav-main-aiusce";
import { NavUserAiusce } from "./nav-user-aiusce";
import ToogleSidebarBtn from "./toogle-sidebar";

export function AppSidebarAiusce({
  props,
}: {
  props?: ComponentProps<typeof Sidebar>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <ToogleSidebarBtn />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <NavMainAiusce />
      <SidebarFooter>
        <NavUserAiusce />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
