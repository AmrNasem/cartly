import { IProduct } from "@/lib/models/product";
import slugify from "slugify";

// ===================== FASHION - MEN =====================
export const batch3: (Partial<IProduct> & { categoryName?: string })[] = [
  {
    title: "Classic White Oxford Shirt",
    slug: slugify("Classic White Oxford Shirt"),
    description: "Elegant slim-fit shirt for formal and casual wear.",
    price: 45,
    compareAtPrice: 60,
    stock: 90,
    lowStockThreshold: 10,
    averageRate: 4.6,
    numOfReviews: 340,
    categoryName: "Men's Clothing",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsV1KEyXv68TPfUkTNJzrkLSkXy9iGI9fYJmO3tmdVH2zgXSK601Ld5SI&s=10",
        publicId: "shirt1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuc2ld9gwS--o3KjX64RUWtiJjZcbXo159AblGPMWLy6ft2QbG9P1VTMsX&s=10",
        publicId: "shirt2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfYbY1ZfxYfaY8ieK8zm7LVc2gNXZIDovMFH4I9HOyE_wAGFSiPi_tk2l7&s=10",
        publicId: "shirt3",
        order: 3,
      },
    ],
  },
  {
    title: "Slim Fit Black Jeans",
    slug: slugify("Slim Fit Black Jeans"),
    description: "Modern black jeans with stretch comfort.",
    price: 55,
    compareAtPrice: 75,
    stock: 70,
    lowStockThreshold: 8,
    averageRate: 4.7,
    numOfReviews: 410,
    categoryName: "Men's Clothing",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPBXBZJasWC3MQkH39bQNBY68d6ncUHO8_JVBP1TEGvfRgVLMHRDOe47Q9&s=10",
        publicId: "jeans1",
        order: 1,
      },
      {
        url: "https://tie-house.com/wp-content/uploads/elementor/thumbs/00014327-qyq7z6znqdiu6l6g904wmxz7a4pr7cu373icp6fz1k.jpg",
        publicId: "jeans2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9goc345vuk3z9N6TOVDdco5cqD_AaH-GfYeuDOVV34rkcWEEfY-PTpac&s=10",
        publicId: "jeans3",
        order: 3,
      },
    ],
  },

  // ===================== FASHION - WOMEN =====================
  {
    title: "Elegant Floral Dress",
    slug: slugify("Elegant Floral Dress"),
    description: "Lightweight summer floral dress.",
    price: 65,
    compareAtPrice: 85,
    stock: 80,
    lowStockThreshold: 10,
    averageRate: 4.8,
    numOfReviews: 520,
    categoryName: "Women's Clothing",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBUw31xD7G_hYnSxvMj6jW93G16M9O4BL0pgdXBz09qQBgJ7S0V_6L4Vo&s=10",
        publicId: "dress1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRscWRQUpQ8cZMxm_FlQmlzwXxT24t3k5yF1RrxyEsjYEoeDZ4mn0ASK8&s=10",
        publicId: "dress2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTco5KR2BvbLeqgCAdjOMvfXgS2QxeJZeF_tJDO2EWbvqJ05ahTQHAn2-E&s=10",
        publicId: "dress3",
        order: 3,
      },
    ],
  },
  {
    title: "Oversized Hoodie",
    slug: slugify("Oversized Hoodie"),
    description: "Comfortable streetwear hoodie.",
    price: 50,
    compareAtPrice: 70,
    stock: 95,
    lowStockThreshold: 12,
    averageRate: 4.7,
    numOfReviews: 600,
    categoryName: "Women's Clothing",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohHuW3w1D8r0VBm6SXvGxGeX4RYzTyxZyX7S6ypft9Q&s=10",
        publicId: "hoodie1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6SND1kPiMuBbT5shpk95Aop_2o1msGzulyHYBv6DWg&s",
        publicId: "hoodie2",
        order: 2,
      },
      {
        url: "https://black-palms-label.com/cdn/shop/files/SS24_HONEY1_Hoodie_FadedBlack_1.webp?v=1761060714&width=2048",
        publicId: "hoodie3",
        order: 3,
      },
    ],
  },

  // ===================== BAGS =====================
  {
    title: "Leather Backpack",
    slug: slugify("Leather Backpack"),
    description: "Premium leather backpack for daily use.",
    price: 80,
    compareAtPrice: 110,
    stock: 60,
    lowStockThreshold: 8,
    averageRate: 4.6,
    numOfReviews: 300,
    categoryName: "Bags",
    isPublished: true,
    images: [
      {
        url: "https://img01.ztat.net/article/spp-media-p1/a14f344ebdb546459136bb1829390e8d/d0d12f7900fb4718861bd81555c09f9d.jpg?imwidth=1800&filter=packshot",
        publicId: "bag1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJw428ps7omL19WLw0tYASUiRsLmSoCG8qPia0PwOzw&s=10",
        publicId: "bag2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmifZWwqaK03DvUbZIj8n5KHIfU_hpP0Y8qtyY2XLyZtEm9s4Wq-FOQ4jy&s=10",
        publicId: "bag3",
        order: 3,
      },
    ],
  },
  {
    title: "Travel Duffel Bag",
    slug: slugify("Travel Duffel Bag"),
    description: "Spacious bag for short trips.",
    price: 70,
    compareAtPrice: 90,
    stock: 55,
    lowStockThreshold: 8,
    averageRate: 4.5,
    numOfReviews: 210,
    categoryName: "Bags",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7y-Zr5kl4hnG6-oPnXb66fxfCCFP1Rles8HZgAPyMQrm0CN4v5KaDsOe&s=10",
        publicId: "duffel1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O5BnGGwdKQLLB7Od733CPvkJB2rho_kIuVGZnKymZw&s",
        publicId: "duffel2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAiEA6t7ZUlfyS_Ja42YHTD7Y__5IZqxB0oWUBCAs_GNuioeMkuK3t_uu&s=10",
        publicId: "duffel3",
        order: 3,
      },
    ],
  },

  // ===================== GAMING EXPANSION =====================
  {
    title: "Logitech G Pro X Headset",
    slug: slugify("Logitech G Pro X Headset"),
    description: "Professional gaming headset with surround sound.",
    price: 129,
    compareAtPrice: 149,
    stock: 50,
    lowStockThreshold: 7,
    averageRate: 4.7,
    numOfReviews: 410,
    categoryName: "Gaming Accessories",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqiML2qPlp11Lq5wKacmZQrG7Tg_Ty9ucKwV458AieUg&s=10",
        publicId: "headset1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_aDeFRL8wxJ57sq9I3JasyP9O65ugtMPFsu3YcDGf9FcIUSvXpU9-fJs&s=10",
        publicId: "headset2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0b6RcCI4ay0YS8UCSdRk3uNNcE9EdpYieqxPAY1e2jy7r4z2MrhOpR0Cx&s=10",
        publicId: "headset3",
        order: 3,
      },
    ],
  },
  {
    title: "RGB Gaming Keyboard",
    slug: slugify("RGB Gaming Keyboard"),
    description: "Mechanical keyboard with RGB lighting.",
    price: 89,
    compareAtPrice: 110,
    stock: 65,
    lowStockThreshold: 10,
    averageRate: 4.6,
    numOfReviews: 520,
    categoryName: "Gaming Accessories",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRuZmAoplw0Q2dkozEQN2pmVnCIVAxNuje3sM-EAPDZ8RgxwgINMMkJoju&s=10",
        publicId: "kbd1",
        order: 1,
      },
      {
        url: "https://media.s-bol.com/7rYKmoj9QvYQ/rkxky2w/550x261.jpg",
        publicId: "kbd2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWiGFdOtX4jbxnlV_fHK3vlfiBpECYCXEbvOaS0uNR7hKtjppuJTauxmiB&s=10",
        publicId: "kbd3",
        order: 3,
      },
    ],
  },

  // ===================== SPORTS & OUTDOORS =====================
  {
    title: "Adjustable Dumbbells Set",
    slug: slugify("Adjustable Dumbbells Set"),
    description: "Home gym adjustable weights set.",
    price: 199,
    compareAtPrice: 249,
    stock: 40,
    lowStockThreshold: 6,
    averageRate: 4.8,
    numOfReviews: 680,
    categoryName: "Fitness",
    isPublished: true,
    images: [
      {
        url: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/3275431/1.jpg?4779",
        publicId: "gym1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjqQ6g6aYBHVsAPB6ObCxO49_0uC0AZHdIP2vX5Ik46vt712YWBXjRzm8&s=10",
        publicId: "gym2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYYMXqSRD3wucETP-zViSRljYV0wemFAo1OfcTWiU9m6EHrgcvJ9ZZXc&s=10",
        publicId: "gym3",
        order: 3,
      },
    ],
  },
  {
    title: "Camping Tent 4-Person",
    slug: slugify("Camping Tent 4-Person"),
    description: "Waterproof outdoor camping tent.",
    price: 149,
    compareAtPrice: 179,
    stock: 35,
    lowStockThreshold: 5,
    averageRate: 4.7,
    numOfReviews: 300,
    categoryName: "Camping",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfIpvvARQeFUWSSCYZPQHqazhhFFImweP2y_ni26R87g&s",
        publicId: "tent1",
        order: 1,
      },
      {
        url: "https://contents.mediadecathlon.com/p2183001/k$f4119eefb9bfb239675dbb80cbab4eb9/sq/cort-de-camping-4-locuri-arpenaz-41.jpg?format=auto&f=800x0",
        publicId: "tent2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbu9V0DotGsdgaRM2VyP0xz9DKyQuAzBi3u4Jl66HhA&s",
        publicId: "tent3",
        order: 3,
      },
    ],
  },
];

export default batch3;
