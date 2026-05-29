import { getCouponToEditAction } from "@/actions/coupon.action";
import { CouponForm } from "@/components/admin/coupons/coupon-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit coupon",
};

async function EditCoupon({ params }: { params: Promise<{ id: string }> }) {
  const couponId = (await params).id;
  const couponToEdit = await getCouponToEditAction(couponId)

  if (!couponToEdit.success) return notFound();

  return (
    <CouponForm data={couponToEdit.data} couponId={couponId} />
  )
}

export default EditCoupon