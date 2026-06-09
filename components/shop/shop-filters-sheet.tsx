"use client";

import CategoryFilter from "@/components/shop/category-filter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categoryDTO } from "@/lib/types/category.types";
import { SlidersHorizontal } from "lucide-react";

type ShopFiltersSheetProps = {
  categories: categoryDTO[];
  activeCategorySlug?: string;
  search?: string;
};

function ShopFiltersSheet({
  categories,
  activeCategorySlug,
  search,
}: ShopFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 z-1000">
        <SheetHeader className="mb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <CategoryFilter
          categories={categories}
          activeCategorySlug={activeCategorySlug}
          search={search}
        />
      </SheetContent>
    </Sheet>
  );
}

export default ShopFiltersSheet;
