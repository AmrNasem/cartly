import { fetchProductBySlug } from "@/actions/product.action";
import ProductInfo from "@/components/product/single-product/product-info";
import Reviews from "@/components/product/single-product/review/reviews";
import Thumbnails from "@/components/product/single-product/thumbnails";
import { notFound } from "next/navigation";

async function SingleProduct({ params }: { params: Promise<{ slug: string; }> }) {
  const slug = (await params).slug;
  const { product, categoryPath } = await fetchProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="mycontainer my-6">
      <div className="flex flex-col-reverse md:grid grid-cols-12">
        <div className="col-span-6 my-6 px-2 space-y-12">
          <ProductInfo product={product} categoryPath={categoryPath} />
          <Reviews productId={product.id} />
        </div>
        <span></span>
        <div className="col-span-5 w-full">
          <Thumbnails className="sticky top-22" thumbnails={product.images} />
        </div>
      </div>
    </main>
  )
}

export default SingleProduct