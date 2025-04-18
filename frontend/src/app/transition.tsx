// Composant de transition d'entrée pour Zénith
// Affiche une animation de chargement élégante avant l'affichage de la page d'auth
import React from "react";

export default function TransitionScreen({ onFinish }: { onFinish: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // 2s de transition
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] animate-fadein">
      <div className="relative flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 animate-spin-slow shadow-2xl flex items-center justify-center">
          <span className="text-5xl font-extrabold text-white drop-shadow-lg tracking-widest animate-pulse">Z</span>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold text-white tracking-wide animate-fadein">Bienvenue sur Zénith</h1>
        <p className="mt-2 text-lg text-white/80 animate-fadein delay-500">La boutique qui touche les étoiles</p>
      </div>
    </div>
  );
}
