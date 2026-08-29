import type { CSSProperties, ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/showcase/_shared/watermelon/sidebar";
import { TooltipProvider } from "@/showcase/_shared/watermelon/tooltip";

import { AppSidebar } from "./app-sidebar";
import { TopNavbar } from "./top-navbar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider
        open
        className="jobtracker-dashboard h-svh min-h-0 overflow-hidden"
        style={
          {
            "--sidebar-width": "17rem",
            "--sidebar-width-icon": "3.5rem",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="h-svh overflow-hidden bg-background">
          <TopNavbar />
          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
