"use client";

import CategoryFilter from "@/components/shop/category-filter";
import ShopProductFilters from "@/components/shop/shop-product-filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categoryDTO } from "@/lib/types/category.types";
import { ShopFilters } from "@/lib/utils/shop-url";
import { SlidersHorizontal } from "lucide-react";

type ShopFiltersSheetProps = {
  categories: categoryDTO[];
  filters: ShopFilters;
  activeCategorySlug?: string;
};

function ShopFiltersSheet({
  categories,
  filters,
  activeCategorySlug,
}: ShopFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 z-1000 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <CategoryFilter
          categories={categories}
          filters={filters}
          activeCategorySlug={activeCategorySlug}
        />
        <ShopProductFilters filters={filters} />
      </SheetContent>
    </Sheet>
  );
}

export default ShopFiltersSheet;
