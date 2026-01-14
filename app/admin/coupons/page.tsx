import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Coupons",
};
const coupons = [
  {
    code: "WELCOME10",
    discount: "10% off",
    expiry: "Feb 28, 2026",
    status: "Active",
  },
  {
    code: "FREESHIP",
    discount: "Free shipping",
    expiry: "Jan 31, 2026",
    status: "Expiring soon",
  },
  {
    code: "WINTER25",
    discount: "25% off",
    expiry: "Jan 15, 2026",
    status: "Expired",
  },
];

function getCouponStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Expiring soon":
      return "warning" as const;
    case "Expired":
      return "destructive" as const;
    default:
      return "default" as const;
  }
}

export default function CouponsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Coupons</h2>
          <p className="text-xs text-muted-foreground">
            Create and manage discount codes for your promotions.
          </p>
        </div>
        <Button size="sm">
          {/* TODO: Open coupon creation UI */}
          Create coupon
        </Button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((coupon) => (
          <Card key={coupon.code}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm font-semibold">
                  {coupon.code}
                </CardTitle>
                <Badge variant={getCouponStatusVariant(coupon.status)}>
                  {coupon.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{coupon.discount}</p>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Expires {coupon.expiry}</span>
              <Button variant="outline" size="sm">
                {/* TODO: Wire edit flow */}
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
