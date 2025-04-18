// Page Profil Client Zénith
// Affiche les infos du client connecté, possibilité de modifier ses infos (à venir)
// Design extravagant, clean code, ultra commenté
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import AvatarUploadForm from "./AvatarUploadForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-white text-xl animate-pulse mt-20">Chargement du profil...</div>;
  }
  if (!session?.user) {
    return <div className="text-red-400 text-xl font-bold mt-20">Vous devez être connecté pour voir votre profil.</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 animate-slidein mt-8">
      <h2 className="text-3xl font-extrabold text-[#ffb347] text-center mb-2 animate-pulse">Mon Profil</h2>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-[#16213e] w-32">Nom :</span>
          <span className="text-lg text-[#0f3460]">{session.user.name}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-bold text-[#16213e] w-32">Email :</span>
          <span className="text-lg text-[#0f3460]">{session.user.email}</span>
        </div>
        {/* Possibilité d’ajouter la photo, le rôle, la date d’inscription, etc. */}
      </div>
      {/* Formulaire d’upload d’avatar */}
      <div className="w-full mt-8 animate-fadein">
        <AvatarUploadForm />
      </div>
      {/* Séparateur visuel */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-2/3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-[2px] shadow-lg animate-gradient-move"></div>
      </div>
      {/* Formulaire d’édition du profil */}
      <div className="w-full mt-8 animate-fadein delay-100">
        <EditProfileForm />
      </div>
      {/* Séparateur visuel */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-2/3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-[2px] shadow-lg animate-gradient-move"></div>
      </div>
      {/* Formulaire de changement de mot de passe */}
      <div className="w-full mt-8 animate-fadein delay-200">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
