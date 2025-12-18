import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICouponUsage extends Document {
  _id: mongoose.Types.ObjectId;
  couponId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId | null;
  orderId?: mongoose.Types.ObjectId | null;
  usedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CouponUsageSchema = new Schema<ICouponUsage>(
  {
    couponId: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
      index: true,
    },
    usedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hot-reload safe model export
const CouponUsage: Model<ICouponUsage> =
  (mongoose.models.CouponUsage as Model<ICouponUsage>) ||
  mongoose.model<ICouponUsage>("CouponUsage", CouponUsageSchema);

export default CouponUsage;
export { CouponUsageSchema };
