import { categoryDTO } from "../types/category.types";

export function mapCategoryDTO(category: any): categoryDTO {
  return {
    id: category._id.toString(),
    name: category.name,
    description: category.description,
    slug: category.slug,
    parentId: category.parentId,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
