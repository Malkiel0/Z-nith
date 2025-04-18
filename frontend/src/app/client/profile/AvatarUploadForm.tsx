// Formulaire d’upload d’avatar pour le client Zénith
// Clean code, ultra commenté, expérience fluide
"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function AvatarUploadForm() {
  const { data: session } = useSession();
  // Compatibilité NextAuth: user.avatar (custom) ou user.image (NextAuth OAuth)
  const [avatarUrl, setAvatarUrl] = useState(
    (session?.user as any)?.avatar || (session?.user as any)?.image || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Seuls les fichiers image sont acceptés.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Taille maximale : 2Mo.");
      return;
    }
    setLoading(true);
    try {
      const token = (session as any)?.token || (session as any)?.accessToken;
      if (!token) throw new Error("Token de session manquant");
      const formData = new FormData();
      formData.append("avatar", file);
      // Appel à l’API backend pour upload l’avatar
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/avatar", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de l’upload de l’avatar");
      }
      const data = await res.json();
      setAvatarUrl(data.avatarUrl);
      setSuccess("Avatar mis à jour !");
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto bg-white/80 p-8 rounded-2xl shadow-xl animate-slidein mt-8 items-center">
      <h3 className="text-2xl font-bold text-[#16213e] mb-2">Mon avatar</h3>
      <div className="flex flex-col items-center gap-4">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-[#ffb347] shadow-xl" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-[#ffb347]/20 flex items-center justify-center text-4xl text-[#ffb347] font-bold">?</div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:scale-105 transition-transform"
          disabled={loading}
        >
          {loading ? "Upload..." : "Changer d’avatar"}
        </button>
      </div>
      {success && <div className="text-green-600 font-semibold text-center mt-2">{success}</div>}
      {error && <div className="text-red-500 font-semibold text-center mt-2">{error}</div>}
    </div>
  );
}
