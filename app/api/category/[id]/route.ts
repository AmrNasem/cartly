import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(true);
    const { id: categoryId } = await params;

    if (!categoryId) throw new APIError("Missing id param", 400);

    await connectDB();
    const category = await Category.findById(categoryId);
    if (!category) throw new APIError("Category not found", 404);

    const deletedCategory = await category.deleteOne();
    if (!deletedCategory?.acknowledged)
      throw new APIError("Category is not deleted!");

    return new Response(
      JSON.stringify({
        message: "Category Deleted Successfully!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;

    if (!categoryId) throw new APIError("Missing id param", 400);

    await connectDB();
    const subcategories = await Category.find({ parentId: categoryId });

    return new Response(
      JSON.stringify({
        message: "Subcategories fetched successfully!",
        payload: subcategories,
      })
    );
  } catch (err) {
    return errorHandler(err);
  }
}
