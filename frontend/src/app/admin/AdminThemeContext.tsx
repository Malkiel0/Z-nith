"use client";
// Contexte de gestion du dark mode pour l'admin Zénith
// Clean code, ultra commenté, persistance locale, transition fluide
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AdminThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export const useAdminTheme = () => {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminTheme doit être utilisé dans un AdminThemeProvider");
  return ctx;
};

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  // State du dark mode (par défaut, détecte la préférence système OU localStorage)
  const [darkMode, setDarkMode] = useState(false);

  // Initialisation au montage
  useEffect(() => {
    const saved = localStorage.getItem("zenith-admin-dark");
    if (saved !== null) {
      setDarkMode(saved === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Applique la classe 'dark' sur <html> UNIQUEMENT dans l'admin
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("zenith-admin-dark", darkMode ? "true" : "false");
  }, [darkMode]);

  // Toggle du dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <AdminThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AdminThemeContext.Provider>
  );
}
