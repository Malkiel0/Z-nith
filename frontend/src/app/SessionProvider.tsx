// SessionProvider global pour NextAuth (App Router)
// Clean code, ultra commenté
'use client';
import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  // Fournit le contexte NextAuth à toute l'application
  return <SessionProvider>{children}</SessionProvider>;
}
