import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

interface Client {
  id: string;
  name: string;
  email: string;
  type: "b2c" | "b2b";
  company?: string;
}

interface ClientsTableProps {
  clients: Client[];
}

export function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <Table className="w-full">
      <TableHead>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.type.toUpperCase()}</TableCell>
            <TableCell>{client.company || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
