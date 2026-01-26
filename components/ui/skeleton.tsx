import { cn } from "@/lib/utils"

function Skeleton({ className = "" }) {
  return (
    <span className={cn("h-2 w-full block bg-muted rounded-[2px] animate-pulse", className)}></span>
  )
}

export default Skeleton