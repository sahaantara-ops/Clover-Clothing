
import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products";
import Brands from "@/components/Brands/Brands";
import TopCategoriesSection from "@/components/TopCategories/TopCategories";
import { getServerSession } from "next-auth";

import { authOption } from "./lib/authOption";

export default async function Home() {
  const session= await getServerSession(authOption);
  return (
    <div className="space-y-20">
     
      
      <section>
        <Banner></Banner>
      </section>
       <section>
        <Brands></Brands>
      </section>
      <section>
      <div className="w-full py-5">
      <TopCategoriesSection />
      </div>
        <Products limit={8} />
      </section>
     
    </div>
  );
}
