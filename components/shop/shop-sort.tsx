"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopSort } from "@/lib/types/product.types";
import { SORT_LABELS, ShopFilters, buildShopUrl } from "@/lib/utils/shop-url";
import { useRouter } from "next/navigation";

type ShopSortSelectProps = {
  filters: ShopFilters;
  sort: ShopSort;
};

function ShopSortSelect({ filters, sort }: ShopSortSelectProps) {
  const router = useRouter();

  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        router.push(
          buildShopUrl({
            ...filters,
            sort: value as ShopSort,
          }),
        );
      }}
    >
      <SelectTrigger className="w-[180px] h-8 text-xs">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(SORT_LABELS) as ShopSort[]).map((key) => (
          <SelectItem key={key} value={key}>
            {SORT_LABELS[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ShopSortSelect;
