// apolloClient.ts
// Client Apollo partagé pour Next.js (SSR/CSR), prêt pour NextAuth JWT
// Clean code, ultra commenté, sécurisé, aucune dépendance inutile

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// URL de l’API GraphQL NestJS (adapter si besoin)
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:4000/graphql";

// Ajoute le JWT NextAuth à chaque requête si présent (auth admin/client)
const authLink = setContext((_, { headers }) => {
  // Récupère le token JWT NextAuth du localStorage côté client
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("nextauth.token") || "";
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Link HTTP Apollo
const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });

// Apollo Client partagé (SSR/CSR, cache, auth)
export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});

export default apolloClient;
