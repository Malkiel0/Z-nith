// Service pour la gestion des paramètres globaux de la boutique (Setting)
// Clean code, ultra commenté, prêt pour extension future

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Setting } from './setting.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère les paramètres globaux (unique row)
   */
  async getSettings(): Promise<Setting | null> {
    // On suppose qu'il n'y a qu'une seule ligne de settings (id=1)
    return this.prisma.setting.findFirst();
  }

  /**
   * Met à jour les paramètres globaux
   */
  async updateSettings(data: Prisma.SettingUpdateInput): Promise<Setting> {
    // On update toujours la première ligne (id=1)
    const setting = await this.prisma.setting.findFirst();
    if (!setting) {
      // Pour la création, on doit forcer la présence de chaque champ (pas d'opérateur Prisma, pas d'undefined)
      return this.prisma.setting.create({
        data: {
          shopName: (data.shopName as any)?.set ?? data.shopName ?? "",
          email: (data.email as any)?.set ?? data.email ?? "",
          currency: (data.currency as any)?.set ?? data.currency ?? "",
          theme: (data.theme as any)?.set ?? data.theme ?? "",
          maintenance: (data.maintenance as any)?.set ?? data.maintenance ?? false,
        },
      });
    }
    return this.prisma.setting.update({
      where: { id: setting.id },
      data,
    });
  }
}
