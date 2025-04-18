// Page Mes Commandes (client)
// Affiche l’historique des commandes du client connecté
// Design extravagant, clean code, ultra commenté
"use client";
import React from "react";
import OrdersPage from "../OrdersPage";
import ClientMenu from "../ClientMenu";

export default function OrdersRoutePage() {
  return (
    <>
      {/* Menu sticky toujours visible */}
      <ClientMenu />
      {/* Padding top pour ne pas masquer le contenu */}
      <div className="pt-28 pb-8 min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] flex flex-col items-center animate-fadein">
        <OrdersPage />
      </div>
    </>
  );
}
