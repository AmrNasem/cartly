import { mapCategoryDTO } from "../mappers/category.mapper";

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
