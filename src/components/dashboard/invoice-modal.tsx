"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InvoiceModal({ isOpen, onClose }: InvoiceModalProps) {
  const [invoiceData, setInvoiceData] = useState({
    id: "",
    paymentStatus: "",
    totalAmount: "",
    paymentMethod: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(invoiceData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Invoice ID</Label>
            <Input
              id="id"
              value={invoiceData.id}
              onChange={(e) => setInvoiceData({ ...invoiceData, id: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select onValueChange={(value) => setInvoiceData({ ...invoiceData, paymentStatus: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              value={invoiceData.totalAmount}
              onChange={(e) => setInvoiceData({ ...invoiceData, totalAmount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select onValueChange={(value) => setInvoiceData({ ...invoiceData, paymentMethod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Invoice</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

