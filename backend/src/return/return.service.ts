// return.service.ts
// Service pour la gestion des retours produits (Return)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Return } from '@prisma/client';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste tous les retours d'une commande
   */
  async findAll(order_id: number): Promise<Return[]> {
    return this.prisma.return.findMany({ where: { order_id } });
  }

  /**
   * Récupère un retour par son ID
   */
  async findOne(id: number): Promise<Return | null> {
    return this.prisma.return.findUnique({ where: { id } });
  }

  /**
   * Crée un retour pour une commande
   */
  async create(order_id: number, user_id: number, reason: string, status: string, refund_amount: number): Promise<Return> {
    return this.prisma.return.create({ data: { order_id, user_id, reason, status, refund_amount } });
  }

  /**
   * Met à jour le statut ou le montant remboursé
   */
  async update(id: number, data: Partial<Return>): Promise<Return> {
    return this.prisma.return.update({ where: { id }, data });
  }

  /**
   * Supprime un retour
   */
  async remove(id: number): Promise<Return> {
    return this.prisma.return.delete({ where: { id } });
  }
}
