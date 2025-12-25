import mongoose, { Model, Schema } from "mongoose";

export interface IFavoriteItem extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const FavoriteItemSchema = new Schema<IFavoriteItem>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
FavoriteItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoriteItem: Model<IFavoriteItem> =
  (mongoose.models.FavoriteItem as Model<IFavoriteItem>) ||
  mongoose.model<IFavoriteItem>("FavoriteItem", FavoriteItemSchema);
