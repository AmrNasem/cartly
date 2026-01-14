import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

const summaryCards = [
  { label: "Revenue (30d)", value: "$24,320", change: "+12.4%" },
  { label: "Average order value", value: "$78.40", change: "+3.1%" },
  { label: "Repeat purchase rate", value: "38%", change: "+2.3%" },
  { label: "Top category", value: "Home & Living", change: "Most viewed" },
];

const topProducts = [
  { name: "Minimal Chair", revenue: "$6,240", orders: 82 },
  { name: "Soft Cotton Hoodie", revenue: "$4,120", orders: 67 },
  { name: "Wireless Earbuds", revenue: "$3,850", orders: 49 },
  { name: "Ceramic Mug Set", revenue: "$2,430", orders: 61 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-sm font-semibold">Analytics</h2>
        <p className="text-xs text-muted-foreground">
          High-level performance metrics and trends for your store.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <div className="flex items-end justify-between">
                <span className="text-lg font-semibold">{card.value}</span>
                <Badge variant="success" className="text-[11px]">
                  {card.change}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Revenue over time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52 rounded-lg bg-muted/60 p-4">
              {/* TODO: Replace with real revenue time-series chart */}
              <div className="flex h-full items-end justify-between gap-2">
                {[35, 48, 60, 45, 72, 68, 80, 76, 90, 84, 92, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-full bg-primary/10"
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Top products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* TODO: Hook into real product analytics */}
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between gap-3 rounded-md bg-background px-2 py-1.5 text-xs"
              >
                <div className="flex-1">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {product.orders} orders
                  </p>
                </div>
                <span className="font-semibold">{product.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
