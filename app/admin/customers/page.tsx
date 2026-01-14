import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers"
}

const customers = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    orders: 12,
    spent: "$1,280.40",
    status: "Active",
  },
  {
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    orders: 5,
    spent: "$432.10",
    status: "Active",
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    orders: 2,
    spent: "$89.99",
    status: "New",
  },
  {
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    orders: 8,
    spent: "$954.25",
    status: "At risk",
  },
];

function getCustomerStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "New":
      return "secondary" as const;
    case "At risk":
      return "warning" as const;
    default:
      return "default" as const;
  }
}

export default function CustomersPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-sm font-semibold">Customers</h2>
        <p className="text-xs text-muted-foreground">
          See who is buying and how much they are spending.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold">
            Customer list
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {/* TODO: Hook into real customer count */}
            {customers.length} customers
          </span>
        </CardHeader>
        <CardContent className="pt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total spent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.email}>
                  <TableCell className="font-medium">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.email}
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.spent}</TableCell>
                  <TableCell>
                    <Badge variant={getCustomerStatusVariant(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

