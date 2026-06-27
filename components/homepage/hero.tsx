import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-muted/40 via-background to-muted/20 py-12 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 start-1/4 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 end-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mycontainer relative flex gap-10 lg:gap-12 lg:items-center justify-between flex-col lg:flex-row">
        <article className="lg:basis-[48%]">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-4">
            Welcome to Cartly
          </p>
          <h1 className="sm:max-w-4/5 lg:max-w-full text-primary text-3xl md:leading-17.5 md:text-[3.3rem] font-bold">
            Discover Your Perfect Need
          </h1>
          <p className="sm:max-w-3/5 lg:max-w-4/5 text-muted-foreground my-6 lg:my-8 text-sm md:text-base leading-relaxed">
            Discover quality products curated for your everyday needs, and enjoy
            a seamless checkout experience — all in one place.
          </p>
          <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
            <Button asChild size="lg" className="group font-semibold">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="duration-150 group-hover:translate-x-1 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#categories" className="scroll-smooth">Browse Categories</Link>
            </Button>
          </div>
          <div className="flex items-center justify-evenly sm:justify-start gap-8 my-10">
            <div>
              <p className="text-[1.3rem] text-primary font-bold">50K+</p>
              <p className="text-[12px] text-muted-foreground">
                Happy Customers
              </p>
            </div>
            <div>
              <p className="text-[1.3rem] text-primary font-bold">1000+</p>
              <p className="text-[12px] text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-[1.3rem] text-primary font-bold flex items-center gap-0.5">
                4.9 <Star fill="orange" stroke="orange" className="size-4" />
              </p>
              <p className="text-[12px] text-muted-foreground">Rating</p>
            </div>
          </div>
        </article>

        <div className="aspect-square lg:basis-[48%] relative w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
          <Image
            src="/images/collection.jpeg"
            alt="Curated collection of premium products"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover block w-full h-full rounded-2xl shadow-xl"
          />
          <div className="absolute -start-4 -top-4 size-20 rounded-full blur-xl bg-primary/20" />
          <div className="absolute end-0 -top-4 size-20 rounded-full blur-xl bg-primary/20" />
          <div className="absolute -start-4 -bottom-4 size-20 rounded-full blur-xl bg-primary/20" />
          <div className="absolute end-0 -bottom-4 size-20 rounded-full blur-xl bg-primary/20" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
