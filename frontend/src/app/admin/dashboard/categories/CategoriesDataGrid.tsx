"use client";
// DataGrid dynamique pour la gestion des catégories admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from "@/graphql/categories";
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
  // Hook pour les toasts dynamiques
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);
  // État de la catégorie en édition
  // Typage explicite pour la catégorie en édition
interface Category {
  id: number;
  name: string;
  description: string;
  products: number;
  is_active: boolean;
}
const [editCategory, setEditCategory] = useState<Category | null>(null);

  // Récupération des catégories via Apollo GraphQL
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];

  // Filtrage simple par nom catégorie
  const filtered = categories.filter((c: { name: string }) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Mutations pour l’ajout, l’édition et la suppression de catégories
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [removeCategory] = useMutation(REMOVE_CATEGORY);

  // Gestion de l’ajout d’une catégorie
  const handleAddCategory = async (data: any) => {
    await createCategory({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          is_active: data.is_active,
        },
      },
      refetchQueries: [{ query: GET_CATEGORIES }],
    });
  };

  // Gestion de la suppression d’une catégorie
  const handleDeleteCategory = async (id: number) => {
    try {
      await removeCategory({ variables: { id }, refetchQueries: [{ query: GET_CATEGORIES }] });
      showToast("Catégorie supprimée avec succès !", "success");
    } catch (err) {
      showToast("Erreur lors de la suppression de la catégorie.", "error");
    }
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des catégories…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des catégories.</div>
      )}
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
      {/* Modale d’ajout/édition de catégorie */}
      <CategoryFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditCategory(null);
        }}
        initialData={editCategory || undefined}
        onSave={async (data: any) => {
          if (editCategory) {
            // Édition via mutation GraphQL
            await updateCategory({
              variables: {
                id: editCategory.id,
                data: {
                  name: data.name,
                  description: data.description,
                  is_active: data.is_active,
                },
              },
              refetchQueries: [{ query: GET_CATEGORIES }],
            });
            setEditCategory(null);
          } else {
            // Ajout via mutation GraphQL
            await createCategory({
              variables: {
                data: {
                  name: data.name,
                  description: data.description,
                  is_active: data.is_active,
                },
              },
              refetchQueries: [{ query: GET_CATEGORIES }],
            });
          }
          setOpenModal(false);
        }}
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
              filtered.map((category: { id: number; name: string; description: string; products: number; is_active: boolean }) => (
                <tr key={category.id} className="border-b border-gray-200 hover:bg-pink-50 transition">
                  <td className="py-3 px-4 font-semibold">{category.name}</td>
                  <td className="py-3 px-4">{category.description}</td>
                  <td className="py-3 px-4 text-center">{category.products}</td>
                  <td className="py-3 px-4 text-center">
                    {category.is_active ? (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Active</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-400/80 text-white rounded-full text-xs font-bold">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditCategory(category);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de cette catégorie ?")) {
                          await removeCategory({ variables: { id: category.id }, refetchQueries: [{ query: GET_CATEGORIES }] });
                        }
                      }}
                    >
                      Supprimer
                    </button>
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
