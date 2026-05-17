import type { Metadata } from "next";
import Link from "next/link";

import { fetchAdminCouponsAction } from "@/actions/coupon.action";
import { CouponCard } from "@/components/admin/coupons/coupon-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Manage Coupons",
};

export default async function CouponsPage() {
  const coupons = await fetchAdminCouponsAction();

  return (
    <div className="space-y-4 md:space-y-6 md:max-w-[80%] mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Coupons</h2>
          <p className="text-xs text-muted-foreground">
            Create and manage discount codes for your promotions.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/admin/coupons/new">Create coupon</Link>
        </Button>
      </div>

      {coupons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-sm font-medium">No coupons yet</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Create your first coupon to offer discounts and run promotions.
            </p>
            <Button size="sm" asChild>
              <Link href="/admin/coupons/new">Create coupon</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </section>
      )}
    </div>
  );
}
