"use client";
// Page d’ajout de produit pour l’admin Zénith
// Clean code, design extravagant, ultra commenté
import React from "react";

import AddProductForm from "./AddProductForm";

export default function AdminAddProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffb347] via-[#ffcc70] to-[#ffe29f] flex flex-col items-center justify-center animate-fadein">
      <div className="p-10 rounded-3xl shadow-2xl bg-white/90 flex flex-col gap-8 max-w-xl w-full animate-slidein">
        <h2 className="text-3xl font-extrabold text-[#0f3460] text-center animate-pulse">Ajouter un produit</h2>
        <p className="text-lg text-[#0f3460]/80 text-center">Remplissez le formulaire ci-dessous pour ajouter un nouveau produit à la boutique Zénith.</p>
        {/* Formulaire dynamique et validé, clean code, animations, prêt pour GraphQL */}
        <AddProductForm />
      </div>
    </div>
  );
}
