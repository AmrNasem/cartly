type ShopUrlParams = {
  search?: string;
  categorySlug?: string;
  page?: number | string;
};

export function buildShopUrl(params: ShopUrlParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.categorySlug) {
    searchParams.set("categorySlug", params.categorySlug);
  }

  const page = Number(params.page);
  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return query ? `/shop?${query}` : "/shop";
}
