"use client";
// Page de gestion des retours admin Zénith
import React from "react";

import ReturnsDataGrid from "./ReturnsDataGrid";

export default function AdminReturnsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des retours</h1>
      {/* Tableau dynamique des retours */}
      <ReturnsDataGrid />
    </div>
  );
}
