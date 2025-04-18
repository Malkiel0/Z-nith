// cart.service.ts
// Service pour la gestion des paniers (Cart)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère un panier par son ID
   */
  async findOne(id: number): Promise<Cart | null> {
    return this.prisma.cart.findUnique({ where: { id }, include: { items: true } });
  }

  /**
   * Récupère le panier d'un utilisateur ou d'une session
   */
  async findByUserOrSession(user_id?: number, session_id?: string): Promise<Cart | null> {
    // Construction dynamique du filtre where pour éviter les undefined
    let where: any = {};
    if (user_id && session_id) {
      where = { OR: [{ user_id }, { session_id }] };
    } else if (user_id) {
      where = { user_id };
    } else if (session_id) {
      where = { session_id };
    }
    return this.prisma.cart.findFirst({
      where,
      include: { items: true },
    });
  }

  /**
   * Crée un nouveau panier (pour un user ou une session anonyme)
   */
  async create(user_id?: number, session_id?: string): Promise<Cart> {
    return this.prisma.cart.create({ data: { user_id, session_id } });
  }

  /**
   * Supprime un panier par son ID
   */
  async remove(id: number): Promise<Cart> {
    return this.prisma.cart.delete({ where: { id } });
  }
}
