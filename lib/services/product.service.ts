import { CartItem, Category, Order, Product } from "@/lib/models";
import { mapProductCardDTO } from "@/lib/mappers/product.mapper";
import { enrichProducts } from "../product/enrich-product";
import { queryOptions } from "../types/product.types";

export async function getFeaturedProducts(limit = 8) {
  const products = await Product.find({ deletedAt: null, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  const formattedProducts = products.map((product) =>
    mapProductCardDTO(product)
  );
  return formattedProducts;
}

export async function getRecommendedProducts(userId: string, limit = 12) {
  // 1️⃣ Get categories of past orders
  const pastOrders = await Order.find({ userId });

  // Gather all previously purchased product IDs
  const purchasedProductIds = pastOrders.flatMap((order) =>
    order.items.map((i) => i.productId.toString())
  );

  // Find categories of purchased products
  const purchasedCategories = await Product.find({
    _id: { $in: purchasedProductIds },
  }).distinct("categoryId");

  // Gather all product IDs currently in cart
  const cartProductIds = await CartItem.find({ userId }).distinct("productId");
  const cartProductIdsStr = cartProductIds.map((id) => id.toString());

  // Find categories of products in cart
  const cartCategories = await Product.find({
    _id: { $in: cartProductIds },
  }).distinct("categoryId");

  // Union categories from purchases and cart
  const recommendedCategories = Array.from(
    new Set(
      [...purchasedCategories, ...cartCategories].map((id) => id.toString())
    )
  );

  // 3️⃣ Exclude products already in cart or purchased (IDs to string for consistency)
  const excludedProductIds = new Set([
    ...purchasedProductIds,
    ...cartProductIdsStr,
  ]);

  // Optional minimal optimization: Prefer in-stock, published products and randomize a bit
  const recommendedProducts = await Product.find({
    categoryId: { $in: recommendedCategories },
    _id: { $nin: Array.from(excludedProductIds) },
    deletedAt: null,
    isPublished: true,
    stock: { $gt: 0 },
  })
    .sort({ averageRate: -1, createdAt: -1 }) // prioritize popular and new products
    .limit(limit)
    .lean();

  // Minimal logic to avoid empty, fall back to latest if nothing found
  if (!recommendedProducts.length) {
    const products = await Product.find({
      deletedAt: null,
      isPublished: true,
      stock: { $gt: 0 },
      _id: { $nin: Array.from(excludedProductIds) },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return products.map((product) => mapProductCardDTO(product));
  }

  return recommendedProducts.map((product) => mapProductCardDTO(product));
}

export async function getProducts(options: queryOptions = {}) {
  const { limit, page, categorySlug, search } = options;
  const boundedLimit = Math.min(Number(limit) || 12, 50);
  const boundedPage = Math.max(Number(page) || 1, 1);
  const skip = (boundedPage - 1) * boundedLimit;

  const query: Record<string, any> = {
    deletedAt: null,
  };

  if (search) query.$text = { $search: search };

  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) query.categoryId = category._id;
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate(["categoryId"])
      .sort({ createdAt: -1 })
      .limit(boundedLimit)
      .skip(skip)
      .lean(),
    Product.countDocuments(query),
  ]);

  const enrichedProducts = await enrichProducts(products);

  const totalPages = Math.ceil(total / boundedLimit);

  return {
    products: enrichedProducts,
    meta: {
      page: boundedPage,
      limit: boundedLimit,
      total,
      totalPages,
      hasNextPage: totalPages > boundedPage,
      hasPrevPage: boundedPage > 1,
    },
  };
}