// Layout global pour toutes les pages client (Zénith)
// Inclut le menu sticky, padding top, fond animé, etc.
// Clean code, ultra commenté, structure Next.js 13+
import React from "react";
import ClientMenu from "./ClientMenu";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Menu sticky toujours visible */}
      <ClientMenu />
      {/* Container global avec padding top pour ne pas masquer le contenu sous le menu */}
      <div className="pt-28 pb-8 min-h-screen bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] flex flex-col items-center animate-fadein">
        {children}
      </div>
    </>
  );
}
