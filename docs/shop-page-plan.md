# Shop Page Implementation Plan

> **Status:** Implemented  
> **Route:** `/shop`  
> **Goal:** Build a searchable, filterable, paginated product catalog — the main browse experience for Cartly.

---

## Context

The homepage (`/`) already handles marketing and discovery (hero, featured, recommended). The shop page is currently a placeholder. Most backend plumbing exists (`getProducts`, `fetchProducts`, `ProductCard`, categories API) but is not wired up for the customer-facing catalog.

---

## MVP Scope

### In scope

1. **Paginated product grid** — reuse `ProductCard` and existing grid layout from homepage sections
2. **Category filter** — sidebar (desktop) / sheet (mobile), driven by `?categorySlug=`
3. **Search** — wire navbar search to `/shop?search=`, results on shop page
4. **Page header** — title, product count, active filter summary
5. **Loading & empty states** — `ProductCardSkeleton`, friendly no-results message
6. **Backend fixes** — only published products, enrich + map DTOs for cart state
7. **Hero CTA** — link "Shop Now" button to `/shop`
8. **Route metadata** — page title/description for `/shop`

### Out of scope (Phase 2)

- Sort dropdown (price, rating, newest)
- Price range filter
- In-stock-only toggle
- Grid/list view toggle
- Dedicated category routes (`/shop/[categorySlug]`)
- Active filter chips with "clear all"

---

## Architecture

### URL-driven state

All filters live in search params so results are shareable and bookmarkable:

| Param           | Example              | Maps to                          |
|-----------------|----------------------|----------------------------------|
| `search`        | `?search=headphones` | `$text` search in `getProducts`  |
| `categorySlug`  | `?categorySlug=electronics` | Category filter           |
| `page`          | `?page=2`            | Pagination offset                |

Combined example: `/shop?categorySlug=electronics&search=wireless&page=2`

### Data flow

```
shop/page.tsx (Server Component)
  └─ reads searchParams
  └─ fetchProducts({ search, categorySlug, page, limit })
       └─ getProducts() → enrichProducts() → mapProductCardDTO()
  └─ getCategories() for sidebar
  └─ renders ShopPage UI with products + meta + categories
```

### Layout (desktop)

```
┌─────────────────────────────────────────────────────┐
│  Shop                                               │
│  Browse our full catalog · 156 products             │
├──────────────┬──────────────────────────────────────┤
│ Categories   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│ ● All        │  │    │ │    │ │    │ │    │       │
│ ○ Electronics│  └────┘ └────┘ └────┘ └────┘       │
│ ○ Clothing   │  ...                                 │
│              │         ← 1  2  3 ... 13 →         │
└──────────────┴──────────────────────────────────────┘
```

Mobile: categories collapse into a "Filters" button opening a sheet.

---

## File Changes

### 1. Backend / data layer

| File | Change |
|------|--------|
| `lib/services/product.service.ts` | Add `isPublished: true` to `getProducts` query (customer catalog only) |
| `actions/product.action.ts` | Uncomment enrich + `mapProductCardDTO` in `fetchProducts`; return `{ products: ProductCardDTO[], meta }` |
| `lib/types/product.types.ts` | No change expected (existing `queryOptions` is sufficient) |

### 2. New components

| File | Purpose |
|------|---------|
| `components/shop/shop-header.tsx` | Title, subtitle, result count, active search/category label |
| `components/shop/category-filter.tsx` | Category list with links; highlights active `categorySlug` |
| `components/shop/product-grid.tsx` | Grid of `ProductCard` components |
| `components/shop/shop-pagination.tsx` | Prev/next + page numbers using `meta` |
| `components/shop/shop-empty.tsx` | No-results state with link to clear filters |
| `components/shop/shop-filters-sheet.tsx` | Mobile-only sheet wrapping `CategoryFilter` |

### 3. Page & route files

| File | Change |
|------|--------|
| `app/(shop)/shop/page.tsx` | Server component: fetch products + categories, compose shop UI |
| `app/(shop)/shop/loading.tsx` | Skeleton grid using `ProductCardSkeleton` |

### 4. Existing component updates

| File | Change |
|------|--------|
| `components/layout/Navbar.tsx` | Wire search form: `action="/shop"`, `method="GET"`, preserve `name="search"` |
| `components/homepage/hero.tsx` | Wrap "Shop Now" in `<Link href="/shop">` |

### 5. Optional helper (if needed)

| File | Purpose |
|------|---------|
| `lib/utils/shop-url.ts` | Build `/shop` URLs with merged search params (category, search, page) |

---

## Implementation Steps

### Step 1 — Fix data layer
- [ ] Filter `isPublished: true` in `getProducts`
- [ ] Restore enrichment + DTO mapping in `fetchProducts`
- [ ] Verify return shape: `{ products: ProductCardDTO[], meta }`

### Step 2 — Build shop UI components
- [ ] `ShopHeader` — dynamic title (category name or "Shop"), count from `meta.total`
- [ ] `CategoryFilter` — fetch categories, link to `/shop?categorySlug=...`, "All" clears filter
- [ ] `ProductGrid` — responsive grid (`sm:2 md:3 lg:4`), maps `ProductCard`
- [ ] `ShopPagination` — links preserve current `search` + `categorySlug`
- [ ] `ShopEmpty` — shown when `products.length === 0`
- [ ] `ShopFiltersSheet` — mobile filter trigger

### Step 3 — Shop page
- [ ] `shop/page.tsx` as async server component with `searchParams` prop
- [ ] Default `limit` of 12
- [ ] Resolve category name for header when `categorySlug` is active
- [ ] `shop/loading.tsx` with skeleton grid

### Step 4 — Wire existing UI
- [ ] Navbar search → `/shop`
- [ ] Hero "Shop Now" → `/shop`

### Step 5 — Smoke test
- [ ] `/shop` shows published products with pagination
- [ ] Category filter updates URL and results
- [ ] Search from navbar lands on `/shop?search=...`
- [ ] Empty state when no matches
- [ ] Logged-in user sees cart state on cards (`isCarted`)
- [ ] Mobile layout: filter sheet works

---

## Test Plan

| Scenario | Expected |
|----------|----------|
| Visit `/shop` | Grid of published products, paginated |
| Click category | URL updates, grid filters, count updates |
| Search "xyz" with no matches | Empty state with clear-filters link |
| Page 2 | Correct slice of products, prev/next work |
| Draft/unpublished product | Not visible on shop page |
| Navbar search submit | Navigates to `/shop?search=...` |
| Hero "Shop Now" | Navigates to `/shop` |
| Mobile viewport | Categories in sheet, grid responsive |

---

## Risks & Notes

1. **`getCategories()` uses client-side fetch** — currently calls the API via `NEXT_PUBLIC_APP_URL`. For the server component shop page, prefer a direct DB call or a server-side category fetch to avoid self-fetch issues in dev/SSR. May add `getCategories` to a server action or call `Category.find()` directly in the page.

2. **Category hierarchy** — MVP shows flat list of all categories. Nested drill-down can come in Phase 2.

3. **Search index** — relies on MongoDB text index on `title` + `description` (already defined on Product schema).

4. **Admin `fetchProducts`** — adding `isPublished: true` to `getProducts` will affect admin product list. If admin needs drafts, add an `includeUnpublished` option or a separate admin query. **Decision needed:** scope `isPublished` filter to shop only vs. global `getProducts` change.

---

## Estimated Touch Points

- **Modify:** 4 existing files
- **Create:** ~7 new files
- **No new dependencies**

---

## Confirmation

Reply **"proceed"** (or note any changes to scope) and implementation will begin following this plan.
