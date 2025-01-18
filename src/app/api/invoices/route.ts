import { NextResponse } from 'next/server'

const invoices = [
  { id: '1', projectId: '1', amount: 1000, date: new Date(), status: 'paid' },
  { id: '2', projectId: '2', amount: 2000, date: new Date(), status: 'pending' },
  { id: '3', projectId: '3', amount: 3000, date: new Date(), status: 'overdue' },
]

export async function GET() {
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newInvoice = { id: (invoices.length + 1).toString(), ...body }
  invoices.push(newInvoice)
  return NextResponse.json(newInvoice)
}

