import { HomeCategoryDTO } from "@/lib/types/category.types";
import { buildShopUrl } from "@/lib/utils/shop-url";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CategoryCard({ category }: { category: HomeCategoryDTO }) {
  return (
    <Link
      href={buildShopUrl({ categorySlug: category.slug })}
      className="group relative overflow-hidden rounded-xl border border-black/10 bg-background shadow-sm hover:shadow-lg hover:-translate-y-1 duration-200"
    >
      <figure className="relative aspect-4/3 overflow-hidden">
        <Image
          src={category.thumbnail}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </figure>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base md:text-lg">{category.name}</h3>
            <p className="text-white/80 text-xs mt-0.5">
              {category.productCount}{" "}
              {category.productCount === 1 ? "product" : "products"}
            </p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm duration-200 group-hover:bg-white group-hover:text-primary">
            <ArrowUpRight className="size-4 duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
