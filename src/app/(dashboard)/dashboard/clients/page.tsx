"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClientsTable } from "@/components/dashboard/clients-table"
import { ClientModal } from "@/components/client-modal"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

interface Client {
  id: string
  name: string
  email: string
  type: "b2c" | "b2b"
  company?: string
}

// Mock data
const mockClients: Client[] = [
  { id: "1", name: "John Doe", email: "john@example.com", type: "b2c" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", type: "b2c" },
  { id: "3", name: "Acme Corp", email: "info@acme.com", type: "b2b", company: "Acme Corporation" },
  { id: "4", name: "Tech Solutions", email: "contact@techsolutions.com", type: "b2b", company: "Tech Solutions Inc." },
  // Add more mock clients to demonstrate scrolling
  ...Array(20)
    .fill(null)
    .map((_, i) => ({
      id: `${i + 5}`,
      name: `Client ${i + 5}`,
      email: `client${i + 5}@example.com`,
      type: i % 2 === 0 ? "b2c" : "b2b" as "b2c" | "b2b",
      company: i % 2 !== 0 ? `Company ${i + 5}` : undefined,
    })),
]

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase()
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(lowercasedQuery) ||
        client.email.toLowerCase().includes(lowercasedQuery) ||
        (client.company && client.company.toLowerCase().includes(lowercasedQuery)),
    )
    setFilteredClients(filtered)
    setCurrentPage(1)
  }

  const addClient = (client: Client) => {
    const newClients = [...clients, { ...client, id: (clients.length + 1).toString() }]
    setClients(newClients)
    setFilteredClients(newClients)
  }

  const paginatedClients = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)

  return (
    <SidebarInset className="flex flex-col h-screen">
      <header className="flex h-16 shrink-0 items-center px-4 border-b">
        <SidebarTrigger className="-ml-1 mr-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbPage>Clients</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex-grow flex flex-col p-6 space-y-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search clients..." onChange={(e) => handleSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="flex-grow overflow-auto border rounded-md">
          <ClientsTable clients={paginatedClients} />
        </div>
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddClient={addClient} />
    </SidebarInset>
  )
}

