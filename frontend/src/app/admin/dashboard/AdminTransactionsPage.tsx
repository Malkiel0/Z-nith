// Page AdminTransactionsPage : visualisation de l’historique des transactions financières
// Clean code, ultra commenté, design extravagant
"use client";
import React, { useEffect, useState } from "react";

interface Transaction {
  id: number;
  user_id?: number;
  order_id?: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  // Couleurs de statut
  const statusColors: Record<string, string> = {
    paid: "text-green-600",
    refunded: "text-blue-500",
    pending: "text-yellow-500",
    failed: "text-red-500",
    commission: "text-purple-500",
    withdrawal: "text-pink-500",
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-600">Historique des transactions financières</h2>
      {loading ? <div>Chargement...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-yellow-100">
              <th className="p-2">ID</th>
              <th className="p-2">Utilisateur</th>
              <th className="p-2">Commande</th>
              <th className="p-2">Type</th>
              <th className="p-2">Montant (€)</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className="border-b border-pink-100">
                <td className="p-2">{t.id}</td>
                <td className="p-2">{t.user_id ?? '-'}</td>
                <td className="p-2">{t.order_id ?? '-'}</td>
                <td className="p-2 capitalize">{t.type}</td>
                <td className="p-2">{t.amount.toLocaleString()}</td>
                <td className={`p-2 font-bold ${statusColors[t.status] || 'text-gray-700'}`}>{t.status}</td>
                <td className="p-2 text-xs">{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
