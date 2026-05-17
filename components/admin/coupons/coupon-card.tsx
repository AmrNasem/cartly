import { CopyCodeButton } from "@/components/admin/coupons/copy-code-button";
import { CouponStatusSwitch } from "@/components/admin/coupons/coupon-status-switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminCouponListItem } from "@/lib/types/coupon.types";
import { getCouponStatusVariant } from "@/lib/utils/coupon.utils";

type CouponCardProps = {
  coupon: AdminCouponListItem;
};

export function CouponCard({ coupon }: CouponCardProps) {
  console.log("Coupon ", coupon)
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <CardTitle className="truncate text-sm font-semibold">
                {coupon.code}
              </CardTitle>
              <CopyCodeButton code={coupon.code} />
            </div>
            {coupon.description ? (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {coupon.description}
              </p>
            ) : null}
          </div>
          <Badge variant={getCouponStatusVariant(coupon.status)}>
            {coupon.statusLabel}
          </Badge>
        </div>
        <p className="text-xs font-medium text-foreground">
          {coupon.discountLabel}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Expires {coupon.expiryLabel}</span>
          <CouponStatusSwitch couponId={coupon.id} isActive={coupon.isActive} />
        </div>
      </CardContent>
    </Card>
  );
}
