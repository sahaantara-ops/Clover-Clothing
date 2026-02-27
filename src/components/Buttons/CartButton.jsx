"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CartButton = ({ product }) => {
  const isLogin = false;
  const router = useRouter();
  const path = usePathname();

  const handleAddToCart = () => {
    if (isLogin) {
      alert(product._id);
    } else {
      router.push(`/auth/login?redirect=${path}`);
    }
    // You can integrate your cart logic here
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition duration-300 shadow-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartButton;