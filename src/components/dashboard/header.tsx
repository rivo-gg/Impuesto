import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb";
import DynamicBreadcrumbs from "./dynamic-breadcrumbs";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-dashed">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumbs />
      </div>
    </header>
  );
}

export default Header;
