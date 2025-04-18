"use client";
// Page de gestion des notifications admin Zénith
import React from "react";

import NotificationsDataGrid from "./NotificationsDataGrid";

export default function AdminNotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des notifications</h1>
      {/* Tableau dynamique des notifications */}
      <NotificationsDataGrid />
    </div>
  );
}
