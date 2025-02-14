import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb";
import DynamicBreadcrumbs from "./dynamic-breadcrumbs";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

function Header() {
  return (
    <header className="bg-sidebar flex h-16 shrink-0 items-center gap-2 border-b border-dashed transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="hover:bg-sidebar-accent -ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumbs />
      </div>
    </header>
  );
}

export default Header;
