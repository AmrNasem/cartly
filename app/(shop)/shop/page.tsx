import { fetchCategories } from "@/actions/category.action";
import { fetchShopProducts } from "@/actions/product.action";
import CategoryFilter from "@/components/shop/category-filter";
import ProductGrid from "@/components/shop/product-grid";
import ShopEmpty from "@/components/shop/shop-empty";
import ShopFilterChips from "@/components/shop/shop-filter-chips";
import ShopFiltersSheet from "@/components/shop/shop-filters-sheet";
import ShopHeader from "@/components/shop/shop-header";
import ShopPagination from "@/components/shop/shop-pagination";
import ShopProductFilters from "@/components/shop/shop-product-filters";
import ShopSortSelect from "@/components/shop/shop-sort";
import { findCategoryBySlug } from "@/lib/utils/category-tree";
import { parseShopSearchParams } from "@/lib/utils/shop-url";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full product catalog.",
};

type ShopPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { page, sort, ...filters } = parseShopSearchParams(params);

  const [categories, { products, meta }] = await Promise.all([
    fetchCategories(),
    fetchShopProducts({
      ...filters,
      sort,
      page,
      limit: "12",
    }),
  ]);

  const activeCategory = filters.categorySlug
    ? findCategoryBySlug(categories, filters.categorySlug)
    : undefined;

  const shopFilters = { ...filters, sort: sort ?? "newest" };

  return (
    <main className="mycontainer my-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <ShopHeader
          title={activeCategory?.name ?? "Shop"}
          total={meta.total}
        />
        <ShopFiltersSheet
          categories={categories}
          filters={shopFilters}
          activeCategorySlug={filters.categorySlug}
        />
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-52 shrink-0">
          <div className="sticky top-24">
            <CategoryFilter
              categories={categories}
              filters={shopFilters}
              activeCategorySlug={filters.categorySlug}
            />
            <ShopProductFilters filters={shopFilters} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-4 flex items-center flex-wrap justify-between gap-2">
            <div className="grow">
              <ShopFilterChips
                filters={shopFilters}
                categoryName={activeCategory?.name}
              />
            </div>
            <ShopSortSelect filters={shopFilters} sort={shopFilters.sort} />
          </div>

          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              <ShopPagination meta={meta} filters={shopFilters} />
            </>
          ) : (
            <ShopEmpty filters={shopFilters} />
          )}
        </section>
      </div>
    </main>
  );
}

export default ShopPage;
