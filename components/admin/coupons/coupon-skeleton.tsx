import Skeleton from "@/components/ui/skeleton";
import { CardContent, CardHeader } from "@/components/ui/card";

export function CouponCardSkeleton() {
  return (
    <article className="border border-muted bg-background rounded-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-36" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-9 rounded-full" />
        </div>
      </CardContent>
    </article>
  );
}

export function CouponsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CouponCardSkeleton key={index} />
      ))}
    </section>
  );
}
