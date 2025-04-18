"use client";
// DataGrid dynamique pour la gestion des notifications admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import NotificationFormModal from "./NotificationFormModal";

// Mock data notifications (à remplacer par API GraphQL)
const mockNotifications = [
  {
    id: 1,
    title: "Nouvelle commande reçue",
    type: "Commande",
    date: "2025-04-18 14:02",
    status: "unread",
  },
  {
    id: 2,
    title: "Stock faible sur Sweat Zénith",
    type: "Stock",
    date: "2025-04-18 13:45",
    status: "unread",
  },
  {
    id: 3,
    title: "Retour approuvé pour Bob Martin",
    type: "Retour",
    date: "2025-04-18 12:15",
    status: "read",
  },
];

export default function NotificationsDataGrid() {
  const [search, setSearch] = useState("");
  // Mock state pour la liste des notifications (à remplacer par API)
  const [notifications, setNotifications] = useState(mockNotifications);
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);

  // Filtrage simple par titre ou message
  const filtered = notifications.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.type.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l’ajout d’une notification (mock, à remplacer par mutation GraphQL)
  const handleAddNotification = (data: any) => {
    setNotifications((prev) => [
      { ...data, id: prev.length + 1, created_at: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Bouton d’ajout de notification */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des notifications</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-700 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter une notification
          </button>
        </div>
      </div>
      {/* Modale d’ajout de notification */}
      <NotificationFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddNotification}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 via-yellow-400 to-pink-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Titre</th>
              <th className="py-3 px-4 text-center">Type</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[#0f3460]/60">
                  Aucune notification trouvée.
                </td>
              </tr>
            ) : (
              filtered.map((n) => (
                <tr key={n.id} className={`border-b border-gray-200 ${n.status === "unread" ? "bg-yellow-50" : ""} hover:bg-blue-50 transition`}>
                  <td className="py-3 px-4 font-semibold">{n.title}</td>
                  <td className="py-3 px-4 text-center">{n.type}</td>
                  <td className="py-3 px-4 text-center">{n.date}</td>
                  <td className="py-3 px-4 text-center">
                    {n.status === "unread" ? (
                      <span className="inline-block px-3 py-1 bg-pink-400/80 text-white rounded-full text-xs font-bold">Non lue</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Lue</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition">Voir</button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition">Marquer comme lue</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination, filtres avancés, actions groupées à venir */}
    </div>
  );
}
