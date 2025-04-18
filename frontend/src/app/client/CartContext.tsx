"use client";
// Contexte panier Zénith : gestion du panier côté client (React Context + localStorage)
// Clean code, ultra commenté, scalable pour le multi-produit
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem("zenith_cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    localStorage.setItem("zenith_cart", JSON.stringify(cart));
  }, [cart]);

  // Ajouter un produit (ou incrémenter la quantité)
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
  };

  // Retirer un produit du panier
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // Vider le panier
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
