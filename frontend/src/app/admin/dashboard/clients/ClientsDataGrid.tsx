"use client";
// DataGrid dynamique pour la gestion des clients admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS, CREATE_CLIENT, UPDATE_CLIENT, REMOVE_CLIENT } from "@/graphql/clients";
import ClientFormModal from "./ClientFormModal";

// Mock data clients (à remplacer par API GraphQL)
const mockClients = [
  {
    id: 1,
    name: "Alice Dupont",
    email: "alice@zenith.com",
    phone: "0601020304",
    orders: 8,
    status: "active",
    created_at: "2024-11-05",
  },
  {
    id: 2,
    name: "Bob Martin",
    email: "bob@zenith.com",
    phone: "0611223344",
    orders: 2,
    status: "inactive",
    created_at: "2024-12-15",
  },
  {
    id: 3,
    name: "Chloé Leroy",
    email: "chloe@zenith.com",
    phone: "0622334455",
    orders: 15,
    status: "banned",
    created_at: "2025-01-20",
  },
];

export default function ClientsDataGrid() {
  const [search, setSearch] = useState("");
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);
  // État du client en cours d’édition
  const [editClient, setEditClient] = useState(null);

  // Récupération des clients via Apollo GraphQL
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const clients = data?.users || [];

  // Filtrage simple par nom ou email
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Mutation pour ajouter un client
  const [createClient] = useMutation(CREATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  // Mutation pour éditer un client
  const [updateClient] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  // Mutation pour supprimer un client
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  // Gestion de l’ajout d’un client
  const handleAddClient = (data: any) => {
    createClient({ variables: { data } });
    setOpenModal(false);
  };

  // Gestion de l’édition d’un client
  const handleEditClient = (data: any) => {
    updateClient({ variables: { id: editClient.id, data } });
    setEditClient(null);
    setOpenModal(false);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des clients…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des clients.</div>
      )}
      {/* Bouton d’ajout de client */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des clients</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter un client
          </button>
        </div>
      </div>
      {/* Modale d’ajout/édition de client */}
      <ClientFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditClient(null);
        }}
        initialData={editClient || undefined}
        onSave={editClient ? handleEditClient : handleAddClient}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Nom</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Téléphone</th>
              <th className="py-3 px-4 text-center">Commandes</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center">Inscription</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun client trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr key={client.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                  <td className="py-3 px-4 font-semibold">{client.name}</td>
                  <td className="py-3 px-4">{client.email}</td>
                  <td className="py-3 px-4">{client.phone}</td>
                  <td className="py-3 px-4 text-center">{client.orders}</td>
                  <td className="py-3 px-4 text-center">
                    {client.status === "active" && <span className="inline-block px-3 py-1 bg-green-400/80 text-white rounded-full text-xs font-bold">Actif</span>}
                    {client.status === "inactive" && <span className="inline-block px-3 py-1 bg-yellow-400/80 text-white rounded-full text-xs font-bold">Inactif</span>}
                    {client.status === "banned" && <span className="inline-block px-3 py-1 bg-red-400/80 text-white rounded-full text-xs font-bold">Banni</span>}
                  </td>
                  <td className="py-3 px-4 text-center">{client.created_at}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditClient(client);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de ce client ?")) {
                          await removeClient({ variables: { id: client.id }, refetchQueries: [{ query: GET_CLIENTS }] });
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
