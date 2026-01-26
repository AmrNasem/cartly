import { fetchRatingStats } from "@/actions/product.action";
import { Star } from "lucide-react";

async function RatingStats({ productId }: { productId: string; }) {
  const { averageRating, ratings, totalReviews }: { averageRating: number; ratings: { rate: number, percentage: number }[], totalReviews: number } = await fetchRatingStats(productId);
  return (
    <article>
      <h2 className="text-xl mb-4 font-semibold">Customers Feedback</h2>
      <div className="flex flex-col sm:grid grid-cols-[1fr_2fr] gap-2">
        <div className="flex justify-center items-center flex-col bg-muted/30 rounded-md p-4">
          {
            totalReviews ?
              <span className="text-3xl font-bold text-primary/80">{averageRating.toFixed(1)}</span>
              :
              <span className="text-xl font-bold text-primary/80">No ratings yet.</span>
          }
          <div className="flex items-center gap-1 my-2">
            {
              [...Array(5).keys()].map(i => i < Math.round(averageRating)
                ? <Star key={`total-${i}`} stroke="orange" fill="orange" className="size-3" />
                : <Star key={`total-${i}`} stroke="gray" className="size-3" />)
            }
          </div>
          <span className="text-muted-foreground text-sm font-semibold">Product Rating</span>
        </div>
        {
          !!totalReviews &&
          (
            <ul className="col-span-2ss bg-muted/30 rounded-md p-2">
              {
                ratings.reverse().map((rating, index) => <li className="p-1 flex items-center gap-2" key={index}>
                  <div className="relative h-1 grow bg-muted rounded-full overflow-hidden">
                    <span style={{ width: rating.percentage + "%" }} className="absolute start-0 top-0 h-full duration-150 bg-primary/80 rounded-full"></span>
                  </div>
                  <div className="flex items-center gap-px">
                    {
                      [...Array(5).keys()].map(i => i < Math.round(rating.rate)
                        ? <Star key={`rating-${i}`} stroke="orange" fill="orange" className="size-2.5" />
                        : <Star key={`rating-${i}`} stroke="gray" className="size-2.5" />)
                    }
                  </div>
                  <span className="text-[12px] min-w-10 text-center text-primary/80">{rating.percentage}%</span>
                </li>)
              }
            </ul>
          )
        }
      </div>
    </article>
  )
}

export default RatingStats