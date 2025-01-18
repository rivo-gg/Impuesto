import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Invoice } from "@/types"

interface RecentInvoicesProps {
  invoices: Invoice[]
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  return (
    <div className="space-y-8">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{invoice.id.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Invoice #{invoice.id}</p>
            <p className="text-sm text-muted-foreground">
              {invoice.date.toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto font-medium">
            €{invoice.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

