"use client";
import React, { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // start empty
   const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // runs only on client after mount
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // save cart on every update
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };


  return (
    <CartContext.Provider value={{ cart, setCart, updateQuantity, removeFromCart , searchTerm, setSearchTerm }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
