"use client";
// Modale de création/édition de client pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";

interface ClientFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    email: string;
    phone: string;
    status: string;
  };
  onSave: (data: any) => void; // À typer avec le modèle User
}

import { useToast } from "@/context/ToastContext";

export default function ClientFormModal({ open, onClose, initialData, onSave }: ClientFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      status: "active",
    }
  );
  const [loading, setLoading] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire (mock, à brancher sur GraphQL)
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
      setLoading(false);
      showToast(initialData ? "Client modifié avec succès !" : "Client créé avec succès !", "success");
      onClose();
    } catch (err) {
      setLoading(false);
      showToast("Erreur lors de l'enregistrement du client.", "error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-slidein">
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-center">
          {initialData ? "Éditer le client" : "Ajouter un client"}
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
            <label className="font-semibold text-[#0f3460]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Statut</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="banned">Banni</option>
            </select>
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
              className="px-6 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700 transition"
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
