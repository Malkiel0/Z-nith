"use client";

// Page de gestion des produits pour l’admin Zénith
// Design extravagant, animations, clean code, ultra commenté
import React from "react";

import { useRouter } from "next/navigation";
// Composant principal de la page dashboard admin
import KPISection from "./KPISection";
import SalesChart from "./SalesChart";

// Données fictives pour le graphique des ventes (30 derniers jours)
const salesLabels = Array.from({ length: 30 }, (_, i) => `${i + 1}/04`);
const salesData = [120, 132, 145, 160, 180, 200, 210, 220, 230, 250, 245, 260, 270, 285, 290, 300, 310, 320, 330, 340, 355, 370, 380, 390, 410, 420, 430, 440, 450, 460];

export default function AdminProductDashboard() {
  // Hook Next.js pour la navigation dynamique
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe259] via-[#ffa751] to-[#eecda3] flex flex-col items-center justify-center animate-fadein">
      <div className="p-12 rounded-3xl shadow-2xl bg-white/90 flex flex-col gap-8 max-w-6xl w-full animate-slidein">
        {/* Section KPIs */}
        <KPISection />
        {/* Graphique des ventes */}
        <SalesChart labels={salesLabels} data={salesData} />
        <h1 className="text-4xl font-extrabold text-[#0f3460] text-center tracking-wide animate-pulse">
          Gestion des Produits Zénith
        </h1>
        <p className="text-xl text-[#0f3460]/80 text-center">
          Ajoutez, modifiez ou supprimez les produits de la boutique avec une interface dynamique et intuitive.
        </p>
        {/* Section d’actions principales admin */}
        <div className="flex gap-6 justify-center mt-8">
          <button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform animate-bounce"
            onClick={() => router.push("/admin/dashboard/add-product")}
          >
            Ajouter un produit
          </button>
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform animate-bounce delay-150"
            onClick={() => router.push("/admin/dashboard/categories")}
          >
            Gérer les catégories
          </button>
        </div>
        {/* Animation décorative */}
        <div className="mt-10 flex gap-4 justify-center animate-fadein">
          <span className="inline-block w-4 h-4 bg-[#0f3460] rounded-full animate-bounce" />
          <span className="inline-block w-4 h-4 bg-[#ffa751] rounded-full animate-bounce delay-150" />
          <span className="inline-block w-4 h-4 bg-[#eecda3] rounded-full animate-bounce delay-300" />
        </div>
        {/* Liste des produits (à implémenter avec récupération GraphQL) */}
        <div className="mt-12">
          <div className="text-center text-lg text-[#0f3460]/70 mb-4">Liste des produits à venir…</div>
          {/* Ici, on affichera la grille des produits avec édition/suppression */}
        </div>
      </div>
    </div>
  );
}
