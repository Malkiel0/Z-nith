"use client";
// Modale de création/édition de retour pour l’admin Zénith
// Clean code, ultra commenté, design pro, prêt pour intégration GraphQL
import React, { useState } from "react";

interface ReturnFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    order_id: number;
    reason: string;
    status: "pending" | "approved" | "rejected";
    refund_amount: number;
  };
  onSave: (data: any) => void; // À typer avec le modèle Return
}

export default function ReturnFormModal({ open, onClose, initialData, onSave }: ReturnFormModalProps) {
  // État du formulaire (création ou édition)
  const [form, setForm] = useState(
    initialData || {
      order_id: 0,
      reason: "",
      status: "pending",
      refund_amount: 0,
    }
  );
  const [loading, setLoading] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire (mock, à brancher sur GraphQL)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: mutation GraphQL pour créer/éditer le retour
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
        <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-center">
          {initialData ? "Éditer le retour" : "Ajouter un retour"}
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-[#0f3460]">ID Commande</label>
            <input
              type="number"
              name="order_id"
              value={form.order_id}
              onChange={handleChange}
              min={1}
              required
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-[#0f3460]">Motif du retour</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition mt-1"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Statut</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition mt-1"
              >
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="font-semibold text-[#0f3460]">Montant remboursé (€)</label>
              <input
                type="number"
                name="refund_amount"
                value={form.refund_amount}
                min={0}
                step={0.01}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition mt-1"
              />
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
