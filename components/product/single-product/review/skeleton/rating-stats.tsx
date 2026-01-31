import Skeleton from "@/components/ui/skeleton"

function RatingStatsSkeleton() {
  return (
    <>
      <Skeleton className="h-3 w-30" />
      <div className="grid grid-cols-3 gap-2">
        <span className="bg-muted rounded-sm h-[140px]"></span>
        <span className="bg-muted rounded-sm h-[140px] col-span-2"></span>
      </div>
    </>
  )
}

export default RatingStatsSkeleton