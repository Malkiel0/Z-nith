// Page de gestion des commandes admin Zénith
// Clean code, ultra commenté, design pro
import React from "react";
import OrdersDataGrid from "./OrdersDataGrid";

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des commandes</h1>
      {/* Tableau dynamique des commandes */}
      <OrdersDataGrid />
    </div>
  );
}
