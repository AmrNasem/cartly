export type ProductCardDTO = {
  slug: string;
  thumbnail: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  rates: number;
  rateAverage: number;
  isNew: boolean;
};

export type ProductImageForm = {
  file: File;
  order: number;
};

export type ProductFormState = {
  title: string;
  description: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  lowStockThreshold: string;
  categoryId: string;
  isPublished: boolean;
  images: ProductImageForm[];
};

export type queryOptions = { limit?: string; page?: string; categorySlug?: string; search?: string; };