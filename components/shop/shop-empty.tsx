import {
  ShopFilters,
  buildShopUrl,
  hasActiveShopFilters,
} from "@/lib/utils/shop-url";
import Link from "next/link";

type ShopEmptyProps = {
  filters: ShopFilters;
};

function ShopEmpty({ filters }: ShopEmptyProps) {
  const hasFilters = hasActiveShopFilters(filters);

  return (
    <div className="rounded-lg border border-dashed border-black/15 bg-muted/30 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-foreground">No products found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {hasFilters
          ? "Try adjusting your search or filters."
          : "Check back soon — new products are on the way."}
      </p>
      {hasFilters && (
        <Link
          href={buildShopUrl()}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}

export default ShopEmpty;
