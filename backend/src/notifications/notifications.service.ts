// Service Notification - Gestion de l’historique et de l’envoi des notifications admin
// Clean code, ultra commenté, respect Prisma
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée et enregistre une notification admin (persistée en base)
   * @param title Titre
   * @param message Message
   * @param type Type de notification (system, order, incident...)
   * @param targetId Id utilisateur cible (null = notification globale admin)
   */
  async createNotification({ title, message, type, targetId }: { title: string; message: string; type: string; targetId?: number }) {
    return this.prisma.notification.create({
      data: {
        title,
        message,
        type,
        targetId: targetId ?? null,
      },
    });
  }

  /**
   * Récupère l’historique des notifications (admin)
   * @param onlyUnread Si true, ne retourne que les non lues
   */
  async getAdminNotifications({ onlyUnread = false }: { onlyUnread?: boolean } = {}) {
    return this.prisma.notification.findMany({
      where: onlyUnread ? { read: false } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Marque une notification comme lue
   */
  async markAsRead(id: number) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}
