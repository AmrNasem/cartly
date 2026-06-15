import mongoose, { Document, Model, Schema } from "mongoose";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentProvider = "STRIPE" | "PAYMOB" | "COD";

export interface IPayment extends Document {
  _id: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  status: PaymentStatus;
  provider: PaymentProvider;
  paymentIntentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      uppercase: true,
    },
    paymentIntentId: {
      type: String,
      default: null
    },
    provider: {
      type: String,
      enum: ["STRIPE", "PAYMOB", "COD"],
      uppercase: true,
      required: true,
    },
    transactionId: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      default: null,
    },
    currency: {
      type: String,
      default: "USD"
    }
  
  },
  { timestamps: true, versionKey: false }
);

// Hot-reload safe model export (Next.js / serverless)
const Payment: Model<IPayment> =
  (mongoose.models.Payment as Model<IPayment>) ||
  mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
export { PaymentSchema };
