import { cn } from "@/lib/utils";

export default function CartItemSkeleton({ className = "" }) {
  return (
    <div className={cn("flex gap-3 rounded-xl animate-pulse", className)}>
      <span className="block h-42 min-w-38 rounded-lg bg-secondary" />
      <div className="p-1 grow flex flex-col">
        <span className="h-3 bg-secondary mb-5 w-1/3"></span>
        <span className="h-3 bg-secondary mb-4 w-1/2"></span>
        <span className="h-3 bg-secondary mb-5 w-3/4"></span>
        <span className="grow"></span>
        <div className="h-6 flex justify-between flex-wrap gap-3 mb-4">
          <span className="bg-secondary w-20"></span>
          <span className="bg-secondary w-20"></span>
          <span className="bg-secondary w-10"></span>
        </div>
      </div>
    </div>
  );
}
