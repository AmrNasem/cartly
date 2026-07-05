"use client";

import { reviewProductAction } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function NewReview({ productId }: { productId: string }) {
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const [submitFallback, setSubmitFallback] = useState({
    error: "",
    loading: false,
  });
  const { error, success } = useToast();
  const isFormValid = formData.rating > 0;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitFallback((prev) => ({ ...prev, loading: true }));
    try {
      const res = await reviewProductAction(productId, {
        ...formData,
        comment: formData.comment.trim(),
      });
      if (!res.success) throw new Error(res.message);
      setSubmitFallback((prev) => ({ ...prev, loading: false, error: "" }));
      setFormData((prev) => ({ ...prev, rating: 0, comment: "" }));
      router.refresh();
      success("You review has been sent!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong!";
      error(errorMessage);
      setSubmitFallback((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };
  const updateField = (key: string, value: number | string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
  return (
    <div>
      <h3 className="text-lg font-semibold text-praimry/80 my-4">
        Write a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-primary/80 font-semibold text-sm mb-1">
            How did you like the product out of 5?
          </p>
          <div className="flex new-rating items-center justify-start">
            {[...Array(5).keys()].map((i) => (
              <button
                key={i}
                className="star cursor-pointer p-0.5"
                type="button"
                onClick={() =>
                  updateField("rating", formData.rating === i + 1 ? 0 : i + 1)
                }
              >
                {i < formData.rating ? (
                  <Star
                    fill="orange"
                    stroke="orange"
                    className="duration-150 size-4"
                  />
                ) : (
                  <Star stroke="gray" className="duration-150 size-4" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="comment"
            className="text-primary/80 text-sm font-semibold mb-1"
          >
            Review Comment{" "}
            <span className="text-[12px] font-normal">(Optional)</span>
          </label>
          <textarea
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={(e) => updateField("comment", e.target.value)}
            rows={4}
            className=" min-h-14 max-h-50 border rounded-md outline-none p-2 border-gray-300 text-sm duration-150 focus:border-orange-300 text-primary/90"
          ></textarea>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            type="submit"
            className="my-2"
            disabled={!isFormValid || submitFallback.loading}
          >
            {submitFallback.loading && <Loader2 className="animate-spin size-4" />}
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewReview;
