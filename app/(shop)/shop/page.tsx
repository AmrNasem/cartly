import { fetchCategories } from "@/actions/category.action";
import { fetchShopProducts } from "@/actions/product.action";
import CategoryFilter from "@/components/shop/category-filter";
import ProductGrid from "@/components/shop/product-grid";
import ShopEmpty from "@/components/shop/shop-empty";
import ShopFiltersSheet from "@/components/shop/shop-filters-sheet";
import ShopHeader from "@/components/shop/shop-header";
import ShopPagination from "@/components/shop/shop-pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full product catalog.",
};

type ShopPageProps = {
  searchParams: Promise<{
    search?: string;
    categorySlug?: string;
    page?: string;
  }>;
};

async function ShopPage({ searchParams }: ShopPageProps) {
  const { search, categorySlug, page } = await searchParams;

  const [categories, { products, meta }] = await Promise.all([
    fetchCategories(),
    fetchShopProducts({
      search,
      categorySlug,
      page,
      limit: "12",
    }),
  ]);

  const activeCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  return (
    <main className="mycontainer my-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <ShopHeader
          title={activeCategory?.name ?? "Shop"}
          total={meta.total}
          search={search}
          categoryName={activeCategory?.name}
        />
        <ShopFiltersSheet
          categories={categories}
          activeCategorySlug={categorySlug}
          search={search}
        />
      </div>

      <div className="flex gap-8">
        <aside className="hidden md:block w-52 shrink-0">
          <CategoryFilter
            categories={categories}
            activeCategorySlug={categorySlug}
            search={search}
            className="sticky top-24"
          />
        </aside>

        <section className="min-w-0 flex-1">
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              <ShopPagination
                meta={meta}
                search={search}
                categorySlug={categorySlug}
              />
            </>
          ) : (
            <ShopEmpty search={search} categorySlug={categorySlug} />
          )}
        </section>
      </div>
    </main>
  );
}

export default ShopPage;
