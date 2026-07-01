import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { redirect } from "next/navigation";

const kpis = [
  {
    label: "Revenue",
    value: "$24,320",
    sublabel: "Last 30 days",
    trend: "+12.4%",
  },
  { label: "Orders", value: "1,284", sublabel: "Last 30 days", trend: "+5.1%" },
  {
    label: "Customers",
    value: "842",
    sublabel: "Active customers",
    trend: "+3.2%",
  },
  {
    label: "Conversion",
    value: "3.8%",
    sublabel: "Store-wide",
    trend: "+0.6%",
  },
];

const recentOrders = [
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

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  redirect("/admin/products"); // Temp
  return (
    <div className="space-y-4 md:space-y-6">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <p className="mt-2 text-xl font-semibold">{kpi.value}</p>
              </div>
              <Badge variant="success">{kpi.trend}</Badge>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Revenue overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-lg bg-muted/60 p-3">
              {/* TODO: Replace with real chart (e.g. Recharts) */}
              <div className="flex h-full items-end justify-between gap-1">
                {[30, 45, 65, 40, 72, 60, 80].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-full bg-primary/10"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Channel performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Direct", value: "48%", bar: "w-[48%]" },
              { label: "Search", value: "32%", bar: "w-[32%]" },
              { label: "Social", value: "12%", bar: "w-[12%]" },
              { label: "Referrals", value: "8%", bar: "w-[8%]" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full bg-primary/70 ${item.bar}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Recent orders</h2>
          <span className="text-xs text-muted-foreground">
            {/* TODO: Wire this to /admin/orders with filters applied */}
            Last 10 orders
          </span>
        </div>
        <Card>
          <CardContent className="pt-3">
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
                {recentOrders.map((order) => (
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
      </section>
    </div>
  );
}
