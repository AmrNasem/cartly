import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SingleReviewDTO } from "@/lib/types/product.types";
import { Star } from "lucide-react";

function SingleReview({ review }: { review: SingleReviewDTO }) {
  return (
    <li className="flex gap-3 border-b border-muted px-1 py-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={review.user.image} alt={review.user.name} />
        <AvatarFallback>
          {review.user.name
            .split(" ")
            .slice(0, 2)
            .map((name) => name[0].toUpperCase())}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-1 mb-1">
          <h4 className="text-[14px] font-semibold text-primary/80">{review.user.name}</h4>
          <span className="text-muted-foreground text-[12px]">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
        </div>
        <div className="flex items-center gap-0.5 mb-3">
          {
            [...Array(5).keys()].map(i => i < Math.round(review.rating)
              ? <Star key={`user-rating-${i}`} stroke="orange" fill="orange" className="size-2.5" />
              : <Star key={`user-rating-${i}`} stroke="gray" className="size-2.5" />)
          }
        </div>
        <p className="text-muted-foreground text-sm">{review.comment}</p>
      </div>
    </li>
  )
}

export default SingleReview