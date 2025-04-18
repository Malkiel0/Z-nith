// Page Historique des notifications admin Zénith
// Design extravagant, dynamique, clean code, ultra commenté
"use client";
import React, { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 animate-slidein mt-8">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 tracking-widest drop-shadow-lg mb-4 animate-pulse text-center">
        Notifications Admin
      </h1>
      {loading ? (
        <div className="text-xl text-gray-500 animate-pulse">Chargement...</div>
      ) : error ? (
        <div className="text-xl text-red-500 font-bold animate-bounce">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-xl text-gray-400 font-bold animate-fadein">Aucune notification reçue.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map(n => (
            <li
              key={n.id}
              className={`rounded-xl p-6 shadow-lg border-l-8 ${n.type === 'order' ? 'border-pink-400' : n.type === 'incident' ? 'border-red-500' : 'border-yellow-400'} bg-gradient-to-r from-white via-yellow-50 to-pink-50 animate-fadein`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-[#0f3460]">{n.title}</span>
                <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 mb-2">{n.message}</div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${n.type === 'order' ? 'bg-pink-100 text-pink-600' : n.type === 'incident' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {n.type}
              </span>
              {!n.read && <span className="ml-3 px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-bold animate-pulse">Non lu</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
