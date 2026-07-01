import { IProduct } from "@/lib/models/product";
import slugify from "slugify";

// ===================== GAMING =====================
export const batch2: (Partial<IProduct> & { categoryName?: string })[] = [
  {
    title: "PlayStation 5 Console",
    slug: slugify("PlayStation 5 Console"),
    description: "Next-gen gaming console from Sony.",
    price: 599,
    compareAtPrice: 649,
    stock: 20,
    lowStockThreshold: 5,
    averageRate: 4.9,
    numOfReviews: 980,
    categoryName: "Consoles",
    isPublished: true,
    images: [
      {
        url: "https://f.nooncdn.com/p/pzsku/Z9E4DE0E418A2F12A9CECZ/45/_/1780466862/a8af53f1-7342-4401-b3eb-39b002687f61.jpg?width=480",
        publicId: "ps5-1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeywyn90Phf9zmRzqAkojKu9BdTXK7-vVJcw5bf5PPlZoGIXznamB4yuSG&s=10",
        publicId: "ps5-2",
        order: 2,
      },
    ],
  },
  {
    title: "Xbox Series X",
    slug: slugify("Xbox Series X"),
    description: "Powerful Microsoft gaming console.",
    price: 579,
    compareAtPrice: 629,
    stock: 18,
    lowStockThreshold: 4,
    averageRate: 4.8,
    numOfReviews: 750,
    categoryName: "Consoles",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlihQx31ZchewaO7wejfCIkZMVdNTU55UmLuRkl0lpniRYYHJvJ43-nSQ&s=10",
        publicId: "xbox1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkw2w41FQ91EQnz_sZtw4Q0nnMNVjBxfzJPRtFl4dkkcY5PtgvAYUK7ulV&s=10",
        publicId: "xbox2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVGhqHR5BOqq5IfTIEFRLazau93YVYY2D694V-zxdvYZTKqbLkwj5JWYc&s=10",
        publicId: "xbox3",
        order: 3,
      },
    ],
  },
  {
    title: "DualSense Wireless Controller",
    slug: slugify("DualSense Wireless Controller"),
    description: "PS5 official controller with haptic feedback.",
    price: 79,
    compareAtPrice: 89,
    stock: 80,
    lowStockThreshold: 10,
    averageRate: 4.7,
    numOfReviews: 420,
    categoryName: "Gaming Accessories",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQ2g8KOeJr1s_j3aoFu_PLFR9NGQ9Dx1xAfZKJLpW1tuDVCQ_YRs2BF0&s=10",
        publicId: "ds1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHSSM3qGdfOl_QSxKokBf1UVAJcFvPRqc0E458Fy-n37mIiSaVdDMG7-d&s=10",
        publicId: "ds2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxvOdaF2E_SXfHoqbLs8sYSU8kHZx-0-NxB5iYfQ5ROv44XntbUnuUxw&s=10",
        publicId: "ds3",
        order: 3,
      },
    ],
  },

  // ===================== HOME & KITCHEN =====================
  {
    title: "Modern Minimalist Sofa",
    slug: slugify("Modern Minimalist Sofa"),
    description: "Comfortable 3-seater sofa for living rooms.",
    price: 899,
    compareAtPrice: 1099,
    stock: 12,
    lowStockThreshold: 2,
    averageRate: 4.6,
    numOfReviews: 88,
    categoryName: "Furniture",
    isPublished: true,
    images: [
      {
        url: "https://m.media-amazon.com/images/I/91LwbY5w9zL._AC_UF894,1000_QL80_.jpg",
        publicId: "sofa1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTng6Fzqxu47LudcCFcf-oivJtRpDNH2_Z_SUqLlDy2GPRVL-QdoGi9lrw&s=10",
        publicId: "sofa2",
        order: 2,
      },
      {
        url: "https://cozymatic.com.hk/cdn/shop/files/milochic-cloud-sofa-01_1080x.webp?v=1778234906",
        publicId: "sofa3",
        order: 3,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YanbzJViwjDXCmy-NvgdNoMWNLv_aAgmL8tGTYV8Sg&s",
        publicId: "sofa4",
        order: 4,
      },
    ],
  },
  {
    title: "Smart Air Fryer 6L",
    slug: slugify("Smart Air Fryer 6L"),
    description: "Healthy cooking with smart presets.",
    price: 129,
    compareAtPrice: 159,
    stock: 40,
    lowStockThreshold: 6,
    averageRate: 4.7,
    numOfReviews: 210,
    categoryName: "Kitchen Appliances",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRom__UJjL9C-xRgQY5CIwEPeM_fwHBEA5OrpuhTNNWN1D8Sg4KsZWerPY&s=10",
        publicId: "af1",
        order: 1,
      },
      {
        url: "https://www.powerplanetonline.com/cdnassets/xiaomi_air_fryer_6l_06_ad_l.jpg",
        publicId: "af2",
        order: 2,
      },
      {
        url: "https://i02.appmifile.com/mi-com-product/fly-birds/m/xiaomi-air-fryer-6l/3187f9fc5939ee088f960c365cb0141c.png",
        publicId: "af3",
        order: 3,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHc-oARwqW7mYBMd1In2a2magJF077mTX4VDAqd78kAQ&s=10",
        publicId: "af4",
        order: 4,
      },
    ],
  },
  {
    title: "LED Ceiling Lamp",
    slug: slugify("LED Ceiling Lamp"),
    description: "Modern lighting for home interiors.",
    price: 59,
    compareAtPrice: 79,
    stock: 70,
    lowStockThreshold: 10,
    averageRate: 4.5,
    numOfReviews: 150,
    categoryName: "Home Decor",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWseXTVNjUlb16rOOyb1NU6Sp6bXe0pmVEJegsQGkau641gdyegzU1Urjn&s=10",
        publicId: "lamp1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-r7DLhpQJnOBu_s-E_POqwUs3HzT-XdQd5HEtBD3Kw&s=10",
        publicId: "lamp2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-G_x4hb5mswLM2UaeyIIO2qciMbmwvmdDm7381vKed6ZGu4-BvLmzabi&s=10",
        publicId: "lamp3",
        order: 3,
      },
    ],
  },

  // ===================== BEAUTY =====================
  {
    title: "Vitamin C Face Serum",
    slug: slugify("Vitamin C Face Serum"),
    description: "Brightening serum for glowing skin.",
    price: 25,
    compareAtPrice: 35,
    stock: 100,
    lowStockThreshold: 15,
    averageRate: 4.6,
    numOfReviews: 520,
    categoryName: "Skincare",
    isPublished: true,
    images: [
      {
        url: "https://m.media-amazon.com/images/I/517BRiE9PoL._AC_UF894,1000_QL80_.jpg",
        publicId: "serum1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4TehG7ULNAlxudJz4KO1yCBZMOZQurDIqG_eUxA1PZg&s=10",
        publicId: "serum2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxCrsU8iocjn3XynzG2nXOnO1T-vqiMw-ygPbwOhSzzjC2Va6oPdoFSCU&s=10",
        publicId: "serum3",
        order: 3,
      },
    ],
  },
  {
    title: "Matte Lipstick Set",
    slug: slugify("Matte Lipstick Set"),
    description: "Long-lasting professional lipstick collection.",
    price: 39,
    compareAtPrice: 49,
    stock: 85,
    lowStockThreshold: 10,
    averageRate: 4.7,
    numOfReviews: 610,
    categoryName: "Makeup",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxl3anSMBwB_fscp1sK6JDHggQdaAYgkv9ZZpsD01BWrbuUQrnKOxWWfw&s=10",
        publicId: "lip1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3M3JWAbXW5nvXE8u2H6_y0RL3xyT9A9Tp1cmqLzyvm4IwwmOf17NjBs&s=10",
        publicId: "lip2",
        order: 2,
      },
      {
        url: "https://m.media-amazon.com/images/I/51hubDwggmL._AC_UF894,1000_QL80_.jpg",
        publicId: "lip3",
        order: 3,
      },
    ],
  },
  {
    title: "Luxury Eau de Parfum",
    slug: slugify("Luxury Eau de Parfum"),
    description: "Premium long-lasting fragrance.",
    price: 89,
    compareAtPrice: 120,
    stock: 50,
    lowStockThreshold: 8,
    averageRate: 4.8,
    numOfReviews: 300,
    categoryName: "Fragrances",
    isPublished: true,
    images: [
      {
        url: "https://incibeauty.com/photos/b/1/d/b1df365f676447b4363c411fa8c73a.jpg",
        publicId: "perf1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxDdfx90mlwBA8cptKZ6sHCnoZ6-_wyfZRe_Amkbbl0Y8ieg40BmNPOU&s=10",
        publicId: "perf2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOhKhkDXUALdMZFwfTOwxHf0Vawjh9jPNECbN7YCfwSQ&s",
        publicId: "perf3",
        order: 3,
      },
    ],
  },

  // ===================== BOOKS =====================
  {
    title: "Clean Code Robert Martin",
    slug: slugify("Clean Code Robert Martin"),
    description: "Software craftsmanship guide for developers.",
    price: 45,
    compareAtPrice: 55,
    stock: 60,
    lowStockThreshold: 10,
    averageRate: 4.9,
    numOfReviews: 1200,
    categoryName: "Programming",
    isPublished: true,
    images: [
      {
        url: "https://m.media-amazon.com/images/I/81Rnac2Fq+L._AC_UF1000,1000_QL80_.jpg",
        publicId: "book1",
        order: 1,
      },
      {
        url: "https://miro.medium.com/v2/resize:fit:1200/1*UWUzryYTsGHO_84fZ67EqA.jpeg",
        publicId: "book2",
        order: 2,
      },
      {
        url: "https://m.media-amazon.com/images/I/71RIZhlDEVL._SY500_.jpg",
        publicId: "book3",
        order: 3,
      },
    ],
  },
  {
    title: "Zero to One",
    slug: slugify("Zero to One"),
    description: "Startup and business thinking book.",
    price: 30,
    compareAtPrice: 40,
    stock: 70,
    lowStockThreshold: 12,
    averageRate: 4.8,
    numOfReviews: 900,
    categoryName: "Business",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7UzdUL7bC-E5nvsVShLDxgDAmSjhU2jDpOvtaATSzKhUVe0J9RY61MkE&s=10",
        publicId: "biz1",
        order: 1,
      },
      {
        url: "https://pdf.storylingoo.com/wp-content/uploads/2024/01/%D9%83%D8%AA%D8%A7%D8%A8-Zero-to-One-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-pdf.webp",
        publicId: "biz2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRR2A_ilUHHXEkVHRupBfRVx0Y9tP67yjkcdxfoPwifqzpt7Io7NpvLU&s=10",
        publicId: "biz3",
        order: 3,
      },
    ],
  },
  {
    title: "The Great Gatsby",
    slug: slugify("The Great Gatsby"),
    description: "Classic American fiction novel.",
    price: 18,
    compareAtPrice: 25,
    stock: 120,
    lowStockThreshold: 20,
    averageRate: 4.7,
    numOfReviews: 2000,
    categoryName: "Fiction",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwEgSzZIvKVX346xjBNlpx-iUYgtBzqavEQQTWNt1uQ&s=10",
        publicId: "fic1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQQ2JR25gM0N_rHMP6GdewcjOvyN8va664-HyHXXFlX_W_xGmp_Rtsums_&s=10",
        publicId: "fic2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuODA3UGIr2rbrwHUErAw-6ZsxEnbgPm67psargj1Ff0Qr99KM34R0-Fg&s=10",
        publicId: "fic3",
        order: 3,
      },
    ],
  },
];

export default batch2;
