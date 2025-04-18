"use client";

// Formulaire d'authentification connecté à NextAuth.js
// Clean code, commentaires détaillés, UX moderne et feedback visuel
import React, { useState } from "react";
import { signIn, useSession, getSession } from "next-auth/react"; // Ajout de getSession pour session fraîche
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const { data: session } = useSession();
  const router = useRouter();
  // États pour les champs du formulaire
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Soumission du formulaire (connexion ou inscription)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (mode === 'login') {
      // Connexion via NextAuth
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setLoading(false);
        setError("Email ou mot de passe incorrect.");
      } else {
        // Après connexion, on force le rafraîchissement pour que NextAuth recharge la session
        try {
          setLoading(true);
          await router.refresh();
          // On récupère la session fraîche directement après connexion
          const currentSession = await getSession();
          // Debug complet
          if (!currentSession) {
            console.error('[Auth] Session NextAuth est null ou undefined après getSession:', currentSession);
          } else {
            console.log('[Auth] Session NextAuth reçue :', currentSession);
          }
          // On tente tous les champs possibles
          const jwt = currentSession?.accessToken || currentSession?.token || currentSession?.user?.token || currentSession?.user?.accessToken;
          if (!jwt) {
            setError("Session/JWT non récupéré. Veuillez réessayer.");
            setLoading(false);
            console.error("[Auth] Token NextAuth introuvable", currentSession);
            return;
          }
          // Appel à l’API backend pour récupérer le rôle
          const meRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          });
          if (meRes.ok) {
            const user = await meRes.json();
            if (user.role === "admin") {
              router.replace("/admin");
            } else {
              router.replace("/client");
            }
          } else {
            setError("Impossible de récupérer le rôle utilisateur. Veuillez réessayer.");
            console.error("Erreur /auth/me:", await meRes.text());
          }
          setLoading(false);
        } catch (e) {
          setError("Erreur lors de la récupération de la session ou du rôle utilisateur.");
          console.error(e);
          setLoading(false);
        }
      }
    } else {
      // Inscription via API backend Nest.js
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone }),
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.message || "Erreur lors de l'inscription.");
        } else {
          setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
          setMode('login');
          setName("");
          setEmail("");
          setPassword("");
          setPhone("");
        }
      } catch (e) {
        setError("Erreur réseau ou serveur. Veuillez réessayer.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="flex justify-center gap-4 mb-2">
        <button
          type="button"
          className={`px-4 py-2 rounded-t-xl font-bold transition-all ${mode === 'login' ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white scale-105' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
        >Connexion</button>
        <button
          type="button"
          className={`px-4 py-2 rounded-t-xl font-bold transition-all ${mode === 'register' ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white scale-105' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
        >Inscription</button>
      </div>
      <form className="flex flex-col gap-6 bg-white rounded-b-2xl rounded-t-xl shadow-xl p-8" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Nom complet"
            className="input input-bordered input-primary w-full rounded-xl px-4 py-3 text-lg"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary w-full rounded-xl px-4 py-3 text-lg"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input input-bordered input-primary w-full rounded-xl px-4 py-3 text-lg"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {mode === 'register' && (
          <input
            type="tel"
            placeholder="Téléphone (optionnel)"
            className="input input-bordered input-primary w-full rounded-xl px-4 py-3 text-lg"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        )}
        {error && <div className="text-red-500 text-center animate-pulse">{error}</div>}
        {success && <div className="text-green-600 text-center animate-bounce">{success}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (mode === 'login' ? "Connexion..." : "Inscription...") : (mode === 'login' ? "Se connecter" : "S'inscrire")}
        </button>
      </form>
    </div>
  );
}

