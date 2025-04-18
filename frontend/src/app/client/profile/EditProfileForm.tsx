// Formulaire d’édition du profil client Zénith
// Permet au client de modifier son nom et son email (mot de passe/avatare à venir)
// Clean code, ultra commenté, validation basique
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function EditProfileForm() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  // Ajout du champ téléphone (phone)
  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Soumission du formulaire d’édition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      // Récupérer le token JWT NextAuth depuis la session
      const token = (session as any)?.token || (session as any)?.accessToken;
      if (!token) throw new Error("Token de session manquant");
      // Appel à l’API backend pour mettre à jour le profil avec authentification JWT
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour du profil");
      setSuccess("Profil mis à jour avec succès !");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg mx-auto bg-white/80 p-8 rounded-2xl shadow-xl animate-slidein">
      <h3 className="text-2xl font-bold text-[#16213e] mb-2">Modifier mon profil</h3>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-[#0f3460]">Nom</span>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="rounded-lg px-4 py-2 border border-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#ffb347]" required />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold text-[#0f3460]">Email</span>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-lg px-4 py-2 border border-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#ffb347]" required />
      </label>
      {/* Champ téléphone (phone) */}
      <label className="block mb-4">
        <span className="block text-gray-700 font-semibold mb-1">Téléphone</span>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Numéro de téléphone"
        />
      </label>
      {/* Possibilité d’ajouter l’édition du mot de passe, avatar, etc. */}
      <button type="submit" disabled={loading} className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:scale-105 transition-transform">
        {loading ? "Mise à jour..." : "Enregistrer"}
      </button>
      {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
      {error && <div className="text-red-500 font-semibold text-center mt-2">{error}</div>}
    </form>
  );
}
