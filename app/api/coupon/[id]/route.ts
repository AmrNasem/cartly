import { errorHandler } from "@/lib/api/error-handler";
import { APIError } from "@/lib/api/errors";
import { requireAdmin } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db";
import { Coupon, CouponUsage } from "@/lib/models";
import { validateCouponUpdate } from "@/lib/validators/coupon-update";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: couponId } = await params;
    await requireAdmin();
    const updates = await req.json();
    await connectDB();
    const coupon = await Coupon.findOne({ _id: couponId, deletedAt: null });
    if (!coupon) throw new APIError("Coupon does not exist!", 404);

    const usedCount = await CouponUsage.find({ couponId }).countDocuments();

    validateCouponUpdate(coupon, updates, usedCount);

    const dates: { startDate?: Date; endDate?: Date } = {};
    if ("startDate" in updates) {
      const date = new Date(updates.startDate);
      if (isNaN(date.getTime())) throw new APIError("Invalid startDate!", 400);
      dates.startDate = date;
    }
    if ("endDate" in updates) {
      const date = new Date(updates.endDate);
      if (isNaN(date.getTime())) throw new APIError("Invalid endDate!", 400);
      dates.endDate = date;
    }

    Object.assign(coupon, {
      ...updates,
      ...dates,
    });

    await coupon.save();

    return new Response(
      JSON.stringify({
        message: "Coupon has been updated successfully!",
        payload: coupon,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(true);
    const { id: couponId } = await params;
    await connectDB();
    const coupon = await Coupon.findOne({ _id: couponId, deletedAt: null });
    if (!coupon) throw new APIError("Coupon not found!", 404);
    coupon.deletedAt = new Date();
    await coupon.save();

    return new Response(
      JSON.stringify({ message: "Coupon has been deleted successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return errorHandler(err);
  }
}
