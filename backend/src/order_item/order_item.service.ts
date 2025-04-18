// order_item.service.ts
// Service pour la gestion des items de commande (OrderItem)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste tous les items d'une commande
   */
  async findAll(order_id: number): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({ where: { order_id } });
  }

  /**
   * Récupère un item par son ID
   */
  async findOne(id: number): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({ where: { id } });
  }

  /**
   * Met à jour la quantité ou le prix d'un item
   */
  async update(id: number, data: Partial<OrderItem>): Promise<OrderItem> {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  /**
   * Supprime un item de commande
   */
  async remove(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
