// API Route NextAuth pour Zénith (authentification JWT/OAuth, clean, commenté)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Authentification sécurisée via l'API Nest.js backend
        if (!credentials?.email || !credentials?.password) {
          console.error("[NextAuth] Credentials manquants");
          return null;
        }
        try {
          // On utilise une variable d'environnement pour l'URL de l'API backend
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          if (!res.ok) {
            const errorText = await res.text();
            console.error(`[NextAuth] Erreur backend: ${res.status} - ${errorText}`);
            return null;
          }
          const user = await res.json();
          // On attend un objet { id, email, role, ... }
          if (!user || !user.id || !user.email) {
            console.error("[NextAuth] Utilisateur non valide retourné par le backend", user);
            return null;
          }
          // On s'assure de retourner toujours un objet complet (id, email, name, role)
          const safeUser = {
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role || 'client',
            accessToken: user.accessToken, // On récupère le vrai JWT backend
          };
          console.log('[NextAuth] Utilisateur retourné à NextAuth:', safeUser);
          return safeUser;
        } catch (e) {
          // En cas d'erreur réseau ou backend, on retourne null (erreur générique)
          console.error("[NextAuth] Erreur réseau ou exception:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On stocke toutes les infos utiles dans le token JWT NextAuth
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.role = (user as any).role || "client";
        // On peut aussi stocker un vrai JWT backend ici si besoin
        token.accessToken = (user as any).accessToken || (user as any).jwt || (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      // On expose tout ce qu'il faut dans la session côté client
      if (session.user) {
        (session.user as Record<string, any>).id = token.id;
        (session.user as Record<string, any>).email = token.email;
        (session.user as Record<string, any>).role = token.role;
        (session.user as Record<string, any>).accessToken = token.accessToken;
      }
      // Pour plus de robustesse, on expose aussi directement accessToken à la racine
      (session as any).accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirection selon le rôle après login
      if (url.includes("/admin") || url.includes("/client")) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Handler NextAuth exporté pour App Router (GET & POST)
// Handler NextAuth exporté pour App Router (GET & POST)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
