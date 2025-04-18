// ApolloProvider.tsx
// Fournit le contexte Apollo à toute l’app Next.js (SSR/CSR)
// Clean code, ultra commenté, sécurisé, prêt pour NextAuth JWT

"use client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import React from "react";

export default function CustomApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
