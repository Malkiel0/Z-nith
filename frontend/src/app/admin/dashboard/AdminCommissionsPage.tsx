// Page AdminCommissionsPage : visualisation et gestion des commissions
// Clean code, ultra commenté, design extravagant
"use client";
import React, { useEffect, useState } from "react";

interface Commission {
  id: number;
  order_id: number;
  amount: number;
  collected: boolean;
}

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/commissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des commissions");
        const data = await res.json();
        setCommissions(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchCommissions();
  }, []);

  // Handler de validation d'une commission
  const handleValidate = async (id: number) => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/commissions/${id}/validate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la validation");
      setCommissions(commissions => commissions.map(c => c.id === id ? { ...c, collected: true } : c));
    } catch {}
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Gestion des commissions</h2>
      {loading ? <div>Chargement...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-yellow-100">
              <th className="p-2">Commande</th>
              <th className="p-2">Montant (€)</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(c => (
              <tr key={c.id} className="border-b border-pink-100">
                <td className="p-2">#{c.order_id}</td>
                <td className="p-2">{c.amount.toLocaleString()}</td>
                <td className="p-2">{c.collected ? <span className="text-green-500 font-bold">Validée</span> : <span className="text-yellow-500 font-bold">En attente</span>}</td>
                <td className="p-2">
                  {!c.collected && <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-1 rounded-xl shadow hover:scale-105" onClick={() => handleValidate(c.id)}>Valider</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
