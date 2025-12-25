import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Category, Product } from "@/lib/models";
import { enrichProducts } from "@/lib/product/enrich-product";
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

    const requiredFields: string[] = [];
    if (!title) requiredFields.push("Title");
    if (!price) requiredFields.push("Price");
    if (!categoryId) requiredFields.push("Category");
    if (requiredFields.length > 0)
      throw new APIError(`[${requiredFields}] required fields!`, 400);

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
    return errorHandler(error);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const skip = (page - 1) * limit;
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("search");

    const query: Record<string, any> = {
      deletedAt: null,
    };

    if (search) query.$text = { $search: search };

    await connectDB();

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) query.categoryId = category._id;
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate(["categoryId"])
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Product.countDocuments(query),
    ]);

    const enrichedProducts = await enrichProducts(products);

    const totalPages = Math.ceil(total / limit);

    return new Response(
      JSON.stringify({
        message: "Products fetched successfully!",
        payload: {
          products: enrichedProducts,
          meta: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: totalPages > page,
            hasPrevPage: page > 1,
          },
        },
      })
    );
  } catch (err) {
    return errorHandler(err);
  }
}
