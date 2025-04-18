"use client";
// DataGrid dynamique pour la gestion des commandes admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";

// Mock data commandes (à remplacer par API GraphQL)
const mockOrders = [
  {
    id: 101,
    client: "Alice Dupont",
    date: "2025-04-17",
    status: "paid",
    total: 120.5,
    items: 3,
  },
  {
    id: 102,
    client: "Bob Martin",
    date: "2025-04-18",
    status: "pending",
    total: 49.99,
    items: 1,
  },
  {
    id: 103,
    client: "Chloé Leroy",
    date: "2025-04-18",
    status: "shipped",
    total: 89.99,
    items: 2,
  },
];

const statusMap: Record<string, { label: string; color: string }> = {
  paid: { label: "Payée", color: "bg-green-400/80" },
  pending: { label: "En attente", color: "bg-yellow-400/80" },
  shipped: { label: "Expédiée", color: "bg-blue-400/80" },
  canceled: { label: "Annulée", color: "bg-red-400/80" },
  refunded: { label: "Remboursée", color: "bg-purple-400/80" },
};

export default function OrdersDataGrid() {
  const [search, setSearch] = useState("");
  // Filtrage simple par nom client ou ID
  const filtered = mockOrders.filter((o) =>
    o.client.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toString().includes(search)
  );

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des commandes</h2>
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition w-full md:w-72"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">ID</th>
              <th className="py-3 px-4 text-left">Client</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-right">Total (€)</th>
              <th className="py-3 px-4 text-center">Articles</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucune commande trouvée.
                </td>
              </tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-200 hover:bg-purple-50 transition">
                  <td className="py-3 px-4 font-semibold">#{o.id}</td>
                  <td className="py-3 px-4">{o.client}</td>
                  <td className="py-3 px-4">{o.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-white rounded-full text-xs font-bold ${statusMap[o.status]?.color || "bg-gray-400"}`}>
                      {statusMap[o.status]?.label || o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{o.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">{o.items}</td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition">Voir</button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition">Statut</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination, filtres avancés, actions groupées à venir */}
    </div>
  );
}
