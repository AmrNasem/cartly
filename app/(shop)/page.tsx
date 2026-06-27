import BestSellersSection from "@/components/homepage/best-sellers-section";
import CategoriesSection from "@/components/homepage/categories-section";
import FlashDealsSection from "@/components/homepage/flash-deals-section";
import Hero from "@/components/homepage/hero";
import NewArrivalsSection from "@/components/homepage/new-arrivals-section";
import NewsletterSection from "@/components/homepage/newsletter-section";
import PromoBanner from "@/components/homepage/promo-banner";
import Recommended from "@/components/homepage/recommended";
import WhyShopSection from "@/components/homepage/why-shop-section";

function Home() {
  return (
    <main>
      <Hero />
      <CategoriesSection />
      {/* <Featured /> */}
      <Recommended />
      <BestSellersSection />
      <PromoBanner />
      <NewArrivalsSection />
      <FlashDealsSection />
      <WhyShopSection />
      <NewsletterSection />
    </main>
  );
}

export default Home;
