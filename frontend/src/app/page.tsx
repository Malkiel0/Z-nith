"use client";

// Page d'accueil Zénith : transition animée puis redirection vers l'authentification
// Clean code, commentaires détaillés, expérience utilisateur fluide et unique
// Ce composant est marqué comme client pour permettre l'utilisation de hooks React et du routing dynamique.
import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import dynamique du composant de transition pour éviter le SSR (Server Side Rendering)
const TransitionScreen = dynamic(() => import("./transition"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [showTransition, setShowTransition] = React.useState(true);

  React.useEffect(() => {
    if (!showTransition) {
      // Redirection vers la page d'authentification après la transition
      router.replace("/auth");
    }
  }, [showTransition, router]);

  return (
    <>
      {showTransition && <TransitionScreen onFinish={() => setShowTransition(false)} />}
    </>
  );
}
