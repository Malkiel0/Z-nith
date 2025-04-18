"use client";
// DataGrid dynamique pour la gestion des catégories admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import CategoryFormModal from "./CategoryFormModal";

// Mock data catégories (à remplacer par API GraphQL)
const mockCategories = [
  {
    id: 1,
    name: "Vêtements",
    description: "T-shirts, sweats, vestes, etc.",
    products: 18,
    is_active: true,
  },
  {
    id: 2,
    name: "Accessoires",
    description: "Casquettes, sacs, etc.",
    products: 7,
    is_active: true,
  },
  {
    id: 3,
    name: "Packs",
    description: "Packs découverte, offres groupées",
    products: 3,
    is_active: false,
  },
];

export default function CategoriesDataGrid() {
  const [search, setSearch] = useState("");
  // Mock state pour la liste des catégories (à remplacer par API)
  const [categories, setCategories] = useState(mockCategories);
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);

  // Filtrage simple par nom
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l’ajout d’une catégorie (mock, à remplacer par mutation GraphQL)
  const handleAddCategory = (data: any) => {
    setCategories((prev) => [
      { ...data, id: prev.length + 1, products: 0 },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Bouton d’ajout de catégorie */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des catégories</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-700 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter une catégorie
          </button>
        </div>
      </div>
      {/* Modale d’ajout de catégorie */}
      <CategoryFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddCategory}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Nom</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Produits</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[#0f3460]/60">
                  Aucune catégorie trouvée.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-pink-50 transition">
                  <td className="py-3 px-4 font-semibold">{c.name}</td>
                  <td className="py-3 px-4">{c.description}</td>
                  <td className="py-3 px-4 text-center">{c.products}</td>
                  <td className="py-3 px-4 text-center">
                    {c.is_active ? (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Active</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-400/80 text-white rounded-full text-xs font-bold">Inactive</span>
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
