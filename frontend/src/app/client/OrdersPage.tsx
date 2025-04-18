// Page "Mes commandes" pour le client Zénith (historique des commandes)
// Clean code, design extravagant, animations, ultra commenté
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Typage d'une commande (adapter selon l'API backend)
type Order = {
  id: number;
  created_at: string;
  status: string;
  total_amount: number;
  items: Array<{
    product: { name: string };
    quantity: number;
    unit_price: number;
  }>;
};

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        // Récupérer le token JWT NextAuth (stocké dans la session)
        const token = (session as any)?.token || (session as any)?.accessToken;
        if (!token) throw new Error("Token de session manquant");
        // Appel sécurisé à l’API backend avec le JWT
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/order/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    }
    if (session) fetchOrders();
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] flex flex-col items-center py-16 animate-fadein">
      <div className="p-8 rounded-3xl shadow-2xl bg-white/95 flex flex-col gap-8 max-w-3xl w-full animate-slidein">
        <h1 className="text-3xl font-extrabold text-[#ffb347] text-center tracking-wide animate-pulse mb-2">Mes commandes</h1>
        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500 animate-pulse">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">Aucune commande trouvée.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 animate-fadein">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#0f3460]">Commande #{order.id}</span>
                  <span className={`px-3 py-1 rounded-xl text-sm font-bold ${order.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{order.status}</span>
                </div>
                <div className="text-gray-600 text-sm mb-2">Passée le {new Date(order.created_at).toLocaleString()}</div>
                <ul className="text-base mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{(item.unit_price * item.quantity).toFixed(2)} €</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end font-bold text-lg text-[#ffb347]">Total : {order.total_amount.toFixed(2)} €</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
