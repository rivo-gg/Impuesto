"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Project } from "@/types"
import { processInvoice, saveInvoiceToDatabase } from "@/lib/invoice-processor"

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
}

export function InvoiceModal({ isOpen, onClose, projects }: InvoiceModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setProcessing(true)
    try {
      const pdfContent = await file.text()
      const invoiceData = await processInvoice(pdfContent)
      await saveInvoiceToDatabase(invoiceData)
      onClose()
    } catch (error) {
      console.error('Error processing invoice:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Upload PDF Invoice</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button type="submit" disabled={processing}>
            {processing ? 'Processing...' : 'Add Invoice'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

