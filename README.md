# Zénith Ecommerce

Projet e-commerce complet :
- **Frontend** : Next.js + Tailwind CSS v3 + React Server Components
- **Backend** : Nest.js (GraphQL)
- **Base de données** : PostgreSQL (Prisma)
- **Auth** : NextAuth.js (JWT & OAuth)
- **Temps réel** : WebSockets (Socket.io)
- **Microservices** : Docker + Kubernetes + RabbitMQ

## Structure du projet
- `/frontend` : Application Next.js
- `/backend` : API Nest.js + Prisma
- `/microservices` : Services RabbitMQ, etc.
- `/infra` : Docker, Kubernetes, configurations

---

## Démarrage rapide
1. `docker-compose up --build` pour tout lancer en local
2. Frontend sur `localhost:3000`, Backend sur `localhost:4000`

## Base de données
Structure conforme à la description utilisateur (voir dossier `/backend/prisma/schema.prisma`).

---

## Auteur
Projet généré automatiquement pour Zénith.
