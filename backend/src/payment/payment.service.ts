// payment.service.ts
// Service pour la gestion des paiements (Payment)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payment } from '@prisma/client';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  /**
   * Liste tous les paiements d'une commande
   */
  async findAll(order_id: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({ where: { order_id } });
  }

  /**
   * Liste tous les paiements (admin)
   */
  async findAllAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  /**
   * Liste tous les paiements d’un utilisateur (client)
   */
  async findAllByUser(user_id: number): Promise<Payment[]> {
    // On récupère tous les paiements liés aux commandes de l’utilisateur
    return this.prisma.payment.findMany({
      where: {
        order: { user_id },
      },
    });
  }

  /**
   * Récupère un paiement par son ID
   */
  async findOne(id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  /**
   * Crée un paiement pour une commande
   */
  async create(order_id: number, amount: number, method: string, status: string, transaction_id: string): Promise<Payment> {
    const payment = await this.prisma.payment.create({ data: { order_id, amount, method, status, transaction_id } });
    // Notifier tous les admins en temps réel (WebSocket)
    this.notificationsGateway.sendAdminNotification(
      'payment_created',
      `Paiement reçu pour la commande #${order_id} (${amount} €) [${method}]`,
      {
        payment_id: payment.id,
        order_id,
        amount,
        method,
        status,
        // Utilisation de paid_at car createdAt n’existe pas sur payment
paidAt: payment.paid_at,
      }
    );
    return payment;
  }

  /**
   * Met à jour le statut d'un paiement
   */
  async updateStatus(id: number, status: string): Promise<Payment> {
    return this.prisma.payment.update({ where: { id }, data: { status } });
  }

  /**
   * Supprime un paiement
   */
  async remove(id: number): Promise<Payment> {
    return this.prisma.payment.delete({ where: { id } });
  }
}
