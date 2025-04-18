"use client";
// Section KPIs pour le dashboard admin Zénith
import React from "react";

const kpis = [
  { label: "Chiffre d'affaires", value: "8 250€", icon: "💶", color: "from-green-400 to-green-700" },
  { label: "Commandes", value: "124", icon: "📦", color: "from-yellow-400 to-yellow-600" },
  { label: "Clients", value: "54", icon: "👤", color: "from-blue-400 to-blue-600" },
  { label: "Produits", value: "38", icon: "🛒", color: "from-pink-400 to-pink-600" },
  { label: "Stocks faibles", value: "5", icon: "⚠️", color: "from-red-400 to-red-600" },
];

export default function KPISection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl bg-gradient-to-br ${kpi.color} text-white animate-fadein`}
        >
          <span className="text-3xl mb-2">{kpi.icon}</span>
          <span className="text-2xl font-extrabold">{kpi.value}</span>
          <span className="text-sm font-semibold mt-1">{kpi.label}</span>
        </div>
      ))}
    </div>
  );
}
