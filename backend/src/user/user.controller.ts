// user.controller.ts
// Contrôleur REST pour la gestion du profil utilisateur (update profil sécurisé)
// Clean code, structuré, ultra commenté
import { Controller, Put, Body, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Met à jour le profil de l'utilisateur connecté (nom/email)
   * Authentification JWT obligatoire
   */
  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMe(@Req() req: Request & { user?: any }, @Body() body: { name: string; email: string }) {
    // Récupérer l'utilisateur depuis le JWT (req.user)
    const user = req.user;
    if (!user?.id) {
      throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
    }
    // Mise à jour du profil (nom/email)
    try {
      const updated = await this.userService.updateProfile(user.id, body);
      return { success: true, user: updated };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Change le mot de passe du client connecté
   * Authentification JWT obligatoire
   */
  @UseGuards(JwtAuthGuard)
  @Put('password')
  async changePassword(
    @Req() req: Request & { user?: any },
    @Body() body: { currentPassword: string; newPassword: string }
  ) {
    const user = req.user;
    if (!user?.id) {
      throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
    }
    try {
      await this.userService.changePassword(user.id, body.currentPassword, body.newPassword);
      return { success: true, message: 'Mot de passe modifié avec succès.' };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Upload et met à jour l’avatar du client connecté
   * Authentification JWT obligatoire
   */
  @UseGuards(JwtAuthGuard)
  @Put('avatar')
  async updateAvatar(
    @Req() req: Request & { user?: any },
  ) {
    const user = req.user;
    if (!user?.id) {
      throw new HttpException('Utilisateur non authentifié', HttpStatus.UNAUTHORIZED);
    }
    // Vérifier la présence du fichier (multipart/form-data)
    if (!(req as any)['file'] && (!(req as any)['files'] || !(req as any)['files'].avatar)) {
      throw new HttpException('Aucun fichier envoyé', HttpStatus.BAD_REQUEST);
    }
    // Récupérer le fichier (adapter selon le middleware utilisé)
    const file = (req as any)['file'] || ((req as any)['files'] ? (req as any)['files'].avatar : null);
    try {
      const avatarUrl = await this.userService.updateAvatar(user.id, file);
      return { success: true, avatarUrl };
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
