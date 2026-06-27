"use server";

import { connectDB } from "@/lib/db";
import { mapCategoryDTO } from "@/lib/mappers/category.mapper";
import { Category } from "@/lib/models";
import { categoryDTO, HomeCategoryDTO } from "@/lib/types/category.types";
import { getHomeCategories } from "@/lib/services/category.service";

export async function fetchCategories(): Promise<categoryDTO[]> {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return categories.map((category) => mapCategoryDTO(category));
}

export async function fetchHomeCategories(
  limit = 6,
): Promise<HomeCategoryDTO[]> {
  await connectDB();
  return getHomeCategories(limit);
}
