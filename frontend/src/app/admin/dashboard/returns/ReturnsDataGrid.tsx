"use client";
// DataGrid dynamique pour la gestion des retours admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RETURNS, CREATE_RETURN, UPDATE_RETURN, REMOVE_RETURN } from "@/graphql/returns";
import ReturnFormModal from "./ReturnFormModal";

// Mock data retours (à remplacer par API GraphQL)
const mockReturns = [
  {
    id: 1,
    order_id: 101,
    client: "Alice Dupont",
    date: "2025-04-17",
    reason: "Produit défectueux",
    status: "pending",
    amount: 49.99,
  },
  {
    id: 2,
    order_id: 102,
    client: "Bob Martin",
    date: "2025-04-18",
    reason: "Erreur de taille",
    status: "approved",
    amount: 29.99,
  },
  {
    id: 3,
    order_id: 103,
    client: "Chloé Leroy",
    date: "2025-04-18",
    reason: "Changement d’avis",
    status: "refused",
    amount: 89.99,
  },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-400/80" },
  approved: { label: "Approuvé", color: "bg-green-400/80" },
  refused: { label: "Refusé", color: "bg-red-400/80" },
  refunded: { label: "Remboursé", color: "bg-blue-400/80" },
};

// Interface TypeScript pour un retour (selon le schéma GraphQL)
interface Return {
  id: number;
  order_id: number;
  user_id: number;
  status: string;
  reason: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export default function ReturnsDataGrid() {
  // Hook pour les toasts dynamiques
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  // Les retours sont désormais récupérés via GraphQL
  // const [returns, setReturns] = useState(mockReturns);
  // État d’ouverture de la modale d’ajout
  const [openModal, setOpenModal] = useState(false);
  const [editReturn, setEditReturn] = useState(null);

  // Récupération des retours via Apollo GraphQL
  const { data, loading, error } = useQuery(GET_RETURNS);
  const returns = data?.returns || [];

  // Filtrage simple par numéro de commande
  const filtered = returns.filter((r: Return) =>
    r.order_id.toString().includes(search)
  );

  // Gestion de l’ajout d’un retour (mock, à remplacer par mutation GraphQL)
  const [createReturn] = useMutation(CREATE_RETURN);
  const [updateReturn] = useMutation(UPDATE_RETURN);
  const [removeReturn] = useMutation(REMOVE_RETURN);

  const handleAddReturn = async (data: any) => {
    await createReturn({
      variables: {
        data: {
          order_id: data.order_id,
          user_id: data.user_id,
          status: data.status,
          reason: data.reason,
        },
      },
      refetchQueries: [{ query: GET_RETURNS }],
    });
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des retours…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des retours.</div>
      )}
      {/* Bouton d’ajout de retour */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des retours</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher par ID commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-blue-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter un retour
          </button>
        </div>
      </div>
      {/* Modale d’ajout/édition de retour */}
      <ReturnFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditReturn(null);
        }}
        initialData={editReturn || undefined}
        onSave={async (data: any) => {
          if (editReturn) {
            // Édition via mutation GraphQL
            await updateReturn({
              variables: {
                id: editReturn.id,
                data: {
                  order_id: data.order_id,
                  user_id: data.user_id,
                  status: data.status,
                  reason: data.reason,
                },
              },
              refetchQueries: [{ query: GET_RETURNS }],
            });
            setEditReturn(null);
          } else {
            // Ajout via mutation GraphQL
            await handleAddReturn(data);
          }
          setOpenModal(false);
        }}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Commande</th>
              <th className="py-3 px-4 text-left">Client</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Motif</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-right">Montant (€)</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun retour trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((r: Return) => (
                <tr key={r.id} className="border-b border-gray-200 hover:bg-pink-50 transition">
                  <td className="py-3 px-4 font-semibold">#{r.order_id}</td>
                  <td className="py-3 px-4">{r.client}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4">{r.reason}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-white rounded-full text-xs font-bold ${statusMap[r.status]?.color || "bg-gray-400"}`}>
                      {statusMap[r.status]?.label || r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{r.amount.toFixed(2)}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditReturn(r);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de ce retour ?")) {
                          await removeReturn({ variables: { id: r.id }, refetchQueries: [{ query: GET_RETURNS }] });
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
