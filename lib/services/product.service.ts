import { Product } from "@/lib/models";
import { mapProductCardDTO } from "@/lib/mappers/product.mapper";

export async function getFeaturedProducts(limit = 8) {
  const products = await Product.find({ deletedAt: null })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  const formattedProducts = products.map((product) =>
    mapProductCardDTO(product)
  );
  return formattedProducts;
}
