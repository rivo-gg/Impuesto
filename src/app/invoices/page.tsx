"use client"

import { useState, useEffect } from 'react'
import { InvoiceModal } from "@/components/invoice-modal"
import { PDFViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Project, Invoice } from "@/types"

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchData() {
      const invoicesResponse = await fetch('/api/invoices')
      const invoicesData = await invoicesResponse.json()
      setInvoices(invoicesData)

      const projectsResponse = await fetch('/api/projects')
      const projectsData = await projectsResponse.json()
      setProjects(projectsData)
    }
    fetchData()
  }, [])

  const handleDownload = (invoice: Invoice) => {
    // In a real application, this would generate and download the PDF
    alert(`Downloading invoice ${invoice.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Invoice</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => {
                const project = projects.find(p => p.id === invoice.projectId)
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{project ? project.name : 'Unknown Project'}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="text-right">€{invoice.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" className="mr-2" onClick={() => handleDownload(invoice)}>
                        Download
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedInvoice(invoice)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Invoice {invoice.id}</DialogTitle>
                            <DialogDescription>
                              View the details of invoice {invoice.id}
                            </DialogDescription>
                          </DialogHeader>
                          <PDFViewer content={`Sample content for invoice ${invoice.id}`} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No invoices found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projects={projects}
      />
    </div>
  )
}

