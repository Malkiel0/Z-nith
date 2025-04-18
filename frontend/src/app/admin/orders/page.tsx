// Dashboard Admin - Gestion des commandes Zénith
// Clean code, design extravagant, ultra commenté, sécurisé
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OrdersFilters from "./OrdersFilters";
import OrderDetailModal from "./OrderDetailModal";

interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!session || (session.user as any)?.role !== "admin") {
      router.replace("/admin");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const token = (session as any)?.token || (session as any)?.accessToken;
        if (!token) throw new Error("Token de session manquant");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des commandes");
        const data = await res.json();
        setOrders(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] py-12 px-4 animate-fadein">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-10 animate-fadein">Gestion des commandes</h1>
      {loading ? (
        <div className="text-lg text-white animate-pulse">Chargement...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold animate-fadein">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-white font-semibold animate-fadein">Aucune commande trouvée.</div>
      ) : (
        <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
          {/* Filtres dynamiques */}
          <OrdersFilters
            status={statusFilter}
            onStatusChange={setStatusFilter}
            search={search}
            onSearchChange={setSearch}
          />
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#0f3460] border-b">
                <th className="py-2">ID</th>
                <th className="py-2">Client</th>
                <th className="py-2">Total</th>
                <th className="py-2">Statut</th>
                <th className="py-2">Créée le</th>
                <th className="py-2">Dernière maj</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((o) =>
                  (!statusFilter || o.status === statusFilter) &&
                  (!search ||
                    o.user_id.toString().includes(search) ||
                    o.id.toString().includes(search)
                  )
                )
                .map((o) => (
                  <tr
                    key={o.id}
                    className="border-b hover:bg-gradient-to-r hover:from-yellow-100 hover:to-pink-100 transition-all animate-fadein cursor-pointer"
                    onClick={() => setSelectedOrder(o)}
                    title="Voir le détail de la commande"
                  >
                    <td className="py-2 font-bold">{o.id}</td>
                    <td className="py-2 font-bold">{o.user_id}</td>
                    <td className="py-2">{o.total.toFixed(2)} €</td>
                    <td className={
                      "py-2 font-semibold " +
                      (o.status === "completed"
                        ? "text-green-600"
                        : o.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-600")
                    }>
                      {o.status}
                    </td>
                    <td className="py-2 text-xs">{new Date(o.created_at).toLocaleString()}</td>
                    <td className="py-2 text-xs">{new Date(o.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal de détail de la commande */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
