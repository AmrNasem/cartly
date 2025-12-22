import { errorHandler } from "@/lib/api/error-handler";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models";
import { createUniqueSlug } from "@/lib/utils/slug";

export async function POST(request: Request) {
  const { name, description, parentId } = await request.json();
  try {
    const session = await requireAdmin(true);

    await connectDB();
    const createdCategory = await Category.create({
      name,
      description,
      parentId,
      slug: createUniqueSlug(name),
      createdBy: session.user.id,
    });

    return new Response(
      JSON.stringify({
        message: "Category created!",
        payload: createdCategory,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    errorHandler(error);
  }
}
