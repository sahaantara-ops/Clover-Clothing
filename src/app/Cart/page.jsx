import { getCart } from "@/Action/Server/cart";
import CartItem from "@/components/Card/CartItem";
import Cart from "@/components/Home/Cart";
import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  const formattedItems =  cartItems.map((item)=>({
    ...item,
    _id: item._id.toString()
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-4xl font-bold text-gray-800 border-l-4 border-green pl-4">
  My Cart
</h2>

       
  </div>

     <Cart cartItems={formattedItems}></Cart>
      
    </div>
  );
};

export default CartPage;