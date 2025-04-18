// Extension du type NextAuth pour inclure le champ phone et avatar dans user
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatar?: string | null; // Champ custom pour compatibilité backend
      phone?: string | null;  // Champ custom pour compatibilité backend
      role?: string | null;   // Pour la redirection
      [key: string]: any;
    };
    [key: string]: any;
  }
}
