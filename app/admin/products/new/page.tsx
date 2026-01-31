import type { Metadata } from "next";
import NewProductForm from "@/components/admin/products/new/new-product-form";
import { getCategories } from "@/lib/services/category.service";

export const metadata: Metadata = {
  title: "Add New Product",
};

export default async function NewProductPage() {
  const { data: categories, error } = await getCategories();
  return (
    <>
      <NewProductForm categoriesError={error} categories={categories} />
    </>
  );
}
