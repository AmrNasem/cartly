import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function PromoBanner() {
  return (
    <section className="mycontainer my-12 md:my-16">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-primary/80 px-6 py-10 md:px-12 md:py-14">
        <div className="absolute -top-12 -end-12 size-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-16 -start-8 size-56 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10 max-w-xl">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
            Limited Time Offer
          </p>
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-3">
            Summer Sale — Up to 40% Off
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
            Refresh your wardrobe and home with exclusive deals on top-rated
            products. Free shipping on orders over $50.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          >
            <Link href="/shop?onSale=true">
              Shop the Sale
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
