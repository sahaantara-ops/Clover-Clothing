"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Card/ProductCard";
import ProductSkeleton from "../Skeleton/ProductSkeleton";
import TopCategoriesSection from "../TopCategories/TopCategories";

const Products = () => {
  const [products, setProducts] = useState([]);   // ✅ MUST exist
  const [showProducts, setShowProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);        // ✅ sets products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const firstFifteenProducts = products.slice(0, 15);  
  const visibleProducts = showProducts
    ? firstFifteenProducts
    : firstFifteenProducts.slice(0, 8);

  return (
    <div>
      <div className="w-full py-5">
        <TopCategoriesSection />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : visibleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  id: product._id,
                  image: product.image || "/placeholder.png",
                  name: product.name || "Unnamed Product",
                }}
              />
            ))}
      </div>

      {!isLoading && firstFifteenProducts.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {showProducts ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;