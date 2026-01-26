"use client";
import { memo, useCallback, useState, useTransition } from "react";
import SingleReview from "./single-review";
import { Button } from "@/components/ui/button";
import { SingleReviewDTO } from "@/lib/types/product.types";
import { fetchReviewsByProductId } from "@/actions/product.action";
import { Loader2 } from "lucide-react";
import SingleReviewSkeleton from "./skeleton/single-review";

function ReviewsList({ productId, initialReviews, initialPagination }: { productId: string; initialReviews: SingleReviewDTO[]; initialPagination: { total: number; totalPages: number, page: number } }) {
  const [reviews, setReviews] = useState<SingleReviewDTO[]>(initialReviews);
  const [pagination, setPagination] = useState(initialPagination);

  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(() => {
    startTransition(async () => {
      const nextPage = pagination.page + 1;
      const data = await fetchReviewsByProductId(productId, nextPage);

      setReviews(prev => [...prev, ...data.reviews]);
      setPagination(data.pagination)
    });
  }, [pagination.page, productId]);

  if (!reviews.length) return;

  return (
    <article>
      <h2 className="text-xl mb-2 font-semibold flex items-center gap-1"><span>Reviews</span> <span className="text-muted-foreground text-sm">({pagination.total})</span></h2>
      <ul className="space-y-4">
        {
          reviews.map(review => <SingleReview key={review.id} review={review} />)
        }
        {
          isPending && <>
            <SingleReviewSkeleton />
          </>
        }
      </ul>
      {
        pagination.totalPages > pagination.page &&
        <Button disabled={isPending} onClick={loadMore} variant="link" className="flex items-center justify-center gap-1 mx-auto cursor-pointer text-primary/80 my-3">{
          isPending && <Loader2 />
        }
          <span>More Reviews</span>
        </Button>
      }
    </article>
  )
}

export default memo(ReviewsList)