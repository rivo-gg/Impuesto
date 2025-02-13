import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Separator } from "@/components/ui/separator";

// Helper function to determine the color class based on the percentage
function getPercentageColorClass(percentage: number): string {
  return percentage >= 0 ? "text-green-500" : "text-red-500";
}

// Helper function to format the percentage
function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(1)}%`;
}

export default function Dashboard() {
  // Mock data for the cards
  const cardData = [
    { title: "Total Revenue", value: "€45,231.89", percentage: 20.1 },
    { title: "Invoices", value: "+2,350", percentage: 180.1 },
    { title: "Paid Invoices", value: "+12,234", percentage: 19.0 },
    { title: "Active Projects", value: "+573", percentage: -2.5 },
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Updated main content container */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card key={index} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-muted-foreground text-xs">
                  <span className={`font-medium ${getPercentageColorClass(card.percentage)}`}>
                    {formatPercentage(card.percentage)}
                  </span>
                  {" from last month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid flex-1 gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentInvoices />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
