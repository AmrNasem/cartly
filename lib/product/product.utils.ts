export const getProductStatusVariant = (stock: number, lowStockThreshold: number): { text: string; variant: "destructive" | "warning" | "default" } =>
  stock === 0 ? { text: "Out of stock", variant: "destructive" } : stock <= lowStockThreshold ? { text: `Low stock (${stock})`, variant: "warning" } : { text: `${stock} in stock`, variant: "default" };

export function computeRatingProgress(stats: {
  totalReviews: number;
  ratings: Record<number, number>;
}) {
  const { totalReviews, ratings } = stats;

  return Object.entries(ratings).map(([rate, count]) => ({
    rate: Number(rate),
    count,
    percentage: totalReviews
      ? Math.round((count / totalReviews) * 100)
      : 0,
  }));
}
