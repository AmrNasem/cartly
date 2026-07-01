import { IProduct } from "@/lib/models/product";
import slugify from "slugify";

export const batch1: (Partial<IProduct> & { categoryName?: string })[] = [
  // ===================== SMARTPHONES =====================
  {
    title: "iPhone 15 Pro",
    slug: slugify("iPhone 15 Pro"),
    description: "Latest Apple flagship smartphone with A17 Pro chip.",
    price: 1199,
    compareAtPrice: 1299,
    stock: 25,
    lowStockThreshold: 5,
    averageRate: 4.8,
    numOfReviews: 120,
    categoryName: "Smartphones",
    isPublished: true,
    images: [
      {
        url: "https://i.ebayimg.com/images/g/3BkAAeSwI1Fo3VaP/s-l140.webp",
        publicId: "iphone1",
        order: 1,
      },
      {
        url: "https://i.ebayimg.com/images/g/3D0AAeSwHRdo3VaS/s-l140.webp",
        publicId: "iphone2",
        order: 2,
      },
      {
        url: "https://i.ebayimg.com/images/g/SOoAAeSwPQ9o3VaW/s-l140.webp",
        publicId: "iphone3",
        order: 3,
      },
      {
        url: "https://i.ebayimg.com/images/g/NxIAAeSw5Dpo3Vaa/s-l140.webp",
        publicId: "iphone4",
        order: 4,
      },
      {
        url: "https://i.ebayimg.com/images/g/LdgAAeSwZBJo3Vac/s-l140.webp",
        publicId: "iphone5",
        order: 5,
      },
    ],
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    slug: slugify("Samsung Galaxy S24 Ultra"),
    description: "Premium Android phone with S-Pen support.",
    price: 1099,
    compareAtPrice: 1199,
    stock: 30,
    lowStockThreshold: 5,
    averageRate: 4.7,
    numOfReviews: 98,
    categoryName: "Smartphones",
    isPublished: true,
    images: [
      {
        url: "https://i5.walmartimages.com/seo/Samsung-Galaxy-S24-Ultra-256GB-US-Version-Unlocked-Android-Smartphone-with-200MP-Camera-8K-Video-Long-Battery-Titanium-Gray_5d60106b-3eee-4e05-8dcb-5a6e34c4cc81.90578886cfd0c7f948f0aa8d3fde3882.jpeg",
        publicId: "s24-1",
        order: 1,
      },
      {
        url: "https://clevercel.mx/cdn/shop/files/Portadas_SamsungS24Yltra_047d3c9f-e573-4882-a977-f027112781d3.webp?v=1762441740&width=1214",
        publicId: "s24-2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2X3ruZbrflKt5I-rPKugvgyMIaQROXgZfcKH38ZaN3kfbMHagpp6Udlg&s=10",
        publicId: "s24-3",
        order: 3,
      },
    ],
  },

  // ===================== LAPTOPS =====================
  {
    title: "MacBook Pro M3",
    slug: slugify("MacBook Pro M3"),
    description: "Powerful laptop for professionals and creators.",
    price: 1999,
    compareAtPrice: 2199,
    stock: 15,
    lowStockThreshold: 3,
    averageRate: 4.9,
    numOfReviews: 210,
    categoryName: "Laptops",
    isPublished: true,
    images: [
      {
        url: "https://hw-egypt.com/wp-content/uploads/2024/05/MacBook-Pro-14-inch-M3-Chip-with-8-core-CPU-10-core-GPU-16GB-Unified-Memory-1TB-SSD-Storage.jpg",
        publicId: "mbp1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4C5-OdSSc2SujbWKmHe-XrT7z6hJxmnSgykT4kkjutzjnNiOoOnTXdIT&s=10",
        publicId: "mbp2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvNWjeS0KJJ48LBAXGyhNXdFxhonSjZxbqCVWyrxq4Q&s=10",
        publicId: "mbp3",
        order: 3,
      },
    ],
  },
  {
    title: "Dell XPS 15",
    slug: slugify("Dell XPS 15"),
    description: "High-performance Windows laptop.",
    price: 1499,
    compareAtPrice: 1699,
    stock: 18,
    lowStockThreshold: 4,
    averageRate: 4.6,
    numOfReviews: 88,
    categoryName: "Laptops",
    isPublished: true,
    images: [
      {
        url: "https://m.media-amazon.com/images/I/51lkdr+ms9L._AC_UF894,1000_QL80_.jpg",
        publicId: "dell1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfiT6mTW0Q-gw2s8PrBeGei9USjS2ZB-2qnJDSG33qbQ&s=10",
        publicId: "dell2",
        order: 2,
      },
      {
        url: "https://cdn.arstechnica.net/wp-content/uploads/2022/09/IMG_0429-1-1152x648.jpeg",
        publicId: "dell3",
        order: 3,
      },
    ],
  },

  // ===================== AUDIO =====================
  {
    title: "Sony WH-1000XM5 Headphones",
    slug: slugify("Sony WH-1000XM5 Headphones"),
    description: "Industry-leading noise cancelling headphones.",
    price: 399,
    compareAtPrice: 449,
    stock: 40,
    lowStockThreshold: 8,
    averageRate: 4.8,
    numOfReviews: 340,
    categoryName: "Audio",
    isPublished: true,
    images: [
      {
        url: "https://ennap.com/cdn/shop/files/Sony-WH-1000XM6-Wireless-Noise-Canceling-Headphones.png?v=1781530513&width=980",
        publicId: "sony1",
        order: 1,
      },
      {
        url: "https://m.media-amazon.com/images/I/6169m-oKFEL.jpg",
        publicId: "sony2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwx9SJhi_g7OPcTB0EXOXMNP7JGYFPaul4_PzS34L-mhMrbMlHICrrYyqF&s=10",
        publicId: "sony3",
        order: 3,
      },
    ],
  },

  // ===================== SMARTWATCH =====================
  {
    title: "Apple Watch Series 9",
    slug: slugify("Apple Watch Series 9"),
    description: "Advanced health and fitness smartwatch.",
    price: 499,
    compareAtPrice: 549,
    stock: 35,
    lowStockThreshold: 6,
    averageRate: 4.7,
    numOfReviews: 190,
    categoryName: "Smartwatches",
    isPublished: true,
    images: [
      {
        url: "https://f.nooncdn.com/p/pzsku/ZAC24F9C426F876D6B2EDZ/45/_/1779093968/83753d7c-f2e2-4083-ae6d-11bb4a7814ee.jpg?width=1200",
        publicId: "watch1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKG7VfCnOpe1IOz94rKyBZf-difgPJrj2ioRJ1uxbNbE7Aj1IZ8oKb8uA&s=10",
        publicId: "watch2",
        order: 2,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT16DLra9Y-Pvm3xGxu2aNbU6OdJ3zz2iTTicgx_VmoGwYeds6uov_cK043&s=10",
        publicId: "watch3",
        order: 3,
      },
    ],
  },

  // ===================== FASHION =====================
  {
    title: "Nike Air Force 1",
    slug: slugify("Nike Air Force 1"),
    description: "Classic lifestyle sneakers.",
    price: 120,
    compareAtPrice: 150,
    stock: 60,
    lowStockThreshold: 10,
    averageRate: 4.8,
    numOfReviews: 500,
    categoryName: "Shoes",
    isPublished: true,
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKdJ6vxwSHbniFj-6zDkstLR5SDDCU-zY6ksKZ6aK_4qH3AMzR5hmI-d-&s=10",
        publicId: "nike1",
        order: 1,
      },
      {
        url: "https://images.footlocker.com/is/image/FLEU/314109645904?wid=250&hei=250",
        publicId: "nike2",
        order: 2,
      },
      {
        url: "https://images.asos-media.com/products/nike-air-force-1-07-trainers-in-white-and-black/203496100-1-whiteblack?$n_640w$&wid=513&fit=constrain",
        publicId: "nike3",
        order: 3,
      },
    ],
  },

  {
    title: "Adidas Ultraboost 22",
    slug: slugify("Adidas Ultraboost 22"),
    description: "High comfort running shoes.",
    price: 180,
    compareAtPrice: 200,
    stock: 55,
    lowStockThreshold: 10,
    averageRate: 4.7,
    numOfReviews: 320,
    categoryName: "Shoes",
    isPublished: true,
    images: [
      {
        url: "https://wayupsports.com/cdn/shop/files/GZ0127_1_FOOTWEAR_Photography_SideLateralCenterView_white.jpg?v=1760267301&width=2048",
        publicId: "adi1",
        order: 1,
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-03nN2LvNIZ8NGb95HkTN5-hGolFUs3YzorIkFXCBv7tHXKWAmjYrPMk&s=10",
        publicId: "adi2",
        order: 2,
      },
      {
        url: "https://static.ftshp.digital/img/p/6/2/9/9/1/1/629911.jpg",
        publicId: "adi3",
        order: 3,
      },
    ],
  },
];

export default batch1;
