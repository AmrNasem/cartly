import CategoryTreeFilter from "@/components/shop/category-tree-filter";
import { categoryDTO } from "@/lib/types/category.types";
import {
  buildCategoryTree,
  getAncestorSlugs,
} from "@/lib/utils/category-tree";
import { ShopFilters } from "@/lib/utils/shop-url";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: categoryDTO[];
  filters: ShopFilters;
  activeCategorySlug?: string;
  className?: string;
};

function CategoryFilter({
  categories,
  filters,
  activeCategorySlug,
  className,
}: CategoryFilterProps) {
  const tree = buildCategoryTree(categories);
  const defaultExpandedSlugs = activeCategorySlug
    ? getAncestorSlugs(categories, activeCategorySlug)
    : [];

  return (
    <CategoryTreeFilter
      tree={tree}
      filters={filters}
      activeCategorySlug={activeCategorySlug}
      defaultExpandedSlugs={defaultExpandedSlugs}
      className={cn(className)}
    />
  );
}

export default CategoryFilter;
