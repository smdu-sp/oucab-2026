import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavMainAiuvl } from "./nav-main-aiuvl";
import { NavUserAiuvl } from "./nav-user-aiuvl";
import ToogleSidebarBtn from "./toogle-sidebar";

export function AppSidebarAiuvl({
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
      <NavMainAiuvl />
      <SidebarFooter>
        <NavUserAiuvl />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
