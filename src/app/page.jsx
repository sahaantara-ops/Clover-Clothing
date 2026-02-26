
import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products";
import Brands from "@/components/Brands/Brands";

export default function Home() {
  return (
    <div className="space-y-20">
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Products></Products>
      </section>
      <section>
        <Brands></Brands>
      </section>
    </div>
  );
}
