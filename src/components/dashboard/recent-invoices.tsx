import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentInvoices = [
  {
    id: "INV001",
    amount: 1999.0,
    customer: "Zoey Lang",
    email: "zoey.lang@example.com",
  },
  {
    id: "INV002",
    amount: 39.99,
    customer: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    id: "INV003",
    amount: 299.0,
    customer: "John Smith",
    email: "john.smith@example.com",
  },
  {
    id: "INV004",
    amount: 99.0,
    customer: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: "INV005",
    amount: 2499.0,
    customer: "Bob Williams",
    email: "bob.williams@example.com",
  },
]

export function RecentInvoices() {
  return (
    <div className="space-y-8">
      {recentInvoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${invoice.email}`} alt={invoice.customer} />
            <AvatarFallback>
              {invoice.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{invoice.customer}</p>
            <p className="text-sm text-muted-foreground">{invoice.email}</p>
          </div>
          <div className="ml-auto font-medium">+€{invoice.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

