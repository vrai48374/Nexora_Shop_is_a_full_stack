import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await API.get("/cart");
      setCart(res.data || { items: [], totalAmount: 0 });
    } catch (err) {
      setCart({ items: [], totalAmount: 0 });
      console.error("fetchCart:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add product (qty default 1)
  const addToCart = async (productId, qty = 1) => {
    try {
      setLoading(true);
      const res = await API.post("/cart", { productId, qty });
      setCart(res.data);
    } catch (err) {
      console.error("addToCart:", err?.response?.data || err?.message || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove product by product id
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const res = await API.delete(`/cart/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error("removeFromCart:", err?.message || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (cartItems) => {
    try {
      setLoading(true);
      const res = await API.post("/checkout", { cartItems });
      // Backend clears cart; fetch fresh
      setCart({ items: [], totalAmount: 0 });
      return res.data;
    } catch (err) {
      console.error("checkout:", err?.message || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeFromCart, fetchCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
