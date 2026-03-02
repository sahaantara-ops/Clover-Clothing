"use client";

import Image from "next/image";
import Link from "next/link";
import CartButton from "../Buttons/CartButton";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 group relative">

      {/* Product Image */}
      <figure className="relative overflow-hidden">
        <Link href={`/Products/${product._id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            unoptimized
            className="w-full h-72 object-cover group-hover:scale-105 transition duration-300 cursor-pointer"
          />
        </Link>
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <Link href={`/Products/${product._id}`}>
          <h2 className="card-title text-lg cursor-pointer hover:underline">
            {product.name}
          </h2>
        </Link>

        <p className="text-sm opacity-70">{product.cottonType}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-primary">৳ {product.price}</span>
          <span className="text-sm opacity-60">{product.sold} sold</span>
        </div>

       
        <CartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;