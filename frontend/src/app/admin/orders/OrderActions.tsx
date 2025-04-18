// Actions rapides sur commande (admin) - clean code, ultra commenté, design extravagant
"use client";
import React, { useState } from "react";

export interface OrderActionsProps {
  orderId: number;
  currentStatus: string;
  onActionDone?: () => void;
}

export default function OrderActions({ orderId, currentStatus, onActionDone }: OrderActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Changement de statut de la commande (terminée, annulée)
  const changeStatus = async (newStatus: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur lors du changement de statut");
      setSuccess("Statut mis à jour avec succès");
      if (onActionDone) onActionDone();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  // Remboursement (fictif, à connecter à la logique réelle)
  const refundOrder = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur lors du remboursement");
      setSuccess("Commande remboursée avec succès");
      if (onActionDone) onActionDone();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-4 animate-fadein">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded-xl bg-green-500 text-white font-bold shadow hover:bg-green-600 transition"
          disabled={loading || currentStatus === "completed"}
          onClick={() => changeStatus("completed")}
        >
          Marquer comme terminée
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold shadow hover:bg-red-600 transition"
          disabled={loading || currentStatus === "cancelled"}
          onClick={() => changeStatus("cancelled")}
        >
          Annuler la commande
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-yellow-500 text-white font-bold shadow hover:bg-yellow-600 transition"
          disabled={loading || currentStatus === "cancelled"}
          onClick={refundOrder}
        >
          Rembourser
        </button>
      </div>
      {loading && <div className="text-pink-600 animate-pulse">Traitement...</div>}
      {error && <div className="text-red-500 font-semibold animate-fadein">{error}</div>}
      {success && <div className="text-green-600 font-semibold animate-fadein">{success}</div>}
    </div>
  );
}
