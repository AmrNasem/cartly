import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import { uploadImages, validateImages } from "@/lib/product/upload-images";
import { createUniqueSlug } from "@/lib/utils/slug";

export async function POST(request: Request) {
  try {
    const session = await requireAdmin(true);
    const formData = await request.formData();
    let productData;

    try {
      productData = Object.fromEntries(formData.entries());
    } catch {
      throw new APIError("Invalid JSON data format", 400);
    }

    const {
      title,
      description,
      price,
      isPublished,
      categoryId,
      compareAtPrice,
      stock,
    } = productData;
    const files = formData.getAll("images") as File[];

    if (!title || !price || !categoryId) {
      throw new APIError("Missing required fields", 400);
    }

    const error = validateImages(files);
    if (error) return errorHandler(error);

    const uploadedImages = await uploadImages(files);

    await connectDB();
    const createdProduct = await Product.create({
      title,
      description,
      price,
      compareAtPrice: compareAtPrice || price,
      isPublished,
      categoryId,
      stock,
      images: uploadedImages,
      createdBy: session.user.id,
      slug: createUniqueSlug(title as string),
    });

    return new Response(
      JSON.stringify({ message: "Product created!", payload: createdProduct }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    errorHandler(error);
  }
}
