import { BreadcrumbGenerator } from "./breadcrumb-generator";
import { SidebarInset } from "@/components/ui/sidebar";
import type { HTMLAttributes, ReactNode } from "react";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <SidebarInset>
      <BreadcrumbGenerator />
      {children}
    </SidebarInset>
  );
}
