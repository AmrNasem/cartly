import type { Metadata } from "next";

import { CouponForm } from "@/components/admin/coupons/coupon-form";

export const metadata: Metadata = {
  title: "New Coupon",
};

export default function NewCouponPage() {
  return <CouponForm />;
}
