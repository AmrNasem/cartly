export type categoryDTO = {
  createdAt: string;
  description?: string;
  name: string;
  parentId: string | null;
  slug: string;
  updatedAt: string;
  id: string;
};

export type CategoryPath = { id: string; slug: string; name: string };

export type HomeCategoryDTO = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  thumbnail: string;
};