// order_shipment.service.ts
// Service pour la gestion des expéditions de commande (OrderShipment)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderShipment } from '@prisma/client';

@Injectable()
export class OrderShipmentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les expéditions d'une commande
   */
  async findAll(order_id: number): Promise<OrderShipment[]> {
    return this.prisma.orderShipment.findMany({ where: { order_id } });
  }

  /**
   * Récupère une expédition par son ID
   */
  async findOne(id: number): Promise<OrderShipment | null> {
    return this.prisma.orderShipment.findUnique({ where: { id } });
  }

  /**
   * Crée une expédition pour une commande
   */
  async create(data: Omit<OrderShipment, 'id'>): Promise<OrderShipment> {
    return this.prisma.orderShipment.create({ data });
  }

  /**
   * Met à jour une expédition
   */
  async update(id: number, data: Partial<OrderShipment>): Promise<OrderShipment> {
    return this.prisma.orderShipment.update({ where: { id }, data });
  }

  /**
   * Supprime une expédition
   */
  async remove(id: number): Promise<OrderShipment> {
    return this.prisma.orderShipment.delete({ where: { id } });
  }
}
