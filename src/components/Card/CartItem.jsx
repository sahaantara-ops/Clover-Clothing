"use client";

import React from "react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  const { image, title, quantity, price,_id } = item;
  const handleDeleteCart = ()=>{
    alert(_id)
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-4">
      {/* Product Image */}
      <div className="w-20 h-20 relative flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 mt-1">Price: ৳{price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          className="btn btn-sm btn-square btn-outline"
          onClick={() => onDecrease(item)}
        >
          <AiOutlineMinus />
        </button>
        <span className="px-2">{quantity}</span>
        <button
          className="btn btn-sm btn-square btn-outline"
          onClick={() => onIncrease(item)}
        >
          <AiOutlinePlus />
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="btn btn-sm btn-error ml-4"
        onClick={() => handleDeleteCart(item)}
        title="Remove from cart"
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default CartItem;