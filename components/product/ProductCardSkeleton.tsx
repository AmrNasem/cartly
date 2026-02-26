import { cn } from "@/lib/utils";

export function ProductCardSkeleton({className = ""}) {
  return (
    <div
      className={cn("flex flex-col gap-3 rounded-xl animate-pulse", className)}
    >
      <span className="block h-48 rounded-t-lg bg-secondary" />
      <div className="p-1">
        <span className="block h-3 bg-secondary mb-5 w-3/4"></span>
        <span className="block h-3 bg-secondary mb-4 w-1/2"></span>
        <span className="block h-3 bg-secondary w-1/3"></span>
      </div>
    </div>
  );
}
