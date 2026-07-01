"use client";

import { CategoryTreeNode } from "@/lib/utils/category-tree";
import { ShopFilters, buildShopUrl } from "@/lib/utils/shop-url";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CategoryTreeFilterProps = {
  tree: CategoryTreeNode[];
  filters: ShopFilters;
  activeCategorySlug?: string;
  defaultExpandedSlugs?: string[];
  className?: string;
};

function CategoryTreeFilter({
  tree,
  filters,
  activeCategorySlug,
  defaultExpandedSlugs = [],
  className,
}: CategoryTreeFilterProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedSlugs),
  );

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <nav className={cn("space-y-1", className)} aria-label="Product categories">
      <h2 className="text-sm font-semibold text-foreground mb-3">Categories</h2>
      <Link
        href={buildShopUrl({ ...filters, categorySlug: undefined })}
        className={cn(
          "block rounded-md px-3 py-2 text-sm transition-colors",
          !activeCategorySlug
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        )}
      >
        All
      </Link>
      {tree.map((node) => (
        <CategoryTreeNodeItem
          key={node.slug}
          node={node}
          depth={0}
          filters={filters}
          activeCategorySlug={activeCategorySlug}
          expanded={expanded}
          toggle={toggle}
        />
      ))}
    </nav>
  );
}

type CategoryTreeNodeItemProps = {
  node: CategoryTreeNode;
  depth: number;
  filters: ShopFilters;
  activeCategorySlug?: string;
  expanded: Set<string>;
  toggle: (slug: string) => void;
};

function CategoryTreeNodeItem({
  node,
  depth,
  filters,
  activeCategorySlug,
  expanded,
  toggle,
}: CategoryTreeNodeItemProps) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.slug);
  const isActive = activeCategorySlug === node.slug;
  const paddingLeft = 12 + depth * 12;

  if (hasChildren) {
    return (
      <div>
        <Link
          style={{ paddingLeft }}
          href={buildShopUrl({ ...filters, categorySlug: node.slug })}
          className={cn(
            "flex gap-1 items-center grow rounded-md p-2 pr-3 text-sm transition-colors",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(node.slug)
            }}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${node.name}`}
            className="cursor-pointer rounded-md p-0.5 text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-colors"
          >
            <ChevronRight
              className={cn(
                "size-4 transition-transform duration-150",
                isExpanded && "rotate-90",
              )}
            />
          </button>

          {node.name}
        </Link>
        {isExpanded && (
          <div className="mt-1">
            {node.children.map((child) => (
              <CategoryTreeNodeItem
                key={child.slug}
                node={child}
                depth={depth + 1}
                filters={filters}
                activeCategorySlug={activeCategorySlug}
                expanded={expanded}
                toggle={toggle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={buildShopUrl({ ...filters, categorySlug: node.slug })}
      style={{ paddingLeft: paddingLeft + 28 }}
      className={cn(
        "block rounded-md py-2 pr-3 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {node.name}
    </Link>
  );
}

export default CategoryTreeFilter;
