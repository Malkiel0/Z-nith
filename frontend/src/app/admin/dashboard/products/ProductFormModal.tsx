"use client";
// Modale de création/édition de produit pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, GET_PRODUCTS } from "@/graphql/products";

// Props du formulaire (création ou édition)
interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    sku: string;
    is_active: boolean;
  };
  onSave: (data: any) => void; // À typer avec le modèle Product
}

import { useToast } from "@/context/ToastContext";

export default function ProductFormModal({ open, onClose, initialData, onSave }: ProductFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      sku: "",
      is_active: true,
    }
  );
  const [loading, setLoading] = useState(false);

  // Mutation GraphQL pour créer un produit
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }], // Refetch automatique après ajout
  });

  // Gestion du changement d’un champ
  // Gestion du changement d’un champ (corrige bug TypeScript sur 'checked')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let fieldValue: string | number | boolean = value;
    // Type guard : si c’est un input checkbox, on prend checked
    if (type === "checkbox" && "checked" in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };


  // Soumission du formulaire (mock, à brancher sur GraphQL)
  // Soumission du formulaire : mutation GraphQL création produit
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Création du produit via mutation GraphQL
      await createProduct({
        variables: {
          data: {
            name: form.name,
            description: form.description,
            price: parseFloat(String(form.price)),
            stock_quantity: parseInt(String(form.stock_quantity)),
            sku: form.sku,
            is_active: form.is_active,
          },
        },
      });
      setLoading(false);
      showToast("Produit créé avec succès !", "success");
      onClose();
    } catch (err) {
      setLoading(false);
      showToast("Erreur lors de la création du produit.", "error");
    }
  };


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-slidein">
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-600 text-center">
          {initialData ? "Éditer le produit" : "Ajouter un produit"}
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-[#0f3460]">Nom</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Prix (€)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                min={0}
                step={0.01}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Stock</label>
              <input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity}
                min={0}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-5 h-5 accent-pink-500"
            />
            <label className="font-semibold text-[#0f3460]">Produit actif</label>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-gray-300 text-[#0f3460] font-bold hover:bg-gray-400 transition"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-700 transition"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : initialData ? "Sauvegarder" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
