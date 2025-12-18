import mongoose, { Document, Model, Schema } from "mongoose";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export interface IOrderItem {
  _id?: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  titleSnapshot: string;
  priceSnapshot: number;
  quantity: number;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress?: string;
  paymentStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    titleSnapshot: { type: String, required: true, trim: true },
    priceSnapshot: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: true }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: { type: [OrderItemSchema], default: [], required: true },
    totalAmount: { type: Number, required: true, min: 0, default: 0 },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELED"],
      default: "PENDING",
    },
    shippingAddress: { type: String, default: "" },
    paymentStatus: { type: String, default: "PENDING" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hot-reload safe model export (Next.js / serverless)
const Order: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
export { OrderSchema, OrderItemSchema };
