"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);

  const addToCart = async (product) => {

    setCart((prev) => [...prev, product]);

    try {
      const res = await fetch(
        `/api/products/compare?cottonType=${product.cottonType}&id=${product._id}`
      );

      const data = await res.json();
      setCompareProducts(data);

    } catch (error) {
      console.error("Compare fetch error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        compareProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);