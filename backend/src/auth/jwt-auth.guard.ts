// jwt-auth.guard.ts
// Guard JWT pour sécuriser les routes REST (profil utilisateur, etc.)
// Clean code, structuré, ultra commenté
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Étendre le type Request pour permettre l’ajout de req.user
    const req = context.switchToHttp().getRequest<Request & { user?: any }>();
    // Gérer le cas où le header peut être string ou string[]
    let authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (Array.isArray(authHeader)) authHeader = authHeader[0];
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    try {
      // Vérifier le JWT (clé secrète NextAuth)
      const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
      // Attacher l’utilisateur décodé à la requête pour les contrôleurs
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
