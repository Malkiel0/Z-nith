"use client";
// DataGrid dynamique pour la gestion des notifications admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTIFICATIONS, CREATE_NOTIFICATION, UPDATE_NOTIFICATION, REMOVE_NOTIFICATION } from "@/graphql/notifications";
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

// Interface TypeScript pour une notification (selon le schéma GraphQL)
interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  user_id: number;
  created_at: string;
  [key: string]: any;
}

export default function NotificationsDataGrid() {
  // Hook pour les toasts dynamiques
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);
  // État de la notification en cours d’édition
  // Typage explicite pour éviter les erreurs de type
interface Notification {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
  is_read: boolean;
}
const [editNotification, setEditNotification] = useState<Notification | null>(null);

  // Récupération des notifications via Apollo GraphQL
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS);
  const notifications = data?.notifications || [];

  // Filtrage simple par titre ou message
  const filtered = notifications.filter((n: { title: string, type: string }) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.type.toLowerCase().includes(search.toLowerCase())
  );

  // Mutations pour l’ajout, l’édition et la suppression de notifications
  const [createNotification] = useMutation(CREATE_NOTIFICATION);
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
  const [removeNotification] = useMutation(REMOVE_NOTIFICATION);

  // Gestion de l’ajout d’une notification
  const handleAddNotification = async (data: any) => {
    await createNotification({
      variables: {
        data: {
          title: data.title,
          message: data.message,
          type: data.type,
          is_read: data.is_read,
          user_id: data.user_id,
        },
      },
      refetchQueries: [{ query: GET_NOTIFICATIONS }],
    });
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des notifications…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des notifications.</div>
      )}
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
      {/* Modale d’ajout/édition de notification */}
      <NotificationFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditNotification(null);
        }}
        initialData={editNotification || undefined}
        onSave={async (data: any) => {
          if (editNotification) {
            // Édition via mutation GraphQL
            await updateNotification({
              variables: {
                id: editNotification.id,
                data: {
                  title: data.title,
                  message: data.message,
                  type: data.type,
                  is_read: data.is_read,
                  user_id: data.user_id,
                },
              },
              refetchQueries: [{ query: GET_NOTIFICATIONS }],
            });
            setEditNotification(null);
          } else {
            // Ajout via mutation GraphQL
            await createNotification({
              variables: {
                data: {
                  title: data.title,
                  message: data.message,
                  type: data.type,
                  is_read: data.is_read,
                  user_id: data.user_id,
                },
              },
              refetchQueries: [{ query: GET_NOTIFICATIONS }],
            });
          }
          setOpenModal(false);
        }}
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
              filtered.map((notification: { id: number; title: string; type: string; date: string; status: string; is_read: boolean }) => (
                <tr key={notification.id} className={`border-b border-gray-200 ${!notification.is_read ? "bg-yellow-50" : ""} hover:bg-blue-50 transition`}>
                  <td className="py-3 px-4 font-semibold">{notification.title}</td>
                  <td className="py-3 px-4 text-center">{notification.type}</td>
                  <td className="py-3 px-4 text-center">{notification.date}</td>
                  <td className="py-3 px-4 text-center">
                    {notification.status === "unread" ? (
                      <span className="inline-block px-3 py-1 bg-pink-400/80 text-white rounded-full text-xs font-bold">Non lue</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Lue</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditNotification(notification);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de cette notification ?")) {
                          await removeNotification({ variables: { id: notification.id }, refetchQueries: [{ query: GET_NOTIFICATIONS }] });
                        }
                      }}
                    >
                      Supprimer
                    </button>
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
