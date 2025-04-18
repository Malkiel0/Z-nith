"use client";
// DataGrid dynamique pour la gestion des produits admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, UPDATE_PRODUCT, REMOVE_PRODUCT } from "@/graphql/products";
import ProductFormModal from "./ProductFormModal";

// Mock data produits (à remplacer par API GraphQL)
const mockProducts = [
  {
    id: 1,
    name: "T-shirt Zénith",
    price: 29.99,
    stock_quantity: 42,
    type: "simple",
    sku: "ZEN-TSHIRT-001",
    is_active: true,
  },
  {
    id: 2,
    name: "Sweat Zénith",
    price: 49.99,
    stock_quantity: 18,
    type: "simple",
    sku: "ZEN-SWEAT-002",
    is_active: false,
  },
  {
    id: 3,
    name: "Pack Découverte",
    price: 89.99,
    stock_quantity: 7,
    type: "bundle",
    sku: "ZEN-PACK-003",
    is_active: true,
  },
];

export default function ProductsDataGrid() {
  const [search, setSearch] = useState("");
  // Les produits sont désormais récupérés via GraphQL
  // Les produits sont récupérés via GraphQL (plus de mock ni setProducts)

  // État d’ouverture de la modale (ajout ou édition)
  const [openModal, setOpenModal] = useState(false);
  // Produit sélectionné pour édition (null = ajout)
  const [editProduct, setEditProduct] = useState<any | null>(null);

  // Mutation GraphQL édition produit
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  // Mutation GraphQL suppression produit
  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  // Récupération des produits via Apollo GraphQL
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const products = data?.products || [];

  // Filtrage simple par nom produit
  // Typage explicite du produit pour éviter tout warning TypeScript
  const filtered = products.filter((p: {
    name: string;
    [key: string]: any;
  }) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l’ajout d’un produit (mock, à remplacer par mutation GraphQL)
  const handleAddProduct = (data: any) => {
    setProducts((prev) => [
      { ...data, id: prev.length + 1 },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Bouton d’ajout de produit */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des produits</h2>
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
            + Ajouter un produit
          </button>
        </div>
      </div>
      {/* Modale d’ajout/édition de produit */}
      <ProductFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        initialData={editProduct || undefined}
        onSave={async (data: any) => {
          if (editProduct) {
            // Édition via mutation GraphQL
            await updateProduct({
              variables: {
                id: editProduct.id,
                data: {
                  name: data.name,
                  description: data.description,
                  price: parseFloat(String(data.price)),
                  stock_quantity: parseInt(String(data.stock_quantity)),
                  sku: data.sku,
                  is_active: data.is_active,
                },
              },
            });
            setEditProduct(null);
          } else {
            // Ajout (la mutation est déjà gérée dans ProductFormModal)
            // On ne fait rien ici
          }
          setOpenModal(false);
        }}
      />

      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des produits…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des produits.</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Nom</th>
              <th className="py-3 px-4 text-left">Prix (€)</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">SKU</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun produit trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((product: {
                id: number;
                name: string;
                price: number;
                stock_quantity: number;
                sku: string;
                is_active: boolean;
                type?: string;
                [key: string]: any;
              }) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-yellow-50 transition">
                  <td className="py-3 px-4 font-semibold">{product.name}</td>
                  <td className="py-3 px-4">{product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.stock_quantity}</td>
                  <td className="py-3 px-4 capitalize">{product.type}</td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td className="py-3 px-4 text-center">
                    {product.is_active ? (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Actif</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-400/80 text-white rounded-full text-xs font-bold">Inactif</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditProduct(product);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de ce produit ?")) {
                          await removeProduct({ variables: { id: product.id } });
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
