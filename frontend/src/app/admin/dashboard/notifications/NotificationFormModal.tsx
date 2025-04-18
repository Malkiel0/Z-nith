"use client";
// Modale de création/édition de notification pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";

interface NotificationFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    is_read: boolean;
  };
  onSave: (data: any) => void; // À typer avec le modèle Notification
}

export default function NotificationFormModal({ open, onClose, initialData, onSave }: NotificationFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      title: "",
      message: "",
      type: "info",
      is_read: false,
    }
  );
  const [loading, setLoading] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    // TODO: mutation GraphQL pour créer/éditer la notification
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
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-400 text-center">
          {initialData ? "Éditer la notification" : "Ajouter une notification"}
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-[#0f3460]">Titre</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
              >
                <option value="info">Info</option>
                <option value="success">Succès</option>
                <option value="warning">Avertissement</option>
                <option value="error">Erreur</option>
              </select>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                name="is_read"
                checked={form.is_read}
                onChange={handleChange}
                className="w-5 h-5 accent-pink-500"
              />
              <label className="font-semibold text-[#0f3460]">Marquer comme lue</label>
            </div>
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
