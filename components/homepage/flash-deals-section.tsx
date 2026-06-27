import { fetchShopProducts } from "@/actions/product.action";
import { FLASH_DEALS_END_DATE } from "@/lib/mock/home.mock";
import { Badge } from "../ui/badge";
import FlashDealsCountdown from "./flash-deals-countdown";
import HorizontalProductScroll from "./horizontal-product-scroll";
import SectionHeading from "./section-heading";

async function FlashDealsSection() {
  const { products } = await fetchShopProducts({ onSale: true, limit: "8" });

  if (products.length === 0) return null;

  return (
    <section className="mycontainer my-12 md:my-16">
      <div className="rounded-2xl border border-black/10 bg-linear-to-br from-destructive/5 via-background to-muted/30 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <Badge variant="destructive" className="mb-3">
              Flash Deals
            </Badge>
            <SectionHeading
              title="Today's Hot Deals"
              description="Grab these limited-time offers before they're gone."
              align="left"
              className="mb-0"
            />
          </div>
          <FlashDealsCountdown endDate={FLASH_DEALS_END_DATE} />
        </div>
        <HorizontalProductScroll products={products} />
      </div>
    </section>
  );
}

export default FlashDealsSection;
