export type ProductCardDTO = {
  slug: string;
  thumbnail: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  rates: number;
  rateAverage: number;
  isNew: boolean;
};