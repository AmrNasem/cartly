import { ShopFilters, buildShopUrl } from "@/lib/utils/shop-url";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ShopProductFiltersProps = {
  filters: ShopFilters;
  className?: string;
};

function FilterToggle({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded border text-[10px]",
          active
            ? "border-primary bg-primary text-white"
            : "border-black/20 bg-background",
        )}
        aria-hidden
      >
        {active ? "✓" : ""}
      </span>
      {label}
    </Link>
  );
}

function ShopProductFilters({ filters, className }: ShopProductFiltersProps) {
  return (
    <div className={cn("space-y-1 border-t border-black/10 pt-4 mt-4", className)}>
      <h2 className="text-sm font-semibold text-foreground mb-3">Filters</h2>
      <FilterToggle
        label="On sale only"
        active={Boolean(filters.onSale)}
        href={buildShopUrl({
          ...filters,
          onSale: filters.onSale ? undefined : true,
        })}
      />
      <FilterToggle
        label="In stock only"
        active={Boolean(filters.inStock)}
        href={buildShopUrl({
          ...filters,
          inStock: filters.inStock ? undefined : true,
        })}
      />
    </div>
  );
}

export default ShopProductFilters;
