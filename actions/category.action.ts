"use server";

import { connectDB } from "@/lib/db";
import { mapCategoryDTO } from "@/lib/mappers/category.mapper";
import { Category } from "@/lib/models";
import { categoryDTO } from "@/lib/types/category.types";

export async function fetchCategories(): Promise<categoryDTO[]> {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return categories.map((category) => mapCategoryDTO(category));
}
