// user.service.ts
// Service pour la gestion des utilisateurs avec Prisma
// Clean code, structuré, commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retourne tous les utilisateurs
   */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
   * Retourne un utilisateur par son ID
   */
  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Retourne un utilisateur par son email (pour l'authentification)
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Crée un nouvel utilisateur avec hash du mot de passe (inscription sécurisée)
   */
  async createUser(data: { name: string; email: string; password: string; phone?: string; role?: string; status?: string }): Promise<User> {
    const bcrypt = await import('bcrypt');
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        phone: data.phone,
        role: data.role || 'client',
        status: data.status || 'active',
      },
    });
  }

  /**
   * Met à jour l’avatar d’un utilisateur
   * Sauvegarde le fichier sur le serveur et met à jour le champ avatar
   */
  async updateAvatar(userId: number, file: any): Promise<string> {
    if (!file) throw new Error('Aucun fichier envoyé.');
    // Exemple de sauvegarde locale (à adapter pour cloud ou CDN)
    const fs = await import('fs');
    const path = await import('path');
    const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const ext = path.extname(file.originalname || file.name || '');
    const filename = `avatar_${userId}_${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);
    // Sauvegarde du fichier (Buffer ou stream selon middleware)
    if (file.buffer) {
      fs.writeFileSync(filepath, file.buffer);
    } else if (file.data) {
      fs.writeFileSync(filepath, file.data);
    } else {
      throw new Error('Format de fichier non supporté.');
    }
    // URL d’accès (à adapter selon config serveur)
    const avatarUrl = `/uploads/avatars/${filename}`;
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });
    return avatarUrl;
  }

  /**
   * Change le mot de passe d’un utilisateur
   * Vérifie le mot de passe actuel, hash le nouveau
   */
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    // Récupérer l’utilisateur
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Utilisateur introuvable.');
    // Vérifier le mot de passe actuel
    const bcrypt = await import('bcrypt');
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new Error('Mot de passe actuel incorrect.');
    // Hasher le nouveau mot de passe
    const hashed = await bcrypt.hash(newPassword, 10);
    // Mettre à jour le mot de passe
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
  }

  /**
   * Met à jour le profil (nom/email) d’un utilisateur
   * Vérifie l’unicité de l’email
   */
  async updateProfile(userId: number, data: { name: string; email: string }): Promise<User> {
    // Vérifier si l’email est déjà utilisé par un autre utilisateur
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing && existing.id !== userId) {
      throw new Error('Cet email est déjà utilisé par un autre compte.');
    }
    // Mettre à jour le nom et l’email
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }
}