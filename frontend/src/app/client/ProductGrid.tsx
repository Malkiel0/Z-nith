"use client";
// Grille d'affichage des produits pour le dashboard client Zénith
// Utilise React Server Components et récupère les produits via GraphQL (Nest.js backend)
// Clean code, ultra commenté, design dynamique
import React, { useState, useEffect } from "react";
// Import du hook useCart pour gérer le panier
import { useCart } from "./CartContext";

// Typage des produits (adapter selon le schéma GraphQL)
type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number;
  image_url?: string;
};

// Fonction utilitaire pour récupérer les produits depuis l'API GraphQL
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        products {
          id
          name
          slug
          description
          price
          discount_price
          image_url
        }
      }`
    }),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const { data } = await res.json();
  return data?.products || [];
}

// Composant principal : grille de produits
export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    fetchProducts().then(ps => {
      setProducts(ps);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-10 animate-pulse">Chargement des produits...</div>;
  }
  if (products.length === 0) {
    return <div className="text-center text-gray-500 py-10">Aucun produit disponible pour le moment.</div>;
  }

  // Fonction pour ajouter un produit au panier avec feedback
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discount_price ?? product.price,
      quantity: 1,
      image_url: product.image_url,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {products.map(product => (
        <div key={product.id} className="bg-white/90 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform flex flex-col items-center animate-fadein">
          <img
            src={product.image_url || '/images/placeholder.png'}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-xl mb-4 border-4 border-[#ffb347] shadow-lg"
          />
          <h2 className="text-xl font-bold text-[#0f3460] text-center mb-2">{product.name}</h2>
          <p className="text-gray-600 text-center mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold text-[#ffb347]">{product.discount_price ?? product.price} €</span>
            {product.discount_price && (
              <span className="line-through text-gray-400 text-lg">{product.price} €</span>
            )}
          </div>
          <button
            className={`bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:scale-105 transition-transform ${addedId === product.id ? 'scale-110 ring-4 ring-green-400/60' : ''}`}
            onClick={() => handleAddToCart(product)}
            disabled={addedId === product.id}
          >
            {addedId === product.id ? 'Ajouté !' : 'Ajouter au panier'}
          </button>
        </div>
      ))}
    </div>
  );
}

