"use client";
// Page de gestion des coupons admin Zénith
import React from "react";

import CouponsDataGrid from "./CouponsDataGrid";

export default function AdminCouponsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des coupons</h1>
      {/* Tableau dynamique des coupons */}
      <CouponsDataGrid />
    </div>
  );
}
