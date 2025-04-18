"use client";
// Panneau de configuration des paramètres admin Zénith
// Clean code, ultra commenté, design pro, prêt pour API GraphQL
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "@/graphql/settings";

// Suppression des paramètres mockés. Les paramètres sont désormais récupérés dynamiquement via API.

export default function SettingsPanel() {
  // State settings désormais initialisé dynamiquement depuis l’API
const { data, loading, error } = useQuery(GET_SETTINGS);
// Initialise le state settings dynamiquement après récupération des données
const [settings, setSettings] = useState(() => data?.settings || {});
  const [editMode, setEditMode] = useState(false);

  // Gestion du changement d’un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Simule la sauvegarde (à remplacer par mutation GraphQL)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    // TODO: mutation GraphQL pour sauvegarder
    alert("Paramètres sauvegardés ! (mock)");
  };

  return (
    <div className="bg-white/90 dark:bg-[#232526]/90 rounded-2xl shadow-2xl p-8 animate-fadein max-w-xl mx-auto dark:text-white">
      <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-center">
        Paramètres de la boutique
      </h2>
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div>
          <label className="font-semibold text-[#0f3460]">Nom de la boutique</label>
          <input
            type="text"
            name="shopName"
            value={settings.shopName}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="font-semibold text-[#0f3460]">Email de contact</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            disabled={!editMode}
          />
        </div>
        <div>
          <label className="font-semibold text-[#0f3460]">Monnaie</label>
          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            disabled={!editMode}
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dollar ($)</option>
            <option value="GBP">Livre (£)</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="maintenance"
            checked={settings.maintenance}
            onChange={handleChange}
            disabled={!editMode}
            className="w-5 h-5 accent-pink-500"
          />
          <label className="font-semibold text-[#0f3460]">Mode maintenance</label>
        </div>
        <div>
          <label className="font-semibold text-[#0f3460]">Thème</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full rounded-xl px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-pink-400 transition mt-1"
            disabled={!editMode}
          >
            <option value="clair">Clair</option>
            <option value="sombre">Sombre</option>
          </select>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          {editMode ? (
            <>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-gray-300 text-[#0f3460] font-bold hover:bg-gray-400 transition"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-700 transition"
              >
                Sauvegarder
              </button>
            </>
          ) : (
            <button
              type="button"
              className="px-6 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700 transition"
              onClick={() => setEditMode(true)}
            >
              Modifier
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
