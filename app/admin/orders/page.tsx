import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Orders",
};

const orders = [
  {
    id: "#1024",
    customer: "Alex Johnson",
    status: "Shipped",
    total: "$128.40",
    date: "Jan 13, 2026",
  },
  {
    id: "#1023",
    customer: "Maria Garcia",
    status: "Pending",
    total: "$89.99",
    date: "Jan 13, 2026",
  },
  {
    id: "#1022",
    customer: "Daniel Kim",
    status: "Delivered",
    total: "$54.20",
    date: "Jan 12, 2026",
  },
  {
    id: "#1021",
    customer: "Sarah Lee",
    status: "Delivered",
    total: "$312.00",
    date: "Jan 12, 2026",
  },
];

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Pending":
      return "warning" as const;
    case "Shipped":
      return "secondary" as const;
    case "Delivered":
      return "success" as const;
    default:
      return "default" as const;
  }
}

export default function OrdersPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Orders</h2>
          <p className="text-xs text-muted-foreground">
            Track, filter, and review recent store orders.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by order ID, customer, or email..."
                className="h-9 text-xs"
              />
              {/* TODO: Wire up filters to real query params */}
              <Button variant="outline" size="sm">
                Filters
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Showing {orders.length} orders</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {order.date}
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
