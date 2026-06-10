import {
  SORT_LABELS,
  ShopFilters,
  buildShopUrl,
  hasActiveShopFilters,
  omitShopParam,
} from "@/lib/utils/shop-url";
import { X } from "lucide-react";
import Link from "next/link";

type ShopFilterChipsProps = {
  filters: ShopFilters;
  categoryName?: string;
};

function FilterChip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-muted/50 px-3 py-1 text-xs text-foreground transition-colors hover:bg-muted"
    >
      {label}
      <X className="size-3 text-muted-foreground" aria-hidden />
      <span className="sr-only">Remove filter</span>
    </Link>
  );
}

function ShopFilterChips({ filters, categoryName }: ShopFilterChipsProps) {
  if (!hasActiveShopFilters(filters)) return null;

  const chips: { key: keyof ShopFilters; label: string; href: string }[] = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: "${filters.search}"`,
      href: buildShopUrl(omitShopParam(filters, "search")),
    });
  }

  if (filters.categorySlug && categoryName) {
    chips.push({
      key: "categorySlug",
      label: `Category: ${categoryName}`,
      href: buildShopUrl(omitShopParam(filters, "categorySlug")),
    });
  }

  if (filters.onSale) {
    chips.push({
      key: "onSale",
      label: "On sale",
      href: buildShopUrl(omitShopParam(filters, "onSale")),
    });
  }

  if (filters.inStock) {
    chips.push({
      key: "inStock",
      label: "In stock",
      href: buildShopUrl(omitShopParam(filters, "inStock")),
    });
  }

  if (filters.sort && filters.sort !== "newest") {
    chips.push({
      key: "sort",
      label: `Sort: ${SORT_LABELS[filters.sort]}`,
      href: buildShopUrl(omitShopParam(filters, "sort")),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <FilterChip key={chip.key} href={chip.href} label={chip.label} />
      ))}
      <Link
        href="/shop"
        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
      >
        Clear all
      </Link>
    </div>
  );
}

export default ShopFilterChips;
