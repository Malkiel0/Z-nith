"use client";
// Modale de création/édition de catégorie pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    description: string;
    is_active: boolean;
  };
  onSave: (data: any) => void; // À typer avec le modèle Category
}

export default function CategoryFormModal({ open, onClose, initialData, onSave }: CategoryFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      name: "",
      description: "",
      is_active: true,
    }
  );
  const [loading, setLoading] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission du formulaire (mock, à brancher sur GraphQL)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: mutation GraphQL pour créer/éditer la catégorie
    setTimeout(() => {
      setLoading(false);
      onSave(form);
      onClose();
    }, 800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-slidein">
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-600 text-center">
          {initialData ? "Éditer la catégorie" : "Ajouter une catégorie"}
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
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-5 h-5 accent-pink-500"
            />
            <label className="font-semibold text-[#0f3460]">Catégorie active</label>
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
