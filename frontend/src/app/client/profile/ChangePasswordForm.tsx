// Formulaire de changement de mot de passe pour le client Zénith
// Sécurité maximale, clean code, ultra commenté
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChangePasswordForm() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation simple côté client
  const validate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const token = (session as any)?.token || (session as any)?.accessToken;
      if (!token) throw new Error("Token de session manquant");
      // Appel à l’API backend pour changer le mot de passe
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors du changement de mot de passe");
      }
      setSuccess("Mot de passe modifié avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg mx-auto bg-white/80 p-8 rounded-2xl shadow-xl animate-slidein mt-8">
      <h3 className="text-2xl font-bold text-[#16213e] mb-2">Changer mon mot de passe</h3>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-[#0f3460]">Mot de passe actuel</span>
        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="rounded-lg px-4 py-2 border border-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#ffb347]" required />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-[#0f3460]">Nouveau mot de passe</span>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="rounded-lg px-4 py-2 border border-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#ffb347]" required />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-[#0f3460]">Confirmer le nouveau mot de passe</span>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="rounded-lg px-4 py-2 border border-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#ffb347]" required />
      </label>
      <button type="submit" disabled={loading} className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:scale-105 transition-transform">
        {loading ? "Changement..." : "Enregistrer"}
      </button>
      {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
      {error && <div className="text-red-500 font-semibold text-center mt-2">{error}</div>}
    </form>
  );
}
