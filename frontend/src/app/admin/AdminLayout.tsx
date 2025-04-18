"use client";
// Layout global admin Zénith : sidebar, header, notifications, responsive, animations
// Clean code, ultra commenté, design professionnel
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminThemeProvider, useAdminTheme } from "./AdminThemeContext";

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
  return (
    <AdminThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminThemeProvider>
  );
}

// Layout interne qui gère le dark mode et le toggle
function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useAdminTheme();
  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${darkMode ? "bg-[#181818]" : "bg-gradient-to-br from-[#ffe259] via-[#ffa751] to-[#eecda3]"} ${darkMode ? "text-white" : "text-[#0f3460]"}`}
    >
      {/* Sidebar */}
      <aside
        className={`w-72 shadow-2xl flex flex-col gap-2 py-10 px-4 animate-slidein z-10 transition-colors duration-500 ${darkMode ? "bg-[#232526]" : "bg-white/90]"} ${darkMode ? "text-white" : "text-[#0f3460]"}`}
      >
        <div className="mb-8 text-center">
          <span
            className={`text-3xl font-extrabold tracking-widest animate-pulse transition-colors duration-500 ${darkMode ? "text-[#ffe259]" : "text-[#ffb347]"}`}
          >
            Zénith
          </span>
          <div
            className={`mt-2 text-xs font-semibold transition-colors duration-500 ${darkMode ? "text-[#ffe259]/60" : "text-[#0f3460]/60"}`}
          >
            Admin Panel
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${darkMode ? "hover:bg-[#232526]/80 text-white" : "hover:bg-[#ffb347]/20 text-[#0f3460]"} ${pathname.startsWith(item.href) ? (darkMode ? "bg-[#232526]/80" : "bg-[#ffb347]/30") : ""}`}
            >
              <span className="text-xl">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className={`flex-1 flex flex-col min-h-screen ${darkMode ? "bg-[#181818] text-white" : ""}`}>
        {/* Header */}
        <header
          className={`w-full px-10 py-6 flex items-center justify-between shadow animate-fadein z-20 transition-colors duration-500 ${darkMode ? "bg-[#232526] text-white" : "bg-white/80 text-[#0f3460]"}`}
        >
          <div
            className={`text-2xl font-extrabold tracking-wide transition-colors duration-500 ${darkMode ? "text-white" : "text-[#0f3460]"}`}
          >
            Espace Administration
          </div>
          {/* Profil admin, notifications, logout, toggle dark mode */}
          <div className="flex items-center gap-4">
            <span className={`font-bold ${darkMode ? "text-white" : "text-[#0f3460]"}`}>👤 Admin</span>
            {/* Toggle dark mode extravagant */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold shadow transition-all duration-500 border-2 ${darkMode ? "bg-[#181818] border-[#ffe259] text-[#ffe259] hover:bg-[#414345]" : "bg-[#ffb347] border-[#ffb347] text-white hover:bg-[#ffa751]"}`}
              aria-label="Basculer mode sombre"
            >
              <span className="text-xl animate-spin-slow">
                {darkMode ? "🌙" : "☀️"}
              </span>
              <span className="hidden md:inline font-bold">
                {darkMode ? "Sombre" : "Clair"}
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-xl font-semibold shadow transition ${darkMode ? "bg-[#ffe259] text-[#181818] hover:bg-[#ffb347]" : "bg-[#ffb347] text-white hover:bg-[#ffa751]"}`}
            >
              Déconnexion
            </button>
          </div>
        </header>
        {/* Notifications globales (à brancher plus tard) */}
        <div className="px-10 pt-4">
          {/* TODO: notifications/toasts */}
        </div>
        {/* Contenu de la page */}
        <section className={`flex-1 px-10 py-8 ${darkMode ? "bg-[#232526] text-white" : ""}`}>{children}</section>
      </main>
    </div>
  );
}
