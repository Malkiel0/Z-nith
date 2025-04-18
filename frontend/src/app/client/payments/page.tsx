// Historique des paiements du client Zénith
// Clean code, ultra animé, design extravagant, commentaires détaillés
"use client";
import React, { useEffect, useState } from "react";

// Toast de feedback dynamique
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-2xl text-lg font-bold animate-fadein z-50">
      {message}
    </div>
  );
}
import { useSession } from "next-auth/react";

interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: string;
  status: string;
  transaction_id: string;
  paid_at?: string;
}

export default function PaymentsPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = (session as any)?.token || (session as any)?.accessToken;
        if (!token) throw new Error("Token de session manquant");
        // Appel à l’API backend pour récupérer les paiements du client
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment?order_id=all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des paiements");
        const data = await res.json();
        setPayments(data);
      } catch (e: any) {
        setError(e.message);
        setToast(e.message);
      }
      setLoading(false);
    };
    if (session) fetchPayments();
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#fff1eb] via-[#ace0f9] to-[#fbc2eb] py-12 px-4 animate-fadein">
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-10 animate-fadein">Mes paiements</h1>
      {loading ? (
        <div className="text-lg text-[#0f3460] animate-pulse">Chargement...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold animate-fadein">{error}</div>
      ) : payments.length === 0 ? (
        <div className="text-[#16213e] font-semibold animate-fadein">Aucun paiement trouvé.</div>
      ) : (
        <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-lg p-8 animate-fadein">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#0f3460] border-b">
                <th className="py-2">Commande</th>
                <th className="py-2">Montant</th>
                <th className="py-2">Méthode</th>
                <th className="py-2">Statut</th>
                <th className="py-2">Transaction</th>
                <th className="py-2">Payé le</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gradient-to-r hover:from-yellow-100 hover:to-pink-100 transition-all animate-fadein cursor-pointer"
                  onClick={() => setSelectedPayment(p)}
                  title="Voir le détail du paiement"
                >
                  <td className="py-2 font-bold">#{p.order_id}</td>
                  <td className="py-2">{p.amount.toFixed(2)} €</td>
                  <td className="py-2 capitalize">{p.method}</td>
                  <td className={
                    "py-2 font-semibold " +
                    (p.status === "success"
                      ? "text-green-600"
                      : p.status === "failed"
                      ? "text-red-500"
                      : "text-yellow-600")
                  }>
                    {p.status}
                  </td>
                  <td className="py-2 text-xs">{p.transaction_id}</td>
                  <td className="py-2 text-xs">{p.paid_at ? new Date(p.paid_at).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    {/* Modal de détail du paiement */}
    {selectedPayment && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadein">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fadein relative border-4 border-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
          <button
            className="absolute top-4 right-4 text-pink-600 hover:text-purple-700 text-2xl font-bold focus:outline-none"
            onClick={() => setSelectedPayment(null)}
            aria-label="Fermer"
          >
            ×
          </button>
          <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Détail du paiement</h2>
          <ul className="space-y-2">
            <li><span className="font-bold text-[#0f3460]">ID :</span> {selectedPayment.id}</li>
            <li><span className="font-bold text-[#0f3460]">Commande :</span> #{selectedPayment.order_id}</li>
            <li><span className="font-bold text-[#0f3460]">Montant :</span> {selectedPayment.amount.toFixed(2)} €</li>
            <li><span className="font-bold text-[#0f3460]">Méthode :</span> {selectedPayment.method}</li>
            <li><span className="font-bold text-[#0f3460]">Statut :</span> <span className={
              selectedPayment.status === "success" ? "text-green-600" : selectedPayment.status === "failed" ? "text-red-500" : "text-yellow-600"
            }>{selectedPayment.status}</span></li>
            <li><span className="font-bold text-[#0f3460]">Transaction :</span> {selectedPayment.transaction_id}</li>
            <li><span className="font-bold text-[#0f3460]">Payé le :</span> {selectedPayment.paid_at ? new Date(selectedPayment.paid_at).toLocaleString() : "-"}</li>
          </ul>
        </div>
      </div>
    )}
  </div>
  );
}
