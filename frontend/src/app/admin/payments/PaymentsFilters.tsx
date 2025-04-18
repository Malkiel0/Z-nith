// Filtres dynamiques pour la gestion des paiements admin (Zénith)
// Clean code, ultra commenté, design extravagant
"use client";
import React from "react";

export interface PaymentsFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export default function PaymentsFilters({ status, onStatusChange, search, onSearchChange }: PaymentsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-center animate-fadein">
      {/* Filtre par statut */}
      <select
        className="px-4 py-2 rounded-xl border-2 border-pink-400 bg-white text-pink-700 font-bold focus:outline-none focus:ring-2 focus:ring-pink-400 transition shadow"
        value={status}
        onChange={e => onStatusChange(e.target.value)}
      >
        <option value="">Tous statuts</option>
        <option value="success">Succès</option>
        <option value="pending">En attente</option>
        <option value="failed">Échoué</option>
      </select>
      {/* Recherche par commande, transaction ou client */}
      <input
        type="text"
        className="px-4 py-2 rounded-xl border-2 border-yellow-400 bg-white text-yellow-700 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow w-64"
        placeholder="Recherche (commande, transaction...)"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
}
