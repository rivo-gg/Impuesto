"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import {} from "@/components/ui/tooltip";
import { Fragment } from "react";

export function BreadcrumbGenerator() {
  const pathname = usePathname();
  const pathnameItems = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 select-none">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {/* {pathname === "/" ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {pathnameItems.length > 0 && <BreadcrumbSeparator className="h-4" />} */}
            {pathnameItems.map((item, index) => {
              const isLastItem = index === pathnameItems.length - 1;
              return (
                <Fragment key={index}>
                  {isLastItem ? (
                    <BreadcrumbItem className="capitalize">
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem className="capitalize">
                      <BreadcrumbLink
                        href={`/${pathnameItems.slice(0, index + 1).join("/")}`}
                        className="hover:bg-accent -mx-1.5 rounded-md px-1.5 py-1"
                      >
                        {item}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                  {!isLastItem && <BreadcrumbSeparator className="h-4" />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
