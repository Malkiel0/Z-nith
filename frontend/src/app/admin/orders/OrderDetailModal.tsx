// Composant OrderDetailModal : affiche les paiements liés à une commande (clean code, ultra commenté, design extravagant)
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import OrderActions from "./OrderActions";

interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: string;
  status: string;
  transaction_id: string;
  paid_at?: string;
}

export default function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const { data: session } = useSession();
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = (session as any)?.token || (session as any)?.accessToken;
        if (!token) throw new Error("Token de session manquant");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment?order_id=${order.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des paiements");
        const data = await res.json();
        setPayments(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchPayments();
  }, [order.id, session]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadein">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fadein relative border-4 border-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
        <button
          className="absolute top-4 right-4 text-pink-600 hover:text-purple-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Détail de la commande</h2>
        <ul className="space-y-2 mb-6">
          <li><span className="font-bold text-[#0f3460]">ID :</span> {order.id}</li>
          <li><span className="font-bold text-[#0f3460]">Client :</span> {order.user_id}</li>
          <li><span className="font-bold text-[#0f3460]">Total :</span> {order.total.toFixed(2)} €</li>
          <li><span className="font-bold text-[#0f3460]">Statut :</span> <span className={
            order.status === "completed" ? "text-green-600" : order.status === "cancelled" ? "text-red-500" : "text-yellow-600"
          }>{order.status}</span></li>
          <li><span className="font-bold text-[#0f3460]">Créée le :</span> {new Date(order.created_at).toLocaleString()}</li>
          <li><span className="font-bold text-[#0f3460]">Dernière maj :</span> {new Date(order.updated_at).toLocaleString()}</li>
        </ul>
        <div>
          <h3 className="text-lg font-bold mb-2 text-pink-600">Paiements liés à cette commande :</h3>
          {loading ? (
            <div className="text-pink-600 animate-pulse">Chargement...</div>
          ) : error ? (
            <div className="text-red-500 font-semibold animate-fadein">{error}</div>
          ) : payments.length === 0 ? (
            <div className="text-gray-500 font-semibold animate-fadein">Aucun paiement trouvé pour cette commande.</div>
          ) : (
            <ul className="space-y-1">
              {payments.map((p) => (
                <li key={p.id} className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-lg px-4 py-2 mb-2 shadow animate-fadein">
                  <span className="font-bold text-[#0f3460]">{p.amount.toFixed(2)} €</span> —
                  <span className="ml-2 capitalize">{p.method}</span> —
                  <span className={
                    "font-semibold ml-2 " +
                    (p.status === "success"
                      ? "text-green-600"
                      : p.status === "failed"
                      ? "text-red-500"
                      : "text-yellow-600")
                  }>{p.status}</span>
                  <span className="ml-2 text-xs text-gray-500">({p.transaction_id})</span>
                  <span className="ml-2 text-xs text-gray-500">{p.paid_at ? new Date(p.paid_at).toLocaleString() : "-"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Actions rapides admin */}
        <OrderActions orderId={order.id} currentStatus={order.status} onActionDone={() => window.location.reload()} />
      </div>
    </div>
  );
}
