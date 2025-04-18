// Menu latéral ou barre supérieure pour le dashboard client Zénith
// Affiche les liens dynamiques (Accueil, Mes commandes, Déconnexion, etc.)
// Clean code, design extravagant, ultra commenté
"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function ClientMenu() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 shadow-2xl animate-fadein">
      <div className="flex items-center gap-4">
        <Link href="/client" className="text-2xl font-extrabold text-white tracking-widest drop-shadow-lg hover:scale-110 transition-transform">Zénith</Link>
        <Link href="/client" className="text-white font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition">Accueil</Link>
        <Link href="/client/orders" className="text-white font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition">Mes commandes</Link>
        <Link href="/client/payments" className="text-white font-bold px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-yellow-200 hover:to-pink-200 hover:text-purple-700 transition shadow-md border-2 border-transparent hover:border-white/60 animate-fadein">Mes paiements</Link>
        <Link href="/client/profile" className="text-white font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition">Profil</Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Affichage de l’avatar utilisateur si présent */}
        {session?.user && (
          <>
            {((session.user as any).avatar || (session.user as any).image) ? (
              <img
                src={(session.user as any).avatar || (session.user as any).image}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 shadow-md mr-2"
              />
            ) : (
              <span className="inline-block w-10 h-10 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xl text-pink-400 font-bold shadow-md">👤</span>
            )}
            <span className="text-white/80 font-semibold mr-4">{session.user.name}</span>
          </>
        )}
        <button
          className="bg-white/20 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-white/40 transition"
          onClick={() => signOut({ callbackUrl: "/auth" })}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
