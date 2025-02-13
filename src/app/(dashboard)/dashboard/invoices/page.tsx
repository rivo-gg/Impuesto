"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InvoiceModal } from "@/components/dashboard/invoice-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const invoices = [
  {
    id: "INV001",
    paymentStatus: "Paid",
    totalAmount: "€250.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    paymentStatus: "Pending",
    totalAmount: "€150.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "€350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    paymentStatus: "Paid",
    totalAmount: "€450.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    paymentStatus: "Paid",
    totalAmount: "€550.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    paymentStatus: "Pending",
    totalAmount: "€200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "€300.00",
    paymentMethod: "Credit Card",
  },
]

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInvoices = invoices.filter((invoice) =>
    Object.values(invoice).some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Invoices</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Invoice
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {invoices.filter((invoice) => invoice.paymentStatus === "Paid").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {invoices.filter((invoice) => invoice.paymentStatus === "Pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {invoices.filter((invoice) => invoice.paymentStatus === "Unpaid").length}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>Manage and view all your invoices here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-4">
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <InvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SidebarInset>
  )
}

