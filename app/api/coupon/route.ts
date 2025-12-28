import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Coupon } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const session = await requireAdmin(true);
    const {
      code,
      description,
      discountType,
      discountValue,
      maxDiscount,
      usageLimit,
      perUserLimit,
      startDate,
      endDate,
      minCartValue,
      isActive,
    } = await req.json();
    await connectDB();
    const couponExists = await Coupon.findOne({ code, deletedAt: null });
    if (couponExists) throw new APIError("Coupon already exists!", 400);

    const startsAt = new Date(startDate);
    const endsAt = new Date(endDate);

    if (isNaN(startsAt.getTime()))
      throw new APIError("Invalid start date", 400);

    if (isNaN(endsAt.getTime())) throw new APIError("Invalid end date", 400);

    if (!(endsAt.getTime() > startsAt.getTime()))
      throw new APIError("End date must be greater that start date", 400);

    const coupon = await Coupon.create({
      code,
      description,
      discountType,
      discountValue,
      maxDiscount,
      usageLimit,
      perUserLimit,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      minCartValue,
      isActive,
      createdBy: session.user.id,
    });
    return new Response(
      JSON.stringify({
        message: "Coupon has been created successfully!",
        payload: coupon,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function GET() {
  try {
    await requireAdmin(true);
    await connectDB();
    const coupons = await Coupon.find({ deletedAt: null });
    return new Response(
      JSON.stringify({ message: "Coupons fetched!", payload: coupons })
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE() {
  try {
    await requireAdmin(true);
    await connectDB();
    await Coupon.updateMany({ deletedAt: null }, { deletedAt: new Date() });

    return new Response(
      JSON.stringify({ message: "All coupons have been deleted successfully!" })
    );
  } catch (err) {
    return errorHandler(err);
  }
}
