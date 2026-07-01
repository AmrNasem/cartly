import mongoose from "mongoose";
import { getSeedUsers } from "./users";
import { seedCategories as categories } from "./categories";
import { seedCoupons as coupons } from "./coupons";

import {
  batch1 as batch1Products,
  batch2 as batch2Products,
  batch3 as batch3Products,
} from "./products";
import { Category, Coupon, Product } from "@/lib/models";
import slugify from "slugify";
import { auth, db } from "@/lib/auth/auth";
import { IProduct } from "@/lib/models/product";
import { connectDB } from "@/lib/db";

const categoryMap: Record<string, mongoose.Types.ObjectId> = {};

async function seedUsers() {
  await Promise.all([
    db.collection("user").deleteMany({}),
    db.collection("account").deleteMany({}),
    db.collection("session").deleteMany({}),
    db.collection("verification").deleteMany({}),
  ]);

  const users = getSeedUsers();
  const seededUsers = [];

  for (const user of users) {
    const result = await auth.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        callbackURL: "/",
      },
    });

    seededUsers.push(result);
  }

  console.log("Users seeded");
  return seededUsers;
}

async function seedCategories(adminIds: string[]) {
  await Category.deleteMany({});
  for (const parent of categories) {
    const adminId = adminIds[Math.floor(adminIds.length * Math.random())];
    const parentCategory = await Category.create({
      name: parent.name,
      slug: slugify(parent.name, { lower: true, strict: true }),
      description: parent.description,
      createdBy: adminId,
    });

    categoryMap[parent.name] = parentCategory._id;

    for (const child of parent.children) {
      const childCategory = await Category.create({
        name: child.name,
        slug: slugify(child.name, { lower: true, strict: true }),
        description: child.description,
        parentId: parentCategory._id,
        createdBy: adminId,
      });

      categoryMap[child.name] = childCategory._id;
    }
  }

  console.log("Categories seeded");
}

async function seedCoupons(adminIds: string[]) {
  await Coupon.deleteMany({});
  const resolvedCoupons = coupons.map((coupon) => {
    const createdBy = adminIds[Math.floor(Math.random() * adminIds.length)];
    return { ...coupon, createdBy };
  });
  await Coupon.insertMany(resolvedCoupons);
  console.log("Coupons seeded");
}

/**
 * FIX PRODUCTS BEFORE INSERT:
 * replace CATEGORY_IDS placeholder with real DB ids
 */
function resolveProducts(
  adminIds: string[],
  products: Partial<IProduct & { categoryName?: string }>[],
) {
  return products.map((p) => {
    const adminId = adminIds[Math.floor(Math.random() * adminIds.length)];
    return {
      ...p,
      categoryId: categoryMap[p.categoryName ?? inferCategory(p.title ?? "")],
      createdBy: adminId,
      lastUpdatedBy: adminId,
    };
  });
}

/**
 * fallback mapping based on title keywords
 */
function inferCategory(title: string): string {
  const t = title.toLowerCase();

  if (t.includes("iphone") || t.includes("samsung") || t.includes("phone"))
    return "Smartphones";

  if (t.includes("macbook") || t.includes("laptop") || t.includes("dell"))
    return "Laptops";

  if (t.includes("watch")) return "Smartwatches";

  if (t.includes("head") || t.includes("audio")) return "Audio";

  if (t.includes("shirt") || t.includes("jeans")) return "Men's Clothing";

  if (t.includes("dress") || t.includes("hoodie")) return "Women's Clothing";

  if (t.includes("shoe") || t.includes("nike") || t.includes("adidas"))
    return "Shoes";

  if (t.includes("book")) return "Fiction";

  if (t.includes("console") || t.includes("playstation") || t.includes("xbox"))
    return "Consoles";

  if (t.includes("keyboard") || t.includes("headset"))
    return "Gaming Accessories";

  if (t.includes("sofa") || t.includes("lamp")) return "Furniture";

  if (t.includes("serum") || t.includes("lipstick")) return "Skincare";

  return "Fiction"; // safe fallback
}

async function seedProducts(adminIds: string[]) {
  await Product.deleteMany({});

  const allProducts = [...batch1Products, ...batch2Products, ...batch3Products];

  const resolved = resolveProducts(adminIds, allProducts);
  await Product.insertMany(resolved);

  console.log("Products seeded:", resolved.length);
}

async function seedAll() {
  try {
    await connectDB();

    const users = await seedUsers();

    const adminIds = users
      .filter((user) => user.user.role === "admin")
      .map((user) => user.user.id);
    await seedCategories(adminIds);
    await seedCoupons(adminIds);
    await seedProducts(adminIds);

    console.log("✅ SEED COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED:", err);
    process.exit(1);
  }
}

seedAll();
