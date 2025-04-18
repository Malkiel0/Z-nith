"use client";
// Page de gestion des produits admin Zénith
import React from "react";

import ProductsDataGrid from "./ProductsDataGrid";

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-[#0f3460] animate-pulse">Gestion des produits</h1>
      {/* Tableau dynamique des produits */}
      <ProductsDataGrid />
    </div>
  );
}
