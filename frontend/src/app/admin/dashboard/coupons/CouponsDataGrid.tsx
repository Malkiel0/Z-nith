"use client";
// DataGrid dynamique pour la gestion des coupons admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COUPONS, CREATE_COUPON, UPDATE_COUPON, REMOVE_COUPON } from "@/graphql/coupons";
import CouponFormModal from "./CouponFormModal";

// Mock data coupons (à remplacer par API GraphQL)
const mockCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "Pourcentage",
    value: 10,
    usage: 34,
    max_usage: 100,
    valid_until: "2025-06-30",
    is_active: true,
  },
  {
    id: 2,
    code: "ZENITH20",
    type: "Montant",
    value: 20,
    usage: 5,
    max_usage: 20,
    valid_until: "2025-04-30",
    is_active: false,
  },
  {
    id: 3,
    code: "FREESHIP",
    type: "Livraison",
    value: 0,
    usage: 12,
    max_usage: 50,
    valid_until: "2025-12-31",
    is_active: true,
  },
];

// Interface TypeScript pour un coupon (selon le schéma GraphQL)
interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: string;
  expiration_date: string;
  is_active: boolean;
  [key: string]: any;
}

export default function CouponsDataGrid() {
  // Hook pour les toasts dynamiques
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  // État d’ouverture/fermeture de la modale d’ajout/édition
  const [openModal, setOpenModal] = useState(false);
  // Coupon sélectionné pour édition
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  // Récupération des coupons via Apollo GraphQL
  const { data, loading, error } = useQuery(GET_COUPONS);
  const coupons = data?.coupons || [];

  // Filtrage simple par code coupon
  const filtered = coupons.filter((coupon: Coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion de l’ajout d’un coupon (mutation GraphQL)
  const [createCoupon] = useMutation(CREATE_COUPON);
  const handleAddCoupon = async (data: any) => {
    await createCoupon({ variables: data });
  };

  // Gestion de la suppression d’un coupon
  const [removeCoupon] = useMutation(REMOVE_COUPON);
  const handleDeleteCoupon = async (id: number) => {
    try {
      await removeCoupon({ variables: { id }, refetchQueries: [{ query: GET_COUPONS }] });
      showToast("Coupon supprimé avec succès !", "success");
    } catch (err) {
      showToast("Erreur lors de la suppression du coupon.", "error");
    }
  };

  // Gestion de l’édition d’un coupon (mutation GraphQL)
  const [updateCoupon] = useMutation(UPDATE_COUPON);
  const handleEditCoupon = async (data: any) => {
    await updateCoupon({ variables: data });
  };


  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 animate-fadein">
      {/* Gestion loading/erreur UX pro */}
      {loading && (
        <div className="text-center text-pink-500 font-bold animate-pulse py-8">Chargement des coupons…</div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold py-8">Erreur lors du chargement des coupons.</div>
      )}
      {/* Bouton d’ajout de coupon */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#0f3460]">Liste des coupons</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-400 transition w-full md:w-72"
          />
          <button
            className="px-4 py-2 rounded-xl bg-yellow-400 text-white font-bold hover:bg-yellow-600 transition whitespace-nowrap"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            + Ajouter un coupon
          </button>
        </div>
      </div>
      {/* Modale d’ajout/édition de coupon */}
      <CouponFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditCoupon(null);
        }}
        initialData={editCoupon ? {
          code: editCoupon.code,
          discount: editCoupon.discount,
          type: editCoupon.type as "fixed" | "percentage",
          expires_at: editCoupon.expiration_date,
          is_active: editCoupon.is_active,
        } : undefined}
        onSave={editCoupon ? handleEditCoupon : handleAddCoupon}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-green-400 via-pink-500 to-yellow-400 text-white">
              <th className="py-3 px-4 text-left rounded-tl-xl">Code</th>
              <th className="py-3 px-4 text-center">Type</th>
              <th className="py-3 px-4 text-center">Valeur</th>
              <th className="py-3 px-4 text-center">Utilisations</th>
              <th className="py-3 px-4 text-center">Expiration</th>
              <th className="py-3 px-4 text-center">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#0f3460]/60">
                  Aucun coupon trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((coupon: Coupon) => (
                <tr key={coupon.id} className="border-b border-gray-200 hover:bg-green-50 transition">
                  <td className="py-3 px-4 font-semibold">{coupon.code}</td>
                  <td className="py-3 px-4 text-center">{coupon.type}</td>
                  <td className="py-3 px-4 text-center">{coupon.discount}</td>
                  <td className="py-3 px-4 text-center">{new Date(coupon.expiration_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {/* Bouton d’édition */}
                    <button
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition"
                      onClick={() => {
                        // Ouvre la modale pré-remplie pour édition
                        setEditCoupon(coupon);
                        setOpenModal(true);
                      }}
                    >
                      Éditer
                    </button>
                    {/* Bouton de suppression */}
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white font-bold transition"
                      onClick={async () => {
                        if (window.confirm("Confirmer la suppression de ce coupon ?")) {
                          await removeCoupon({ variables: { id: coupon.id }, refetchQueries: [{ query: GET_COUPONS }] });
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
