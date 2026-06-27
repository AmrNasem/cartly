import { HomeCategoryDTO } from "@/lib/types/category.types";

/** Fallback category thumbnails when no product image is available in the database. */
export const CATEGORY_FALLBACK_THUMBNAILS: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop",
  fashion:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop",
  home:
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
  sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba7981?w=600&h=600&fit=crop",
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bf403334be?w=600&h=600&fit=crop",
  books:
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=600&fit=crop",
};

export const DEFAULT_CATEGORY_THUMBNAIL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop";

export function getCategoryFallbackThumbnail(slug: string): string {
  return CATEGORY_FALLBACK_THUMBNAILS[slug] ?? DEFAULT_CATEGORY_THUMBNAIL;
}

/** Used when the database has no categories yet. Replace with real data via fetchHomeCategories. */
export const MOCK_HOME_CATEGORIES: HomeCategoryDTO[] = [
  {
    id: "mock-electronics",
    name: "Electronics",
    slug: "electronics",
    productCount: 128,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.electronics,
  },
  {
    id: "mock-fashion",
    name: "Fashion",
    slug: "fashion",
    productCount: 256,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.fashion,
  },
  {
    id: "mock-home",
    name: "Home & Living",
    slug: "home",
    productCount: 94,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.home,
  },
  {
    id: "mock-sports",
    name: "Sports",
    slug: "sports",
    productCount: 67,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.sports,
  },
  {
    id: "mock-beauty",
    name: "Beauty",
    slug: "beauty",
    productCount: 83,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.beauty,
  },
  {
    id: "mock-books",
    name: "Books",
    slug: "books",
    productCount: 45,
    thumbnail: CATEGORY_FALLBACK_THUMBNAILS.books,
  },
];

/** Placeholder end date for flash deals countdown — swap for a real sale end time later. */
export const FLASH_DEALS_END_DATE = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
