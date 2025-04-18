// Script de seed Prisma pour Zénith
// Crée un admin par défaut (à changer après lancement), quelques clients et produits de démo
// Clean code, ultra commenté
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Création de l'admin (mot de passe à modifier après le premier lancement)
  const adminPassword = await bcrypt.hash('Admin@2025', 10);
  await prisma.user.upsert({
    where: { email: 'admin@zenith.com' },
    update: {},
    create: {
      name: 'Administrateur',
      email: 'admin@zenith.com',
      password: adminPassword,
      role: 'admin',
      phone: '0600000000',
      status: 'active', // Statut obligatoire
    },
  });

  // Quelques clients de test
  const clientPassword = await bcrypt.hash('Client@2025', 10);
  await prisma.user.upsert({
    where: { email: 'client1@zenith.com' },
    update: {},
    create: {
      name: 'Client Test 1',
      email: 'client1@zenith.com',
      password: clientPassword,
      role: 'client',
      phone: '0611111111',
      status: 'active', // Statut obligatoire
    },
  });
  await prisma.user.upsert({
    where: { email: 'client2@zenith.com' },
    update: {},
    create: {
      name: 'Client Test 2',
      email: 'client2@zenith.com',
      password: clientPassword,
      role: 'client',
      phone: '0622222222',
      status: 'active', // Statut obligatoire
    },
  });

  // Exemples de produits (si tu as un modèle Product dans Prisma)
  // Décommente et adapte selon ton schéma
  /*
  await prisma.product.createMany({
    data: [
      { name: 'Produit A', description: 'Super produit A', price: 29.99 },
      { name: 'Produit B', description: 'Produit B génial', price: 49.99 },
    ],
    skipDuplicates: true,
  });
  */
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
