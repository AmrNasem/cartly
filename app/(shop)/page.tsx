import Featured from "@/components/homepage/featured";
import Hero from "@/components/homepage/hero";
import Recommended from "@/components/homepage/recommended";

function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <Recommended />
    </main>
  );
}

export default Home;
