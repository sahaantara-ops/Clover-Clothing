"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { deleteItemsFromCart, handleCart } from "@/Action/Server/cart";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
 
  const router = useRouter();
  const pathname = usePathname();
  const [loading,setLoading] = useState();
  const { data: session,status } = useSession();
  console.log(session);
  console.log(status);

 const handleAddToCart = async () => {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Remove it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const result = await deleteItemsFromCart(_id);
    if (result.success){
          Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    }); 
    }else{
         Swal.fire({
      title: "Oops! something error",
      text: "Your file has been deleted.",
      icon: "success"
    });
  
  }
}
});
  setLoading(true);

  if (status === "unauthenticated") {
    router.push(`/auth/login?callbackUrl=${pathname}`);
    return;
  }

  const result = await handleCart({ product, inc: true });

  if (result?.success) {
    Swal.fire("Added to cart successfully", product?.name, "success");
  } else {
    Swal.fire("Oops!! Something went wrong", product?.name, "error");
  }
  setLoading(false);
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