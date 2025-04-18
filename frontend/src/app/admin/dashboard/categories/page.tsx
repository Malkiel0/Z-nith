"use client";
// Page de gestion des catégories pour l’admin Zénith
// Clean code, design extravagant, ultra commenté
import React from "react";
import CategoriesDataGrid from "./CategoriesDataGrid";

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a1c4fd] via-[#c2e9fb] to-[#fbc2eb] flex flex-col items-center justify-center animate-fadein">
      <div className="p-10 rounded-3xl shadow-2xl bg-white/90 flex flex-col gap-8 max-w-xl w-full animate-slidein">
        <h2 className="text-3xl font-extrabold text-[#0f3460] text-center animate-pulse">Gestion des catégories</h2>
        {/* Tableau dynamique des catégories */}
        <CategoriesDataGrid />
        <p className="text-lg text-[#0f3460]/80 text-center">Interface de gestion des catégories à venir…</p>
        {/* Ici, tu pourras implémenter l’interface dynamique de gestion des catégories avec GraphQL */}
      </div>
    </div>
  );
}
