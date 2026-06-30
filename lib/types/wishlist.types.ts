import { ProductCardDTO } from "./product.types";

export type WishlistItemDTO = {
  id: string;
  userId: string;
  product: ProductCardDTO & {
    description: string;
    stock: number;
    lowStockThreshold: number;
  };
};
