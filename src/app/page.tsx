"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentInvoices } from "@/components/recent-invoices"
import { InvoiceModal } from "@/components/invoice-modal"
import { Button } from "@/components/ui/button"
// import { CompanySelector } from "@/components/company-selector"
import { Company, Project, Invoice } from "@/types"

// Mock data
const projects: Project[] = [
  { id: "1", name: "Website Redesign", companyId: "1" },
  { id: "2", name: "Mobile App Development", companyId: "1" },
  { id: "3", name: "ERP Implementation", companyId: "2" },
]

const invoices: Invoice[] = [
  { id: "1", projectId: "1", amount: 5000, date: new Date(), status: "paid" },
  { id: "2", projectId: "1", amount: 7500, date: new Date(), status: "pending" },
  { id: "3", projectId: "2", amount: 10000, date: new Date(), status: "paid" },
  { id: "4", projectId: "3", amount: 15000, date: new Date(), status: "overdue" },
]

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const filteredProjects = projects
  const filteredInvoices = invoices

  const totalRevenue = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidInvoices = filteredInvoices.filter(invoice => invoice.status === "paid")
  const pendingInvoices = filteredInvoices.filter(invoice => invoice.status === "pending")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Invoice</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paid Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidInvoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProjects.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={filteredProjects
              .map(project => ({
                name: project.name,
                total: filteredInvoices
                  .filter(invoice => invoice.projectId === project.id)
                  .reduce((sum, invoice) => sum + invoice.amount, 0)
              }))
              .filter(item => item.total > 0)
            } />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentInvoices 
              invoices={filteredInvoices
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5)
              } 
            />
          </CardContent>
        </Card>
      </div>
      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projects={filteredProjects}
      />
    </div>
  )
}

