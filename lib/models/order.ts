import mongoose, { Document, Model, Schema } from "mongoose";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentMethod = "STRIPE" | "COD";

export interface IOrderItem {
  _id?: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  titleSnapshot: string;
  priceSnapshot: number;
  quantity: number;
}

export type ShippingAddress = {
  fullName: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
};

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  assignedAdminId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  couponCode: string;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentProvider: string;
  paymentIntentId: string;
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
    assignedAdminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },

    items: { type: [OrderItemSchema], required: true },

    totalAmount: { type: Number, required: true, min: 0 },
    couponCode: { type: String, default: null },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELED"],
      default: "PENDING",
      uppercase: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      uppercase: true,
    },

    paymentMethod: {
      type: String,
      enum: ["STRIPE", "COD"],
      uppercase: true,
      required: true,
    },
    paymentProvider: { type: String, default: null },
    paymentIntentId: { type: String, default: null },

    shippingAddress: {
      fullName: String,
      phone: String,
      country: String,
      city: String,
      street: String,
      postalCode: String,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

// Hot-reload safe model export (Next.js / serverless)
const Order: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
export { OrderSchema, OrderItemSchema };
