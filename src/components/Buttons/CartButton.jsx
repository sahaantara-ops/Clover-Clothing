"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const CartButton = ({ product }) => {
 
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

 const handleAddToCart = () => {
   console.log("Session:", session);
    if (!session) {
      
      router.push(`/auth/login?callbackUrl=${pathname}`);
    } else {
      
      router.push(`/Products/${product._id}`);
    }
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