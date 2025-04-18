"use client";
// DataGrid dynamique pour la gestion des coupons admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import CouponFormModal from "./CouponFormModal";

// Mock data coupons (à remplacer par API GraphQL)
const mockCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "Pourcentage",
    value: 10,
    usage: 34,
    max_usage: 100,
    valid_until: "2025-06-30",
    is_active: true,
  },
  {
    id: 2,
    code: "ZENITH20",
    type: "Montant",
    value: 20,
    usage: 5,
    max_usage: 20,
    valid_until: "2025-04-30",
    is_active: false,
  },
  {
    id: 3,
    code: "FREESHIP",
    type: "Livraison",
    value: 0,
    usage: 12,
    max_usage: 50,
    valid_until: "2025-12-31",
    is_active: true,
  },
];

export default function CouponsDataGrid() {
  const [search, setSearch] = useState("");
  // Mock state pour la liste des coupons (à remplacer par API)
  const [coupons, setCoupons] = useState(mockCoupons);
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);

  // Filtrage simple par code coupon
  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l’ajout d’un coupon (mock, à remplacer par mutation GraphQL)
  const handleAddCoupon = (data: any) => {
    setCoupons((prev) => [
      { ...data, id: prev.length + 1 },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Bouton d’ajout de coupon */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des coupons</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-yellow-400 text-white font-bold hover:bg-yellow-600 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter un coupon
          </button>
        </div>
      </div>
      {/* Modale d’ajout de coupon */}
      <CouponFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddCoupon}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-green-400 via-pink-500 to-yellow-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Code</th>
              <th className="py-3 px-4 text-center">Type</th>
              <th className="py-3 px-4 text-center">Valeur</th>
              <th className="py-3 px-4 text-center">Utilisations</th>
              <th className="py-3 px-4 text-center">Expiration</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun coupon trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-green-50 transition">
                  <td className="py-3 px-4 font-semibold">{c.code}</td>
                  <td className="py-3 px-4 text-center">{c.type}</td>
                  <td className="py-3 px-4 text-center">
                    {c.type === "Pourcentage" && `${c.value}%`}
                    {c.type === "Montant" && `${c.value}€`}
                    {c.type === "Livraison" && "Gratuite"}
                  </td>
                  <td className="py-3 px-4 text-center">{c.usage} / {c.max_usage}</td>
                  <td className="py-3 px-4 text-center">{c.valid_until}</td>
                  <td className="py-3 px-4 text-center">
                    {c.is_active ? (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Actif</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-400/80 text-white rounded-full text-xs font-bold">Inactif</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition">Éditer</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition">Supprimer</button>
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
