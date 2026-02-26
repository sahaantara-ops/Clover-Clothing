import Products from '@/components/Home/Products';
import React from 'react';
export const metadata = {
    title: "All Products",
    description: "Explore our wide range of clothing products at Clover Clothing. From trendy tops to stylish bottoms, find the perfect pieces to elevate your wardrobe. Shop now and discover the latest fashion trends with us!"
}

const ProductsPage = () => {
    return (
          <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
     <Products />
    </main>
    );
};

export default ProductsPage;