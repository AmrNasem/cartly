import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICartCoupon extends Document {
  _id: mongoose.Types.ObjectId;
  cartId: mongoose.Types.ObjectId;
  couponId: mongoose.Types.ObjectId;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CartCouponSchema = new Schema<ICartCoupon>(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
      index: true,
    },
    couponId: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
      index: true,
    },
    appliedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hot-reload safe model export (Next.js / serverless)
const CartCoupon: Model<ICartCoupon> =
  (mongoose.models.CartCoupon as Model<ICartCoupon>) ||
  mongoose.model<ICartCoupon>("CartCoupon", CartCouponSchema);

export default CartCoupon;
export { CartCouponSchema };
