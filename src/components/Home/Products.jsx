"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Card/ProductCard";
import ProductSkeleton from "../Skeleton/ProductSkeleton";


const Products = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Decide which products to show
  let displayedProducts = products;
  if (limit && !showAll) {
    displayedProducts = products.slice(0, limit);
  }

  return (
    <div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(limit || 8)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  id: product.id,
                  image: product.image || "/placeholder.png",
                  name: product.name || "Unnamed Product",
                }}
              />
            ))}
      </div>

      {/* Show toggle only if limit is set */}
      {!isLoading && limit && products.length > limit && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;