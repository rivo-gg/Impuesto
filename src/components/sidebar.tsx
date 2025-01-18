"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, FileText, PieChart, Settings, FolderPlus, Building } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

const routes = [
  {
    label: 'Dashboard',
    icon: BarChart,
    href: '/',
  },
  {
    label: 'Invoices',
    icon: FileText,
    href: '/invoices',
  },
  {
    label: 'Projects',
    icon: FolderPlus,
    href: '/projects',
  },
  {
    label: 'Reports',
    icon: PieChart,
    href: '/reports',
  },
  {
    label: 'Company Settings',
    icon: Building,
    href: '/settings/company',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <Logo />
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-muted rounded-lg transition",
                pathname === route.href ? "text-primary bg-muted" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <ThemeToggle />
      </div>
    </div>
  )
}

