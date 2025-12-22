import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProductImage {
  _id?: mongoose.Types.ObjectId;
  url: string;
  alt?: string;
  order?: number;
  publicId?: string;
}

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  isPublished: boolean;
  images: IProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
    publicId: { type: String, trim: true },
  },
  { _id: true }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, default: 0 },
    stock: { type: Number, default: 1 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: false },
    images: { type: [ProductImageSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hot-reload safe model export (Next.js / serverless)
const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
export { ProductSchema, ProductImageSchema };
