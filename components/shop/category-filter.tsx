import { categoryDTO } from "@/lib/types/category.types";
import { buildShopUrl } from "@/lib/utils/shop-url";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CategoryFilterProps = {
  categories: categoryDTO[];
  activeCategorySlug?: string;
  search?: string;
  className?: string;
};

function CategoryFilter({
  categories,
  activeCategorySlug,
  search,
  className,
}: CategoryFilterProps) {
  return (
    <nav className={cn("space-y-1", className)} aria-label="Product categories">
      <h2 className="text-sm font-semibold text-foreground mb-3">Categories</h2>
      <Link
        href={buildShopUrl({ search })}
        className={cn(
          "block rounded-md px-3 py-2 text-sm transition-colors",
          !activeCategorySlug
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={buildShopUrl({ categorySlug: category.slug, search })}
          className={cn(
            "block rounded-md px-3 py-2 text-sm transition-colors",
            activeCategorySlug === category.slug
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

export default CategoryFilter;
