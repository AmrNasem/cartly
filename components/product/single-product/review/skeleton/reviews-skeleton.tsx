import Skeleton from "@/components/ui/skeleton"
import SingleReviewSkeleton from "./single-review"

function ReviewsSkeleton() {
  return (
    <div>
      <Skeleton className="h-3 w-20" />
      <div className="space-y-3">
        <SingleReviewSkeleton />
        <SingleReviewSkeleton />
      </div>
    </div>
  )
}

export default ReviewsSkeleton