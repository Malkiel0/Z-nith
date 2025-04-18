import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // On utilise NestExpressApplication pour la gestion des fichiers statiques
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Configuration CORS pour accepter les requêtes du frontend Next.js (localhost:3000 et 4000)
  // Cette configuration est indispensable pour permettre la communication API entre le frontend et le backend
  app.enableCors({
    origin: [
      'http://localhost:3000', // Port par défaut Next.js
      'http://localhost:3001', // Port alternatif Next.js (dev ou preview)
      'http://localhost:4000', // Si le frontend tourne sur ce port
    ], // Ajout de 3001 pour supporter tous les environnements de dev
    credentials: true,
  });

  // Servir le dossier /uploads/avatars en statique pour les avatars utilisateurs
  app.useStaticAssets(join(process.cwd(), 'uploads', 'avatars'), {
    prefix: '/uploads/avatars/',
  });
  // On force le backend à écouter sur le port 4000 pour éviter tout conflit avec le frontend (Next.js utilise 3000)
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
