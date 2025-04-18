// shipping_address.service.ts
// Service pour la gestion des adresses de livraison (ShippingAddress)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShippingAddress } from '@prisma/client';

@Injectable()
export class ShippingAddressService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les adresses d'un utilisateur ou d'une session
   */
  async findAll(user_id?: number, session_id?: string): Promise<ShippingAddress[]> {
    let where: any = {};
    if (user_id && session_id) {
      where = { OR: [{ user_id }, { session_id }] };
    } else if (user_id) {
      where = { user_id };
    } else if (session_id) {
      where = { session_id };
    }
    return this.prisma.shippingAddress.findMany({ where });
  }

  /**
   * Récupère une adresse par son ID
   */
  async findOne(id: number): Promise<ShippingAddress | null> {
    return this.prisma.shippingAddress.findUnique({ where: { id } });
  }

  /**
   * Crée une nouvelle adresse
   */
  async create(data: Omit<ShippingAddress, 'id'>): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.create({ data });
  }

  /**
   * Met à jour une adresse
   */
  async update(id: number, data: Partial<ShippingAddress>): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.update({ where: { id }, data });
  }

  /**
   * Supprime une adresse
   */
  async remove(id: number): Promise<ShippingAddress> {
    return this.prisma.shippingAddress.delete({ where: { id } });
  }
}
