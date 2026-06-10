import { ShopSort } from "@/lib/types/product.types";

export type ShopFilters = {
  search?: string;
  categorySlug?: string;
  onSale?: boolean;
  inStock?: boolean;
  sort?: ShopSort;
};

export type ShopUrlParams = ShopFilters & {
  page?: number | string;
};

const VALID_SORTS: ShopSort[] = ["newest", "reviews", "price", "price-desc"];

export function parseShopSort(value?: string): ShopSort {
  if (value && VALID_SORTS.includes(value as ShopSort)) {
    return value as ShopSort;
  }
  return "newest";
}

export function parseShopSearchParams(
  params: Record<string, string | undefined>,
): ShopFilters & { page?: string; sort: ShopSort } {
  return {
    search: params.search,
    categorySlug: params.categorySlug,
    page: params.page,
    onSale: params.onSale === "true",
    inStock: params.inStock === "true",
    sort: parseShopSort(params.sort),
  };
}

export function buildShopUrl(params: ShopUrlParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.categorySlug) {
    searchParams.set("categorySlug", params.categorySlug);
  }

  if (params.onSale) {
    searchParams.set("onSale", "true");
  }

  if (params.inStock) {
    searchParams.set("inStock", "true");
  }

  if (params.sort && params.sort !== "newest") {
    searchParams.set("sort", params.sort);
  }

  const page = Number(params.page);
  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return query ? `/shop?${query}` : "/shop";
}

export function omitShopParam(
  current: ShopUrlParams,
  param: keyof ShopFilters,
): ShopUrlParams {
  const next = { ...current, page: undefined };

  switch (param) {
    case "search":
      delete next.search;
      break;
    case "categorySlug":
      delete next.categorySlug;
      break;
    case "onSale":
      delete next.onSale;
      break;
    case "inStock":
      delete next.inStock;
      break;
    case "sort":
      delete next.sort;
      break;
  }

  return next;
}

export function hasActiveShopFilters(filters: ShopFilters): boolean {
  return Boolean(
    filters.search ||
      filters.categorySlug ||
      filters.onSale ||
      filters.inStock ||
      (filters.sort && filters.sort !== "newest"),
  );
}

export const SORT_LABELS: Record<ShopSort, string> = {
  newest: "Newest",
  reviews: "Most reviewed",
  price: "Price: Low to High",
  "price-desc": "Price: High to Low",
};
