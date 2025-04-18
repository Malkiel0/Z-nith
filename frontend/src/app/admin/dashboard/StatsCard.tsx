// Composant StatsCard - carte statistique animée pour dashboard admin Zénith
// Clean code, ultra commenté, design extravagant
"use client";
import React from "react";

export interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string; // ex: 'from-pink-400 to-yellow-400'
}

export default function StatsCard({ label, value, icon, color = 'from-pink-400 to-yellow-400' }: StatsCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${color} rounded-2xl shadow-xl p-6 min-w-[180px] min-h-[120px] animate-fadein hover:scale-105 transition-transform`}> 
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-4xl font-extrabold text-white drop-shadow-lg">{value}</div>
      <div className="text-sm font-bold text-white/80 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}
