import mongoose from "mongoose";
import { mapCategoryDTO } from "../mappers/category.mapper";
import { getCategoryFallbackThumbnail, MOCK_HOME_CATEGORIES } from "../mock/home.mock";
import { Category, Product } from "../models";
import { getDescendantIds } from "../utils/category-tree";

export async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category`);
    if (!res.ok) throw new Error("Couldn't fetch categories");
    const data = await res.json();
    if (data.error) throw new Error(data.message);

    const categories = Array.from(data.payload).map((category) =>
      mapCategoryDTO(category)
    );
    return { data: categories, error: "" };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
}

export async function getHomeCategories(limit = 6) {

  const allCategories = await Category.find().sort({ name: 1 }).lean();
  if (allCategories.length === 0) {
    return MOCK_HOME_CATEGORIES.slice(0, limit);
  }

  const categoryDTOs = allCategories.map((category) => mapCategoryDTO(category));
  const rootCategories = categoryDTOs.filter((category) => !category.parentId);

  const categoriesToShow = (
    rootCategories.length > 0 ? rootCategories : categoryDTOs
  ).slice(0, limit);

  const homeCategories = await Promise.all(
    categoriesToShow.map(async (category) => {
      const descendantIds = getDescendantIds(categoryDTOs, category.id);

      const categoryFilter = {
        categoryId: {
          $in: descendantIds.map((id) => new mongoose.Types.ObjectId(id)),
        },
        deletedAt: null,
        isPublished: true,
      };

      const [productCount, firstProduct] = await Promise.all([
        Product.countDocuments(categoryFilter),
        Product.findOne(categoryFilter).sort({ createdAt: -1 }).lean(),
      ]);

      const thumbnail =
        firstProduct?.images?.[0]?.url ??
        getCategoryFallbackThumbnail(category.slug);

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        productCount,
        thumbnail,
      };
    }),
  );

  if (homeCategories.every((category) => category.productCount === 0)) {
    return MOCK_HOME_CATEGORIES.slice(0, limit);
  }

  return homeCategories.filter(category => category.productCount > 0);
}