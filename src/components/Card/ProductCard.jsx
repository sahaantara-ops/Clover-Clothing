"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    // Navigate to the product details page
    router.push(`/products/${product.id}`);
  };

  return (
    
      <Link href={`/Products/${product._id}`}>
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 group relative">

      {/* Product Image */}
      <figure className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          unoptimized
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-neutral gap-2"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title text-lg">{product.name}</h2>
        <p className="text-sm opacity-70">{product.cottonType}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-primary">৳ {product.price}</span>
          <span className="text-sm opacity-60">{product.sold} sold</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;