// Contrôleur d'authentification Zénith (Nest.js)
// Clean code, routes login/register, commentaires détaillés
import { Controller, Post, Body, BadRequestException, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly prisma: PrismaService) {}

  /**
   * Connexion utilisateur : vérifie email + mot de passe (hash bcrypt)
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) throw new BadRequestException('Email ou mot de passe incorrect');
    const bcrypt = await import('bcrypt');
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) throw new BadRequestException('Email ou mot de passe incorrect');
    // On ne retourne pas le hash !
    const { password, ...safeUser } = user;
    // Générer un JWT signé avec NEXTAUTH_SECRET (même clé que NextAuth)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '7d' }
    );
    // Retourner le profil + le JWT
    return { ...safeUser, accessToken: token };

  }

  /**
   * Inscription utilisateur : crée un compte sécurisé (hash bcrypt)
   */
  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string; phone?: string }) {
    // Vérifier unicité email
    const exists = await this.userService.findByEmail(body.email);
    if (exists) throw new BadRequestException('Cet email est déjà utilisé');
    // On force le rôle 'client' pour toute inscription publique
    const user = await this.userService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
      role: 'client', // Sécurité : personne ne peut devenir admin via le site
    });
    const { password, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Retourne le profil et le rôle de l'utilisateur connecté (JWT obligatoire)
   * Sécurité : nécessite un JWT valide dans Authorization: Bearer <token>
   */
  @UseGuards(require('./jwt-auth.guard').JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    // L'utilisateur est injecté dans req.user par JwtAuthGuard
    if (!req.user) {
      throw new BadRequestException('Utilisateur non authentifié');
    }
    // On retourne le profil sans le hash du mot de passe
    const { password, ...safeUser } = req.user;
    return safeUser;
  }
}
