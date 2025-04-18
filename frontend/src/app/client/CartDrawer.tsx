"use client";
// Tiroir latéral "Mon panier" pour Zénith (affichage, modification, suppression, total)
// Clean code, animations, design extravagant, ultra commenté
import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  // Calcul du total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Bouton flottant pour ouvrir le panier */}
      <button
        className="fixed z-50 bottom-8 right-8 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl font-bold hover:scale-110 transition-transform animate-bounce"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le panier"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>
      {/* Tiroir latéral */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white/95 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: open ? '0 0 80px 10px #ffb34788' : undefined }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#ffb347]">Mon panier</h2>
          <button className="text-gray-500 text-2xl hover:text-red-500" onClick={() => setOpen(false)} aria-label="Fermer">×</button>
        </div>
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center py-10">Votre panier est vide.</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl shadow p-3 animate-fadein">
                <img src={item.image_url || '/images/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded-lg border-2 border-[#ffb347]" />
                <div className="flex-1">
                  <div className="font-bold text-[#0f3460]">{item.name}</div>
                  <div className="text-gray-600 text-sm">{item.price} € × {item.quantity}</div>
                </div>
                <button
                  className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Supprimer"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-gray-200 flex flex-col gap-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-[#ffb347]">{total.toFixed(2)} €</span>
          </div>
          <button
            className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            disabled={cart.length === 0}
            onClick={() => alert('Passage en caisse à venir !')}
          >
            Passer la commande
          </button>
          <button
            className="w-full text-gray-400 underline hover:text-red-500 transition"
            disabled={cart.length === 0}
            onClick={clearCart}
          >
            Vider le panier
          </button>
        </div>
      </div>
      {/* Overlay sombre pour fermer */}
      {open && <div className="fixed inset-0 bg-black/30 z-40 animate-fadein" onClick={() => setOpen(false)} />}
    </>
  );
}
