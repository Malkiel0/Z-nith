// Page AdminCouponsPage : visualisation de tous les coupons et de leur utilisation
// Clean code, ultra commenté, design extravagant
"use client";
import React, { useEffect, useState } from "react";

interface Coupon {
  id: number;
  code: string;
  type: string;
  value: number;
  usage_limit: number | null;
  expires_at?: string;
  order_coupons: { id: number }[];
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/coupons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des coupons");
        const data = await res.json();
        setCoupons(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchCoupons();
  }, []);

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-pink-600">Gestion des coupons</h2>
      {loading ? <div>Chargement...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-green-100 to-yellow-100">
              <th className="p-2">ID</th>
              <th className="p-2">Code</th>
              <th className="p-2">Type</th>
              <th className="p-2">Valeur</th>
              <th className="p-2">Utilisations</th>
              <th className="p-2">Limite</th>
              <th className="p-2">Expire le</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} className="border-b border-green-100">
                <td className="p-2">{c.id}</td>
                <td className="p-2 font-mono font-bold">{c.code}</td>
                <td className="p-2 capitalize">{c.type}</td>
                <td className="p-2">{c.value}</td>
                <td className="p-2 font-bold text-blue-600">{c.order_coupons.length}</td>
                <td className="p-2">{c.usage_limit ?? '-'}</td>
                <td className="p-2 text-xs">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
