import mongoose from "mongoose";
import batch1 from "./batch1";
import batch2 from "./batch2";
import batch3 from "./batch3";

export const CATEGORY_IDS = {
  Smartphones: new mongoose.Types.ObjectId(),
  Laptops: new mongoose.Types.ObjectId(),
  Tablets: new mongoose.Types.ObjectId(),
  Audio: new mongoose.Types.ObjectId(),
  Smartwatches: new mongoose.Types.ObjectId(),

  "Men's Clothing": new mongoose.Types.ObjectId(),
  "Women's Clothing": new mongoose.Types.ObjectId(),
  Shoes: new mongoose.Types.ObjectId(),
  Bags: new mongoose.Types.ObjectId(),

  Consoles: new mongoose.Types.ObjectId(),
  Games: new mongoose.Types.ObjectId(),
  "Gaming Accessories": new mongoose.Types.ObjectId(),

  Furniture: new mongoose.Types.ObjectId(),
  "Kitchen Appliances": new mongoose.Types.ObjectId(),
  "Home Decor": new mongoose.Types.ObjectId(),

  Fitness: new mongoose.Types.ObjectId(),
  Camping: new mongoose.Types.ObjectId(),

  Skincare: new mongoose.Types.ObjectId(),
  Makeup: new mongoose.Types.ObjectId(),
  Fragrances: new mongoose.Types.ObjectId(),

  Programming: new mongoose.Types.ObjectId(),
  Business: new mongoose.Types.ObjectId(),
  Fiction: new mongoose.Types.ObjectId(),
};

export { batch1, batch2, batch3 };
