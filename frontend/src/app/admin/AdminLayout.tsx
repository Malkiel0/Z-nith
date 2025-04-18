"use client";
// Layout global admin Zénith : sidebar, header, notifications, responsive, animations
// Clean code, ultra commenté, design professionnel
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/dashboard/products", label: "Produits", icon: "🛒" },
  { href: "/admin/dashboard/categories", label: "Catégories", icon: "🏷️" },
  { href: "/admin/orders", label: "Commandes", icon: "📦" },
  { href: "/admin/dashboard/clients", label: "Clients", icon: "👤" },
  { href: "/admin/payments", label: "Paiements", icon: "💳" },
  { href: "/admin/dashboard/returns", label: "Retours", icon: "↩️" },
  { href: "/admin/dashboard/coupons", label: "Coupons", icon: "🎟️" },
  { href: "/admin/dashboard/notifications", label: "Notifications", icon: "🔔" },
  { href: "/admin/dashboard/settings", label: "Paramètres", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ffe259] via-[#ffa751] to-[#eecda3]">
      {/* Sidebar */}
      <aside className="w-72 bg-white/90 shadow-2xl flex flex-col gap-2 py-10 px-4 animate-slidein z-10">
        <div className="mb-8 text-center">
          <span className="text-3xl font-extrabold text-[#ffb347] tracking-widest animate-pulse">Zénith</span>
          <div className="mt-2 text-xs text-[#0f3460]/60 font-semibold">Admin Panel</div>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all hover:bg-[#ffb347]/20 text-[#0f3460] ${pathname.startsWith(item.href) ? "bg-[#ffb347]/30" : ""}`}
            >
              <span className="text-xl">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full px-10 py-6 flex items-center justify-between bg-white/80 shadow animate-fadein z-20">
          <div className="text-2xl font-extrabold text-[#0f3460] tracking-wide">Espace Administration</div>
          {/* Ici, tu peux ajouter le profil admin, notifications, logout... */}
          <div className="flex items-center gap-4">
            <span className="text-[#0f3460] font-bold">👤 Admin</span>
            <button className="px-4 py-2 bg-[#ffb347] text-white rounded-xl font-semibold shadow hover:bg-[#ffa751] transition">Déconnexion</button>
          </div>
        </header>
        {/* Notifications globales (à brancher plus tard) */}
        <div className="px-10 pt-4">
          {/* TODO: notifications/toasts */}
        </div>
        {/* Contenu de la page */}
        <section className="flex-1 px-10 py-8">{children}</section>
      </main>
    </div>
  );
}
