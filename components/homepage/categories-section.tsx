import { fetchHomeCategories } from "@/actions/category.action";
import CategoryCard from "./category-card";
import SectionHeading from "./section-heading";

async function CategoriesSection() {
  const categories = await fetchHomeCategories(6);

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="mycontainer my-12 md:my-16">
      <SectionHeading
        title="Shop by Category"
        description="Browse our curated collections and find exactly what you're looking for."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
