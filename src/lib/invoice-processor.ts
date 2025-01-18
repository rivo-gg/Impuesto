import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface InvoiceData {
  invoiceNumber: string
  projectId: string
  amount: number
  date: Date
  status: string
  pdfContent: string
  details: Array<{
    category: string
    quantity: number
    unitPrice: number
  }>
}

export async function processInvoice(pdfContent: string): Promise<InvoiceData> {
  // Extract invoice number
  const invoiceNumberMatch = pdfContent.match(/Invoice No\s*(\d+)/)
  const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1] : ''

  // Extract date
  const dateMatch = pdfContent.match(/Date\s*(\d+\.\s*\w+\s*\d{4})/)
  const date = dateMatch ? new Date(dateMatch[1]) : new Date()

  // Extract total amount
  const amountMatch = pdfContent.match(/Total\s*([\d.]+,\d{2})\s*€/)
  const amount = amountMatch ? parseFloat(amountMatch[1].replace('.', '').replace(',', '.')) : 0

  // Extract status (this is a simplified example, you might want to implement more complex logic)
  const status = pdfContent.includes('Paid') ? 'paid' : 'pending'

  // Extract details (this is a simplified example, you might want to implement more complex logic)
  const detailsRegex = /(\w+)\s*([\d.]+,\d{2})\s*€\s*(\d+)/g
  const details: InvoiceData['details'] = []
  let match
  while ((match = detailsRegex.exec(pdfContent)) !== null) {
    details.push({
      category: match[1],
      unitPrice: parseFloat(match[2].replace('.', '').replace(',', '.')),
      quantity: parseInt(match[3], 10)
    })
  }

  // For this example, we're using a hardcoded projectId. In a real application, you'd determine this based on the invoice content or user input.
  const projectId = 'project-id-1'

  return {
    invoiceNumber,
    projectId,
    amount,
    date,
    status,
    pdfContent,
    details
  }
}

export async function saveInvoiceToDatabase(invoiceData: InvoiceData) {
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: invoiceData.invoiceNumber,
      projectId: invoiceData.projectId,
      amount: invoiceData.amount,
      date: invoiceData.date,
      status: invoiceData.status,
      pdfContent: invoiceData.pdfContent,
    },
  })

  for (const detail of invoiceData.details) {
    await prisma.invoiceDetail.create({
      data: {
        invoiceId: invoice.id,
        category: detail.category,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
      },
    })
  }

  return invoice
}

