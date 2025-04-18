// shipping_method.service.ts
// Service pour la gestion des méthodes de livraison (ShippingMethod)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShippingMethod } from '@prisma/client';

@Injectable()
export class ShippingMethodService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les méthodes de livraison
   */
  async findAll(): Promise<ShippingMethod[]> {
    return this.prisma.shippingMethod.findMany();
  }

  /**
   * Récupère une méthode par son ID
   */
  async findOne(id: number): Promise<ShippingMethod | null> {
    return this.prisma.shippingMethod.findUnique({ where: { id } });
  }

  /**
   * Crée une nouvelle méthode
   */
  async create(data: Omit<ShippingMethod, 'id'>): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.create({ data });
  }

  /**
   * Met à jour une méthode
   */
  async update(id: number, data: Partial<ShippingMethod>): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.update({ where: { id }, data });
  }

  /**
   * Supprime une méthode
   */
  async remove(id: number): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.delete({ where: { id } });
  }
}
