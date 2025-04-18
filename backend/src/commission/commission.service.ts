// commission.service.ts
// Service pour la gestion des commissions (Commission)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Commission } from '@prisma/client';

@Injectable()
export class CommissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les commissions d'une commande
   */
  async findAll(order_id: number): Promise<Commission[]> {
    return this.prisma.commission.findMany({ where: { order_id } });
  }

  /**
   * Récupère une commission par son ID
   */
  async findOne(id: number): Promise<Commission | null> {
    return this.prisma.commission.findUnique({ where: { id } });
  }

  /**
   * Crée une commission pour une commande
   */
  async create(order_id: number, amount: number, collected: boolean = false): Promise<Commission> {
    // Le schéma Prisma n'a pas de champ 'type', mais a 'collected'
    return this.prisma.commission.create({ data: { order_id, amount, collected } });
  }

  /**
   * Supprime une commission
   */
  async remove(id: number): Promise<Commission> {
    return this.prisma.commission.delete({ where: { id } });
  }
}
