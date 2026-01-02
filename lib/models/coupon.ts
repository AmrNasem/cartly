import mongoose, { Document, Model, Schema } from "mongoose";

export type DiscountType = "percentage" | "fixed";

export interface ICoupon extends Document {
  _id: mongoose.Types.ObjectId;
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  perUserLimit?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  minCartValue?: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: mongoose.Types.ObjectId;
  calculateDiscount: (subtotal: number) => number;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    description: { type: String, default: "" },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    maxDiscount: { type: Number, default: null },
    usageLimit: { type: Number, default: null },
    perUserLimit: { type: Number, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    minCartValue: { type: Number, default: null, min: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
CouponSchema.index(
  { code: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  }
);
CouponSchema.methods.calculateDiscount = function (subtotal: number): number {
  if (!this.isActive) return 0;

  if (this.minCartValue && subtotal < this.minCartValue) {
    return 0;
  }

  let discount = 0;

  if (this.discountType === "percentage") {
    discount = (subtotal * this.discountValue) / 100;
  }

  if (this.discountType === "fixed") {
    discount = this.discountValue;
  }

  if (this.maxDiscount) {
    discount = Math.min(discount, this.maxDiscount);
  }

  return Math.max(discount, 0);
};
// Hot-reload safe model export
const Coupon: Model<ICoupon> =
  (mongoose.models.Coupon as Model<ICoupon>) ||
  mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
export { CouponSchema };
