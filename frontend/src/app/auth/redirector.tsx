// Composant qui redirige dynamiquement selon le rôle utilisateur après login
// Utilise la session NextAuth côté client
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RoleRedirector() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      // Redirection selon le rôle utilisateur
      const role = (session.user as Record<string, any>).role;
      if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/client");
      }
    }
  }, [session, status, router]);

  return null;
}
