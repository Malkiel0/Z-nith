// Page AdminShipmentsPage : gestion et suivi des livraisons (OrderShipment)
// Clean code, ultra commenté, design extravagant
"use client";
import React, { useEffect, useState } from "react";

interface ShippingMethod {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  user_id: number;
  status: string;
}

interface Shipment {
  id: number;
  order_id: number;
  shipping_method_id: number;
  tracking_number?: string;
  status: string;
  shipped_at?: string;
  delivered_at?: string;
  shipping_method: ShippingMethod;
  order: Order;
}

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/shipments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des livraisons");
        const data = await res.json();
        setShipments(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchShipments();
  }, []);

  // Couleurs de statut
  const statusColors: Record<string, string> = {
    pending: "text-yellow-500",
    shipped: "text-blue-500",
    delivered: "text-green-600",
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-yellow-400 to-pink-600">Gestion des livraisons</h2>
      {loading ? <div>Chargement...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-yellow-100">
              <th className="p-2">ID</th>
              <th className="p-2">Commande</th>
              <th className="p-2">Utilisateur</th>
              <th className="p-2">Méthode</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Tracking</th>
              <th className="p-2">Expédié</th>
              <th className="p-2">Livré</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map(s => (
              <tr key={s.id} className="border-b border-pink-100">
                <td className="p-2">{s.id}</td>
                <td className="p-2">#{s.order_id}</td>
                <td className="p-2">{s.order.user_id}</td>
                <td className="p-2">{s.shipping_method.name}</td>
                <td className={`p-2 font-bold capitalize ${statusColors[s.status] || 'text-gray-700'}`}>{s.status}</td>
                {/* Edition inline du numéro de suivi (tracking_number) */}
                <td className="p-2">
                  <input
                    type="text"
                    value={s.tracking_number ?? ''}
                    onChange={e => {
                      const val = e.target.value;
                      setShipments(prev => prev.map(sh => sh.id === s.id ? { ...sh, tracking_number: val } : sh));
                    }}
                    onBlur={async e => {
                      const val = e.target.value;
                      // Appel API pour mettre à jour le tracking
                      try {
                        const token = localStorage.getItem("admin_token");
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/shipments/${s.id}/tracking`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                          },
                          body: JSON.stringify({ tracking_number: val })
                        });
                      } catch {}
                    }}
                    className="border rounded px-2 py-1 w-32 text-xs focus:ring-2 focus:ring-pink-400"
                    placeholder="Numéro de suivi"
                  />
                </td>
                {/* Edition inline du statut de livraison */}
                <td className="p-2">
                  <select
                    value={s.status}
                    onChange={async e => {
                      const val = e.target.value;
                      setShipments(prev => prev.map(sh => sh.id === s.id ? { ...sh, status: val } : sh));
                      // Appel API pour mettre à jour le statut
                      try {
                        const token = localStorage.getItem("admin_token");
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/shipments/${s.id}/status`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                          },
                          body: JSON.stringify({ status: val })
                        });
                      } catch {}
                    }}
                    className={`rounded px-2 py-1 w-28 text-xs font-bold capitalize ${statusColors[s.status] || 'text-gray-700'} focus:ring-2 focus:ring-yellow-400`}
                  >
                    <option value="pending">En attente</option>
                    <option value="shipped">Expédié</option>
                    <option value="delivered">Livré</option>
                  </select>
                </td>
                <td className="p-2 text-xs">{s.shipped_at ? new Date(s.shipped_at).toLocaleString() : '-'}</td>
                <td className="p-2 text-xs">{s.delivered_at ? new Date(s.delivered_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
