import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <Card className="border-muted shadow-md">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="size-12 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

export function OrdersPageSkeleton() {
  return (
    <main className="mycontainer my-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="space-y-4">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </main>
  );
}

export function OrderDetailSkeleton() {
  return (
    <main className="mycontainer my-6 space-y-6">
      <Skeleton className="h-4 w-28" />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-muted shadow-md">
            <CardContent className="space-y-3 p-5">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))}
            </CardContent>
          </Card>
          <Card className="border-muted shadow-md">
            <CardContent className="space-y-2 p-5">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
        <Card className="border-muted shadow-md h-fit">
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
