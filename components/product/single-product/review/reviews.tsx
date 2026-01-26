import { Suspense } from "react";
import RatingStats from "./rating-stats";
import ReviewsList from "./reviews-list";
import { fetchReviewsByProductId } from "@/actions/product.action";
import ReviewsSkeleton from "./skeleton/reviews-skeleton";
import RatingStatsSkeleton from "./skeleton/rating-stats";

async function Reviews({ productId }: { productId: string; }) {
  const { reviews, pagination } = await fetchReviewsByProductId(productId, 1);

  return <section className="space-y-8">
    <Suspense fallback={<RatingStatsSkeleton />}>
      <RatingStats productId={productId} />
    </Suspense>
    <Suspense fallback={<ReviewsSkeleton />}>
      <ReviewsList productId={productId} initialReviews={reviews} initialPagination={pagination} />
    </Suspense>
  </section>
}

export default Reviews