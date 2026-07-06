import Skeleton from "@/components/ui/skeleton"

function SingleReviewSkeleton() {
  return (
    <div className="flex gap-2 px-1 py-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-3 grow">
        <div className="space-y-2">
          <Skeleton className="w-20" />
          <Skeleton className="w-20" />
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-1/2 bg-muted rounded-xs"></div>
          <Skeleton className="h-1.5 w-1/2" />
          <Skeleton className="h-1.5 w-1/3" />
        </div>
      </div>
    </div>
  )
}

export default SingleReviewSkeleton