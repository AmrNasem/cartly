import { categoryDTO } from "@/lib/types/category.types";

export type CategoryTreeNode = categoryDTO & {
  children: CategoryTreeNode[];
};

export function buildCategoryTree(categories: categoryDTO[]): CategoryTreeNode[] {
  const nodes = new Map<string, CategoryTreeNode>();

  for (const category of categories) {
    nodes.set(category.id, { ...category, children: [] });
  }

  const roots: CategoryTreeNode[] = [];

  for (const node of nodes.values()) {
    if (node.parentId && nodes.has(node.parentId)) {
      nodes.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortNodes = (items: CategoryTreeNode[]) => {
    items.sort((a, b) => a.name.localeCompare(b.name));
    items.forEach((item) => sortNodes(item.children));
  };

  sortNodes(roots);
  return roots;
}

export function findCategoryBySlug(
  categories: categoryDTO[],
  slug: string,
): categoryDTO | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getDescendantIds(
  categories: categoryDTO[],
  categoryId: string,
): string[] {
  const ids = new Set<string>([categoryId]);

  const collect = (parentId: string) => {
    for (const category of categories) {
      if (category.parentId === parentId && !ids.has(category.id)) {
        ids.add(category.id);
        collect(category.id);
      }
    }
  };

  collect(categoryId);
  return Array.from(ids);
}

export function getAncestorSlugs(
  categories: categoryDTO[],
  slug: string,
): string[] {
  const slugs: string[] = [];
  let current = findCategoryBySlug(categories, slug);

  while (current?.parentId) {
    const parent = categories.find((category) => category.id === current!.parentId);
    if (!parent) break;
    slugs.unshift(parent.slug);
    current = parent;
  }

  return slugs;
}
