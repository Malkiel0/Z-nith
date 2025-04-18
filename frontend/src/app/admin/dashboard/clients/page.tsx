"use client";
// Page de gestion des clients admin Zénith
import React from "react";

import ClientsDataGrid from "./ClientsDataGrid";

export default function AdminClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des clients</h1>
      {/* Tableau dynamique des clients */}
      <ClientsDataGrid />
    </div>
  );
}
