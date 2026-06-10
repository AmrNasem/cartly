# Shop Filters v2 — Implementation Plan

> **Status:** Implemented (includes Price: High → Low sort)  
> **Builds on:** `[docs/shop-page-plan.md](./shop-page-plan.md)` (MVP shop page)  
> **Goal:** Hierarchical category navigation, sale/in-stock filters, sort options, and active filter chips.

---

## Problem

Categories use `parentId` (tree structure), but the shop sidebar renders a **flat list** of every category at the same level. Parents and subcategories look interchangeable, which is confusing and wrong for browsing.

Additionally, the shop page lacks product-level filters (sale, in-stock), sort controls, and a way to see/clear active filters at a glance.

---

## Scope

### In scope

1. **Hierarchical category tree** — parents expand to reveal children; nested parents expand recursively
2. **Correct category filtering** — selecting a category includes products in that category **and all descendant categories**
3. **Sale filter** — show only products where `compareAtPrice > price`
4. **In-stock filter** — show only products where `stock > 0`
5. **Active filter chips** — one chip per active filter + **Clear all**
6. **Sort dropdown** — newest (default), most reviewed, price (low → high), price (high → low)

### Out of scope (Phase 3)

- Top rated sort
- Multi-select categories
- Filter by rating / price range
- Persist expanded tree state in URL

---

## URL contract

All state remains in search params (shareable URLs):


| Param          | Values                         | Default  | Notes                                   |
| -------------- | ------------------------------ | -------- | --------------------------------------- |
| `categorySlug` | category slug                  | —        | Filters category + all descendants      |
| `search`       | string                         | —        | Existing text search                    |
| `onSale`       | `true`                         | —        | Omit = no sale filter                   |
| `inStock`      | `true`                         | —        | Omit = show all stock states            |
| `sort`         | `newest` \| `reviews` \| `price` \| `price-desc` | `newest` | Omit from URL when default              |
| `page`         | number                         | `1`      | Reset to 1 when any filter/sort changes |


Example:

```
/shop?categorySlug=electronics&onSale=true&inStock=true&sort=price&page=2
```

---

## Feature 1 — Category tree

### UX behavior

```
Categories
  [All]                          ← link, clears category filter

  ▶ Electronics                  ← button: expand/collapse only (has children)
    ▶ Phones                     ← nested parent: also expandable
      • iPhone                   ← link: applies filter
      • Android                  ← link: applies filter
    • Laptops                    ← link: leaf, applies filter

  ▶ Clothing
    • Men
    • Women
```


| Node type              | Interaction                                        |
| ---------------------- | -------------------------------------------------- |
| **Parent** (has kids)  | Chevron button toggles expand/collapse             |
| **Leaf** (no children) | Link → sets `categorySlug`, preserves other params |
| **All**                | Link → removes `categorySlug`                      |


**Auto-expand:** On load, expand every ancestor of the active `categorySlug` so the selected category is visible.

**Active state:** Highlight the link for the active category (bold / primary background).

### Data layer

**New utility:** `lib/utils/category-tree.ts`

```ts
type CategoryTreeNode = categoryDTO & { children: CategoryTreeNode[] };

buildCategoryTree(categories: categoryDTO[]): CategoryTreeNode[]
getDescendantIds(categories: categoryDTO[], categoryId: string): string[]
findCategoryBySlug(categories: categoryDTO[], slug: string): categoryDTO | undefined
getAncestorSlugs(categories: categoryDTO[], slug: string): string[]  // for auto-expand
```

**Fix mapper bug:** `lib/mappers/category.mapper.ts` — normalize `parentId` to `string | null` (currently may be ObjectId, breaking tree building vs admin code that compares to `""`).

**Backend change:** `getProducts()` in `lib/services/product.service.ts`

When `categorySlug` is set:

1. Resolve category by slug
2. Load all categories (or pass preloaded list)
3. Compute descendant IDs via `getDescendantIds`
4. Query: `categoryId: { $in: [categoryId, ...descendantIds] }`

This ensures selecting "Electronics" returns products tagged under any subcategory.

### Components


| File                                       | Change                                                              |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `components/shop/category-tree-filter.tsx` | **New** — client component, recursive tree with expand state        |
| `components/shop/category-filter.tsx`      | Refactor to thin wrapper: builds tree, renders `CategoryTreeFilter` |
| `components/shop/shop-filters-sheet.tsx`   | Pass full filter props (not just category)                          |


Expand/collapse uses local `useState` (no new UI dependency). Chevron icons from `lucide-react`.

---

## Feature 2 — Sale & in-stock filters

### Semantics


| Filter       | Query when active (`=true`)                                                   | Matches existing conventions       |
| ------------ | ----------------------------------------------------------------------------- | ---------------------------------- |
| **On sale**  | `compareAtPrice: { $gt: 0 }`, `$expr: { $gt: ["$compareAtPrice", "$price"] }` | Same as `ProductCard` sale badge   |
| **In stock** | `stock: { $gt: 0 }`                                                           | Same as recommended products logic |


Both are **opt-in toggles** — unchecked = not applied (show all).

### UI

Place below the category tree in the sidebar (and in mobile sheet):

```
Filters
  ☐ On sale only
  ☐ In stock only
```

Implementation: checkbox + `<Link>` or client navigation that toggles the param in URL (prefer link-based for SSR consistency, same pattern as categories).

**New component:** `components/shop/shop-product-filters.tsx`

---

## Feature 3 — Sort dropdown

### Options


| Label           | `sort` value | MongoDB sort                          |
| --------------- | ------------ | ------------------------------------- |
| Newest          | *(default)*  | `{ createdAt: -1 }`                   |
| Most reviewed   | `reviews`    | `{ numOfReviews: -1, createdAt: -1 }` |
| Price: Low–High | `price`      | `{ price: 1, createdAt: -1 }`         |


Omit `sort` from URL when `newest` (keeps URLs clean).

**New component:** `components/shop/shop-sort.tsx` — client `Select` that navigates on change (preserves all other params, resets `page`).

Place above the product grid, right-aligned on desktop; below header on mobile.

---

## Feature 4 — Active filter chips

**New component:** `components/shop/shop-filter-chips.tsx`

Renders a row of removable chips when any filter is active:


| Active param         | Chip label example    | Remove action               |
| -------------------- | --------------------- | --------------------------- |
| `search`             | Search: "headphones"  | Link without `search`       |
| `categorySlug`       | Category: Electronics | Link without `categorySlug` |
| `onSale=true`        | On sale               | Link without `onSale`       |
| `inStock=true`       | In stock              | Link without `inStock`      |
| `sort` (non-default) | Sort: Price low–high  | Link without `sort`         |


**Clear all** — visible when ≥1 chip; links to `/shop` ( strips all params).

Place between `ShopHeader` and the main grid/sidebar layout.

Each chip: label + `×` link built via `buildShopUrl()` with that param omitted.

---

## Shared infrastructure updates

### `lib/utils/shop-url.ts`

Extend `ShopUrlParams`:

```ts
type ShopUrlParams = {
  search?: string;
  categorySlug?: string;
  page?: number | string;
  onSale?: boolean;
  inStock?: boolean;
  sort?: "newest" | "reviews" | "price";
};

// Helpers:
omitShopParam(current, paramToRemove): ShopUrlParams
hasActiveShopFilters(params): boolean
parseShopSearchParams(searchParams): ShopFilters  // typed parse for page
```

When toggling any filter or sort, always reset `page` to 1.

### `lib/types/product.types.ts`

```ts
export type ShopSort = "newest" | "reviews" | "price";

export type queryOptions = {
  // existing...
  onSale?: boolean;
  inStock?: boolean;
  sort?: ShopSort;
};
```

### `lib/services/product.service.ts`

Update `getProducts()`:

- Apply sale / in-stock query conditions
- Dynamic `.sort()` based on `sort` option
- Category descendant `$in` query (Feature 1)

### `actions/product.action.ts`

Pass new options through `fetchShopProducts` unchanged (already spreads `queryOptions`).

### Page & dependent components


| File                                  | Change                                            |
| ------------------------------------- | ------------------------------------------------- |
| `app/(shop)/shop/page.tsx`            | Parse new params; pass to all child components    |
| `components/shop/shop-pagination.tsx` | Preserve `onSale`, `inStock`, `sort` in links     |
| `components/shop/shop-empty.tsx`      | Clear-all uses full param set                     |
| `components/shop/shop-header.tsx`     | Optionally simplify (chips handle filter summary) |


---

## File summary

### Create (~5 files)


| File                                       | Purpose                            |
| ------------------------------------------ | ---------------------------------- |
| `lib/utils/category-tree.ts`               | Tree build, descendants, ancestors |
| `components/shop/category-tree-filter.tsx` | Recursive expandable category UI   |
| `components/shop/shop-product-filters.tsx` | Sale + in-stock toggles            |
| `components/shop/shop-sort.tsx`            | Sort dropdown                      |
| `components/shop/shop-filter-chips.tsx`    | Active filters + clear all         |


### Modify (~10 files)


| File                                     | Purpose                                  |
| ---------------------------------------- | ---------------------------------------- |
| `lib/mappers/category.mapper.ts`         | Fix `parentId` string normalization      |
| `lib/types/product.types.ts`             | `ShopSort`, extended `queryOptions`      |
| `lib/utils/shop-url.ts`                  | New params + helpers                     |
| `lib/services/product.service.ts`        | Filters, sort, descendant category query |
| `components/shop/category-filter.tsx`    | Delegate to tree component               |
| `components/shop/shop-filters-sheet.tsx` | Include product filters                  |
| `app/(shop)/shop/page.tsx`               | Wire all new features                    |
| `components/shop/shop-pagination.tsx`    | Preserve new URL params                  |
| `components/shop/shop-empty.tsx`         | Updated clear filters                    |
| `docs/shop-page-plan.md`                 | Cross-reference v2 plan                  |


---

## Implementation order

### Step 1 — Category tree foundation

- Fix `parentId` in category mapper
- Add `category-tree.ts` utilities
- Update `getProducts` category filter to use descendant IDs
- Build `CategoryTreeFilter` with expand/collapse + auto-expand active path

### Step 2 — Product filters

- Extend `queryOptions` + `getProducts` for `onSale` / `inStock`
- Build `ShopProductFilters` toggle UI
- Extend `buildShopUrl`

### Step 3 — Sort

- Add sort to `queryOptions` + `getProducts`
- Build `ShopSort` dropdown

### Step 4 — Filter chips & page integration

- Build `ShopFilterChips` with remove + clear all
- Update shop page layout (sort bar, chips row)
- Update pagination, empty state, mobile sheet

### Step 5 — Verify

- Parent category filter returns products from subcategories
- Tree expand/collapse works at arbitrary depth
- Sale filter matches ProductCard sale badge logic
- In-stock filter excludes `stock: 0`
- Sort options produce correct order
- Chips reflect all active filters; clear all resets to `/shop`
- Pagination preserves all active params

---

## Test plan


| Scenario                           | Expected                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Click `▶ Electronics`              | Subcategories reveal; URL unchanged                                       |
| Click leaf "Laptops"               | URL `?categorySlug=laptops`, products from laptops + any nested cats      |
| Select parent with nested children | Products from entire subtree                                              |
| Active subcategory loads           | Ancestor nodes auto-expanded                                              |
| Toggle "On sale"                   | Only discounted products shown; chip appears                              |
| Toggle "In stock"                  | Zero-stock products hidden; chip appears                                  |
| Sort by price                      | Cheapest first; chip shows sort (optional) or dropdown reflects selection |
| Remove single chip                 | That filter cleared, others preserved                                     |
| Clear all                          | Navigates to `/shop`, no params                                           |
| Mobile sheet                       | Tree + sale/stock filters work same as desktop sidebar                    |


---

## Risks & notes

1. **Products on parent categories** — If a product is assigned directly to a parent category (not a leaf), descendant `$in` query still includes it when filtering that parent. Good.
2. **Empty parent expansion** — A parent with zero products across its subtree still expands; grid shows empty state. Acceptable.
3. `**parentId` mapper fix** — May affect admin category selects; verify `organization.tsx` still resolves root categories (`parentId === null` / `""`).
4. **MongoDB `$expr` for sale** — Needed because sale is computed (`compareAtPrice > price`). Alternative: denormalized `isOnSale` field (not in scope).
5. **Sort + text search** — Text search score sorting not requested; keep `createdAt` as tiebreaker.

---

## Confirmation

Reply **"proceed"** (or note changes to scope) and implementation will begin following this plan.