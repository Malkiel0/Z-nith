"use client";

// Page d'authentification Zénith (connexion/inscription)
// Design unique, animations, redirection selon le rôle (admin/client)
// Page d'authentification Zénith (connexion/inscription, OAuth, redirection dynamique selon le rôle)
// Clean code, design extravagant, animations, ultra commenté
import React from "react";
import AuthForm from "./AuthForm";
import { signIn } from "next-auth/react";
import RoleRedirector from "./redirector";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] animate-fadein">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col gap-8 animate-slidein">
        <h2 className="text-3xl font-extrabold text-center text-[#0f3460] tracking-wide">Connexion à Zénith</h2>
        {/* Formulaire connecté à NextAuth.js */}
        <AuthForm />
        <div className="flex justify-between text-sm text-[#0f3460]/80">
          <a href="#" className="hover:underline">Créer un compte</a>
          <a href="#" className="hover:underline">Mot de passe oublié ?</a>
        </div>
        {/* Boutons OAuth NextAuth.js (Google, Github) */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="flex items-center justify-center gap-2 bg-[#22223b] text-white rounded-xl py-2 font-semibold hover:bg-[#4a4e69] transition-colors"
            onClick={() => signIn("google")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1H12.18v2.8h5.34c-.22 1.3-1.5 3.8-5.34 3.8-3.23 0-5.87-2.67-5.87-5.9s2.64-5.9 5.87-5.9c1.84 0 3.07.78 3.77 1.44l2.58-2.5C17.12 3.97 14.87 3 12.18 3 6.7 3 2.18 7.48 2.18 12.98c0 5.5 4.52 9.98 10 9.98 5.48 0 9.82-4.48 9.82-9.98 0-.67-.07-1.32-.18-1.88z" /></svg>
            Connexion avec Google
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-[#0f3460] text-white rounded-xl py-2 font-semibold hover:bg-[#16213e] transition-colors"
            onClick={() => signIn("github")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96 5.5 0 9.96-4.46 9.96-9.96 0-5.5-4.46-9.96-9.96-9.96zm0 18.12c-4.5 0-8.16-3.66-8.16-8.16 0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.16-8.16 8.16z" /></svg>
            Connexion avec Github
          </button>
        </div>
      </div>
    </div>
  );
}
