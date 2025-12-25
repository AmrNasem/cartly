import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models";
import { enrichProducts } from "@/lib/product/enrich-product";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(true);
    const { id: productId } = await params;

    if (!productId) throw new APIError("Missing id param", 400);

    await connectDB();
    const product = await Product.findOne({ _id: productId, deletedAt: null });
    if (!product) throw new APIError("Product not found", 404);

    product.deletedAt = new Date();
    await product.save();

    return new Response(
      JSON.stringify({
        message: "Product Deleted Successfully!",
        payload: product,
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
    const { id: slug } = await params;

    if (!slug) throw new APIError("Missing slug param", 400);

    await connectDB();
    const product = await Product.findOne({ slug, deletedAt: null }).lean();
    if (!product) throw new APIError("Product not found", 404);

    const enrichedProduct = await enrichProducts([product]);

    return new Response(
      JSON.stringify({
        message: "Product fetched successfully!",
        payload: enrichedProduct,
      })
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(true);
    const { id: productId } = await params;

    if (!productId) throw new APIError("Missing id param!", 400);

    const {
      title,
      description,
      price,
      isPublished,
      categoryId,
      compareAtPrice,
      stock,
    } = await request.json();

    if (
      !title &&
      !description &&
      !price &&
      !isPublished &&
      !categoryId &&
      !compareAtPrice &&
      !stock
    )
      throw new APIError("Nothing to update!", 400);

    await connectDB();
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        title,
        description,
        price,
        compareAtPrice,
        isPublished,
        categoryId,
        stock,
      },
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: "Product updated successfully!",
        payload: updatedProduct,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
