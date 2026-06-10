import { ProductsMeta } from "@/lib/types/product.types";
import { ShopFilters, buildShopUrl } from "@/lib/utils/shop-url";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type ShopPaginationProps = {
  meta: ProductsMeta;
  filters: ShopFilters;
};

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 1 && i < total) pages.add(i);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

function ShopPagination({ meta, filters }: ShopPaginationProps) {
  if (meta.totalPages <= 1) return null;

  const pages = getPageNumbers(meta.page, meta.totalPages);

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <Link
        href={buildShopUrl({ ...filters, page: meta.page - 1 })}
        aria-disabled={!meta.hasPrevPage}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-sm transition-colors",
          meta.hasPrevPage
            ? "hover:bg-accent"
            : "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Previous page</span>
      </Link>

      {pages.map((page, index) => {
        const prevPage = pages[index - 1];
        const showEllipsis = prevPage !== undefined && page - prevPage > 1;

        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="px-2 text-muted-foreground">…</span>
            )}
            <Link
              href={buildShopUrl({ ...filters, page })}
              aria-current={page === meta.page ? "page" : undefined}
              className={cn(
                "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm transition-colors",
                page === meta.page
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 hover:bg-accent",
              )}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildShopUrl({ ...filters, page: meta.page + 1 })}
        aria-disabled={!meta.hasNextPage}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-sm transition-colors",
          meta.hasNextPage
            ? "hover:bg-accent"
            : "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  );
}

export default ShopPagination;
