"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CompanySwitcher from "@/components/dashboard/company-switcher";
import NavMain from "@/components/dashboard/nav-main";
import { navData } from "@/data/nav";
import * as React from "react";

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-dashed" {...props}>
      <SidebarHeader className="flex h-16 shrink-0 gap-0 border-b border-dashed transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <h2 className="text-lg font-bold">
                <span className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
                  ID
                </span>
                <span className="group-data-[collapsible=icon]:hidden">Impuesto Dashboard</span>
              </h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <CompanySwitcher companies={data.companies} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-dashed">
        <CompanySwitcher companies={navData.companies} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
