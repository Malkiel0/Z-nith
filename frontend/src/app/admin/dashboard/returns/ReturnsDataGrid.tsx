"use client";
// DataGrid dynamique pour la gestion des retours admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import ReturnFormModal from "./ReturnFormModal";

// Mock data retours (à remplacer par API GraphQL)
const mockReturns = [
  {
    id: 1,
    order_id: 101,
    client: "Alice Dupont",
    date: "2025-04-17",
    reason: "Produit défectueux",
    status: "pending",
    amount: 49.99,
  },
  {
    id: 2,
    order_id: 102,
    client: "Bob Martin",
    date: "2025-04-18",
    reason: "Erreur de taille",
    status: "approved",
    amount: 29.99,
  },
  {
    id: 3,
    order_id: 103,
    client: "Chloé Leroy",
    date: "2025-04-18",
    reason: "Changement d’avis",
    status: "refused",
    amount: 89.99,
  },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-400/80" },
  approved: { label: "Approuvé", color: "bg-green-400/80" },
  refused: { label: "Refusé", color: "bg-red-400/80" },
  refunded: { label: "Remboursé", color: "bg-blue-400/80" },
};

export default function ReturnsDataGrid() {
  const [search, setSearch] = useState("");
  // Mock state pour la liste des retours (à remplacer par API)
  const [returns, setReturns] = useState(mockReturns);
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);

  // Filtrage simple par ID commande
  const filtered = returns.filter((r) =>
    r.order_id.toString().includes(search)
  );

  // Gestion de l’ajout d’un retour (mock, à remplacer par mutation GraphQL)
  const handleAddReturn = (data: any) => {
    setReturns((prev) => [
      { ...data, id: prev.length + 1, created_at: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Bouton d’ajout de retour */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des retours</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher par ID commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter un retour
          </button>
        </div>
      </div>
      {/* Modale d’ajout de retour */}
      <ReturnFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddReturn}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Commande</th>
              <th className="py-3 px-4 text-left">Client</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Motif</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-right">Montant (€)</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun retour trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-200 hover:bg-yellow-50 transition">
                  <td className="py-3 px-4 font-semibold">#{r.order_id}</td>
                  <td className="py-3 px-4">{r.client}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">{r.reason}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-white rounded-full text-xs font-bold ${statusMap[r.status]?.color || "bg-gray-400"}`}>
                      {statusMap[r.status]?.label || r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{r.amount.toFixed(2)}</td>
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
