"use client";
// Page d'accueil client Zénith
// Design dynamique, animations, extrême fluidité
import React from "react";

import ProductGrid from "./ProductGrid";
import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";
import ClientMenu from "./ClientMenu";

export default function ClientHome() {
  return (
    <CartProvider>
      {/* Contenu principal uniquement, le layout global gère le menu et le fond */}
      <div className="p-10 rounded-3xl shadow-2xl bg-white/90 flex flex-col gap-6 max-w-4xl w-full animate-slidein mb-8">
        <h1 className="text-4xl font-extrabold text-[#ffb347] text-center tracking-wide animate-pulse">Bienvenue chez Zénith</h1>
        <p className="text-xl text-[#0f3460]/80 text-center">Découvrez nos produits et vivez une expérience unique !</p>
      </div>
      {/* Grille dynamique de produits (React Server Component) */}
      {(() => {
        const [showCheckout, setShowCheckout] = React.useState(false);
        // Lazy import CheckoutPage pour éviter le SSR côté client
        const CheckoutPage = React.useMemo(() => require("./CheckoutPage").default, []);
        return (
          <>
            {!showCheckout ? (
              <>
                <ProductGrid />
                <div className="flex justify-center mt-12">
                  <button
                    className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl text-xl hover:scale-105 transition-transform animate-bounce"
                    onClick={() => setShowCheckout(true)}
                  >
                    Passer la commande
                  </button>
                </div>
              </>
            ) : (
              <CheckoutPage />
            )}
          </>
        );
      })()}
      {/* Tiroir panier flottant, accessible partout */}
      <CartDrawer />
    </CartProvider>
  );
}

