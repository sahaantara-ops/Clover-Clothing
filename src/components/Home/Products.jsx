"use client";

import { useState, useEffect } from "react";
import products from "../../data/products.json";
import ProductCard from "../Card/ProductCard";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false);

  const firstFifteenProducts = products.slice(0, 15);
  const visibleProducts = showProducts
    ? firstFifteenProducts
    : firstFifteenProducts.slice(0, 8);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Products Page</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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