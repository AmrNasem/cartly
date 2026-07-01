import { DiscountType } from "@/lib/models/coupon";

const now = new Date();

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const subDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

type SeedCoupon = {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscount: number | null;
  usageLimit: number | null;
  perUserLimit: number | null;
  startDate: Date | null;
  endDate: Date | null;
  minCartValue: number | null;
  isActive: boolean;
  deletedAt: Date | null;
};

export const seedCoupons: SeedCoupon[] = [
  {
    code: "WELCOME10",
    description: "10% off for new users",
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 50,
    usageLimit: null,
    perUserLimit: 1,
    startDate: now,
    endDate: addDays(30),
    minCartValue: 50,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "SAVE20",
    description: "20% discount on orders above $150",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 100,
    usageLimit: 500,
    perUserLimit: 2,
    startDate: now,
    endDate: addDays(60),
    minCartValue: 150,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "FLAT15",
    description: "$15 off any order above $100",
    discountType: "fixed",
    discountValue: 15,
    maxDiscount: null,
    usageLimit: 300,
    perUserLimit: 3,
    startDate: now,
    endDate: addDays(45),
    minCartValue: 100,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "BIG50",
    description: "$50 flat discount for big purchases",
    discountType: "fixed",
    discountValue: 50,
    maxDiscount: null,
    usageLimit: 100,
    perUserLimit: 1,
    startDate: now,
    endDate: addDays(90),
    minCartValue: 500,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "VIP30",
    description: "VIP users get 30% off",
    discountType: "percentage",
    discountValue: 30,
    maxDiscount: 200,
    usageLimit: 50,
    perUserLimit: 1,
    startDate: now,
    endDate: addDays(20),
    minCartValue: 300,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "FREESHIP",
    description: "Small discount to simulate free shipping ($10 off)",
    discountType: "fixed",
    discountValue: 10,
    maxDiscount: null,
    usageLimit: null,
    perUserLimit: null,
    startDate: now,
    endDate: addDays(100),
    minCartValue: 25,
    isActive: true,
    deletedAt: null,
  },

  {
    code: "MEGA100",
    description: "$100 off high-end orders",
    discountType: "fixed",
    discountValue: 100,
    maxDiscount: null,
    usageLimit: 25,
    perUserLimit: 1,
    startDate: now,
    endDate: addDays(60),
    minCartValue: 1000,
    isActive: true,
    deletedAt: null,
  },

  // expired coupon (tests validation)
  {
    code: "EXPIRED15",
    description: "Expired 15% discount",
    discountType: "percentage",
    discountValue: 15,
    maxDiscount: 60,
    usageLimit: 500,
    perUserLimit: 1,
    startDate: subDays(30),
    endDate: subDays(1),
    minCartValue: 50,
    isActive: true,
    deletedAt: null,
  },

  // inactive coupon (tests isActive logic)
  {
    code: "DISABLED20",
    description: "Inactive coupon for testing",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 80,
    usageLimit: null,
    perUserLimit: null,
    startDate: now,
    endDate: addDays(30),
    minCartValue: 75,
    isActive: false,
    deletedAt: null,
  },

  // soft-deleted coupon
  {
    code: "DELETED10",
    description: "Soft deleted coupon",
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 40,
    usageLimit: null,
    perUserLimit: null,
    startDate: now,
    endDate: addDays(30),
    minCartValue: 50,
    isActive: true,
    deletedAt: new Date(), // important for your partial index
  },
];