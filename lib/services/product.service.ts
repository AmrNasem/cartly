import { CartItem, Category, Order, Product, Review } from "@/lib/models";
import { mapSingleReviewDTO } from "@/lib/mappers/product.mapper";
import { queryOptions, ShopSort } from "../types/product.types";
import mongoose, { SortOrder } from "mongoose";
import { computeRatingProgress } from "../product/product.utils";
import { CategoryPath } from "../types/category.types";
import { mapCategoryDTO } from "../mappers/category.mapper";
import { getDescendantIds } from "../utils/category-tree";

function getProductSort(sort: ShopSort = "newest"): Record<string, SortOrder> {
  switch (sort) {
    case "reviews":
      return { numOfReviews: -1, createdAt: -1 };
    case "price":
      return { price: 1, createdAt: -1 };
    case "price-desc":
      return { price: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
}

export async function getFeaturedProducts(limit = 8) {
  const products = await Product.find({ deletedAt: null, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return products;
}

export async function getRecommendedProducts(userId: string, limit = 12) {
  // 1️⃣ Get categories of past orders
  const pastOrders = await Order.find({ userId });

  // Gather all previously purchased product IDs
  const purchasedProductIds = pastOrders.flatMap((order) =>
    order.items.map((i) => i.productId.toString()),
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
      [...purchasedCategories, ...cartCategories].map((id) => id.toString()),
    ),
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
    return products;
  }

  return recommendedProducts;
}

export async function getProducts(options: queryOptions = {}) {
  const {
    limit,
    page,
    categorySlug,
    search,
    publishedOnly,
    onSale,
    inStock,
    sort = "newest",
  } = options;
  const boundedLimit = Math.min(Number(limit) || 12, 50);
  const boundedPage = Math.max(Number(page) || 1, 1);
  const skip = (boundedPage - 1) * boundedLimit;

  const query: Record<string, unknown> = {
    deletedAt: null,
  };

  if (publishedOnly) query.isPublished = true;

  if (search) query.$text = { $search: search };

  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug }).lean();
    if (category) {
      const allCategories = await Category.find().lean();
      const categoryDTOs = allCategories.map((item) => mapCategoryDTO(item));
      const descendantIds = getDescendantIds(
        categoryDTOs,
        category._id.toString(),
      );
      query.categoryId = {
        $in: descendantIds.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }
  }

  if (onSale) {
    query.compareAtPrice = { $gt: 0 };
    query.$expr = { $gt: ["$compareAtPrice", "$price"] };
  }

  if (inStock) {
    query.stock = { $gt: 0 };
  }

  const sortOptions = getProductSort(sort);

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate(["categoryId"])
      .sort(sortOptions)
      .limit(boundedLimit)
      .skip(skip)
      .lean(),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / boundedLimit);

  return {
    products,
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

export async function getProductBySlug(slug: string) {
  const product = await Product.findOne({ slug, deletedAt: null })
    .populate("categoryId")
    .lean();
  if (!product) return {};
  const categories = await Category.find().lean();

  const getCategoryPath = (
    categoryId?: string,
    args: CategoryPath[] = [],
  ): CategoryPath[] => {
    if (!categoryId) return args;
    const category = categories.find(
      (cat) => cat._id.toString() === categoryId,
    );
    if (!category) return args;
    return getCategoryPath(category.parentId?.toString(), [
      { id: category._id.toString(), slug: category.slug, name: category.name },
      ...args,
    ]);
  };
  const categoryPath = getCategoryPath(product.categoryId._id.toString());

  return { product, categoryPath };
}
export async function getReviewsByProductId(
  productId: string,
  page = 1,
  limit = 10,
) {
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Review.find({ productId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name image")
      .lean(),

    Review.countDocuments({ productId }),
  ]);

  return {
    reviews: reviews.map((review) => mapSingleReviewDTO(review)),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getRatingStats(productId: string) {
  const [stats] = await Review.aggregate([
    {
      $match: {
        productId: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$productId",
        totalReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },

        rate1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
        rate2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
        rate3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
        rate4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
        rate5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        totalReviews: 1,
        averageRating: { $round: ["$averageRating", 1] },
        ratings: {
          1: "$rate1",
          2: "$rate2",
          3: "$rate3",
          4: "$rate4",
          5: "$rate5",
        },
      },
    },
  ]);

  const safeStats = stats ?? {
    totalReviews: 0,
    averageRating: 0,
    ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
  return {
    ...safeStats,
    ratings: computeRatingProgress({
      ratings: safeStats.ratings,
      totalReviews: safeStats.totalReviews,
    }),
  };
}
