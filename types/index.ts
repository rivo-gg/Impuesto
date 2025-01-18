export interface Company {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  amount: number;
  date: Date;
  status: string;
  pdfContent: string;
}

export interface InvoiceDetail {
  id: string;
  invoiceId: string;
  category: string;
  quantity: number;
  unitPrice: number;
}

