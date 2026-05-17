import { CouponsGridSkeleton } from "@/components/admin/coupons/coupon-skeleton";
import Skeleton from "@/components/ui/skeleton";

export default function CouponsLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>
      <CouponsGridSkeleton />
    </div>
  );
}
