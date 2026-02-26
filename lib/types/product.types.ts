export type ProductCardDTO = {
  id: string;
  slug: string;
  thumbnail: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  numOfReviews: number;
  averageRate: number;
  isNew: boolean;
  isCarted?: boolean;
  isWishlist?: boolean;
};

export type CartItemDTO = {
  id: string;
  quantity: number;
  product: ProductCardDTO & { description: string; stock: number; lowStockThreshold: number };
  cartId: string;
};

export type Thumbnail = {
  id: string;
  url: string;
  alt?: string;
  order?: number;
  publicId: string;
}

export type SingleProductDTO = {
  description: string;
  stock: number;
  lowStockThreshold: number;
  images: Thumbnail[]
  isCarted: boolean;
  isWishList: boolean;
} & Omit<ProductCardDTO, "thumbnail" | "isNew">;

export type ProductImageForm = {
  file: File;
  order: number;
};

export type SingleReviewDTO = { user: { image: string; name: string; }; createdAt: string; rating: number; comment: string; id: string }

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