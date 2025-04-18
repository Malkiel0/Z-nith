// cart_item.service.ts
// Service pour la gestion des items de panier (CartItem)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  /**
   * Récupère tous les items d'un panier
   */
  async findAll(cart_id: number): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({ where: { cart_id } });
  }

  /**
   * Ajoute un item au panier (ou incrémente la quantité si déjà présent)
   */
  async addOrUpdate(cart_id: number, product_id: number, variant_id: number | null, quantity: number, unit_price: number): Promise<CartItem> {
    // Vérifie si l'item existe déjà (même produit, même variante)
    const existing = await this.prisma.cartItem.findFirst({
      where: { cart_id, product_id, variant_id },
    });
    if (existing) {
      // Incrémente la quantité
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }
    // Sinon, crée un nouvel item
    return this.prisma.cartItem.create({ data: { cart_id, product_id, variant_id, quantity, unit_price } });
  }

  /**
   * Modifie la quantité d'un item
   */
  async updateQuantity(id: number, quantity: number): Promise<CartItem> {
    return this.prisma.cartItem.update({ where: { id }, data: { quantity } });
  }

  /**
   * Supprime un item du panier
   */
  async remove(id: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
