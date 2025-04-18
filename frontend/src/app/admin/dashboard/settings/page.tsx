"use client";
// Page de paramètres admin Zénith
import React from "react";

import SettingsPanel from "./SettingsPanel";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Paramètres de la boutique</h1>
      {/* Panneau de configuration des paramètres */}
      <SettingsPanel />
    </div>
  );
}
