import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICart extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem extends Document {
  _id: mongoose.Types.ObjectId;
  cartId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartItemSchema = new Schema<ICartItem>(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    quantity: { type: Number, required: true, default: 1, min: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CartItemSchema.index({ productId: 1, cartId: 1 }, { unique: true });

// Hot-reload safe model exports
const Cart: Model<ICart> =
  (mongoose.models.Cart as Model<ICart>) ||
  mongoose.model<ICart>("Cart", CartSchema);
const CartItem: Model<ICartItem> =
  (mongoose.models.CartItem as Model<ICartItem>) ||
  mongoose.model<ICartItem>("CartItem", CartItemSchema);

export default Cart;
export { CartItem, CartSchema, CartItemSchema };
