import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-linear-to-br from-muted/30 to-muted/10 py-12 md:py-16">
      <div className="mycontainer flex gap-12 lg:items-center justify-between flex-col lg:flex-row">
        <article className="md:basis-[48%]">
          <h1 className="sm:max-w-4/5 lg:max-w-full text-primary text-3xl md:leading-17.5 md:text-[3.3rem] font-bold">
            Discover Your Perfect Need
          </h1>
          <p className="sm:max-w-3/5 lg:max-w-4/5 text-muted-foreground my-7 lg:my-8">
            Discover quality products curated for your everyday needs, and enjoy
            a seamless checkout experience — all in one place.
          </p>
          <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
            <button className="group font-semibold text-[12px] flex items-center justify-center gap-1 py-2 px-3 cursor-pointer rounded-md text-white bg-primary duration-150 hover:bg-primary/85">
              <span>Shop Now</span>
              <ArrowRight className="duration-150 group-hover:translate-x-1 size-4" />
            </button>
            <button className="font-semibold text-[12px] text-center py-2 px-5 cursor-pointer rounded-md text-foreground bg-white duration-150 hover:bg-accent hover:text-accent-foreground border border-black/10">
              <span>Join Us</span>
            </button>
          </div>
          <div className="flex items-center gap-6 my-10">
            <div>
              <h2 className="text-[1.3rem] text-primary font-bold">50K+</h2>
              <p className="text-[12px] text-muted-foreground">
                Happy Customers
              </p>
            </div>
            <div>
              <h2 className="text-[1.3rem] text-primary font-bold">1000+</h2>
              <p className="text-[12px] text-muted-foreground">Products</p>
            </div>
            <div>
              <h2 className="text-[1.3rem] text-primary font-bold flex items-center gap-0.5">
                4.9 <Star fill="" className="size-4" />
              </h2>
              <p className="text-[12px] text-muted-foreground">Rating</p>
            </div>
          </div>
        </article>
        <div className="aspect-square basis-[48%] relative w-full">
          <Image
            src="/images/collection.jpeg"
            alt="Hero Image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover block w-full h-full grow rounded-2xl"
          />
          <div className="absolute -start-4 -top-4 w-20 h-20 rounded-full blur-xl bg-primary/20"></div>
          <div className="absolute end-0 -top-4 w-20 h-20 rounded-full blur-xl bg-primary/20"></div>
          <div className="absolute -start-4 -bottom-4 w-20 h-20 rounded-full blur-xl bg-primary/20"></div>
          <div className="absolute end-0 -bottom-4 w-20 h-20 rounded-full blur-xl bg-primary/20"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
