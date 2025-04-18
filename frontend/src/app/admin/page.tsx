"use client";
// Dashboard admin Zénith
// Design extravagant, animations, navigation dynamique
import React from "react";
import { useRouter } from "next/navigation";

// Dashboard admin Zénith
// Les boutons naviguent dynamiquement vers les sections admin
export default function AdminDashboard() {
  // Hook de navigation Next.js (Client Component obligatoire)
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe259] via-[#ffa751] to-[#eecda3] flex flex-col items-center justify-center animate-fadein">
      <div className="p-10 rounded-3xl shadow-2xl bg-white/90 flex flex-col gap-6 max-w-2xl w-full animate-slidein">
        <h1 className="text-4xl font-extrabold text-[#0f3460] text-center tracking-wide animate-pulse">Admin Zénith</h1>
        <p className="text-xl text-[#0f3460]/80 text-center">Bienvenue dans le dashboard administrateur !</p>
        {/* Boutons de navigation admin avec handlers clairs */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/orders")}
          >
            Voir les commandes
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push("/admin/dashboard")}
          >
            Gestion produits
          </button>
        </div>
        <div className="mt-10 flex gap-4 justify-center animate-fadein">
          <span className="inline-block w-3 h-3 bg-[#0f3460] rounded-full animate-bounce" />
          <span className="inline-block w-3 h-3 bg-[#ffa751] rounded-full animate-bounce delay-150" />
          <span className="inline-block w-3 h-3 bg-[#eecda3] rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
