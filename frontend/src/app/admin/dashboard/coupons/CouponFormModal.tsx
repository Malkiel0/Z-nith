"use client";
// Modale de création/édition de coupon pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";

interface CouponFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
    expires_at: string;
    is_active: boolean;
  };
  onSave: (data: any) => void; // À typer avec le modèle Coupon
}

import { useToast } from "@/context/ToastContext";

export default function CouponFormModal({ open, onClose, initialData, onSave }: CouponFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      code: "",
      discount: 0,
      type: "percentage",
      expires_at: "",
      is_active: true,
    }
  );
  const [loading, setLoading] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Soumission du formulaire (mock, à brancher sur GraphQL)
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
      setLoading(false);
      showToast(initialData ? "Coupon modifié avec succès !" : "Coupon créé avec succès !", "success");
      onClose();
    } catch (err) {
      setLoading(false);
      showToast("Erreur lors de l'enregistrement du coupon.", "error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-slidein">
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-600 text-center">
          {initialData ? "Éditer le coupon" : "Ajouter un coupon"}
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-[#0f3460]">Code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition mt-1"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Réduction</label>
              <input
                type="number"
                name="discount"
                value={form.discount}
                min={0}
                step={0.01}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition mt-1"
              >
                <option value="percentage">Pourcentage (%)</option>
                <option value="fixed">Montant fixe (€)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Expiration</label>
            <input
              type="date"
              name="expires_at"
              value={form.expires_at}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-5 h-5 accent-yellow-500"
            />
            <label className="font-semibold text-[#0f3460]">Coupon actif</label>
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
              className="px-6 py-2 rounded-xl bg-yellow-400 text-white font-bold hover:bg-yellow-600 transition"
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
