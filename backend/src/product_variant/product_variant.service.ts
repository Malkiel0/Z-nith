// product_variant.service.ts
// Service pour la gestion des variantes de produit
// Clean code, structuré, très commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductVariant } from '@prisma/client';

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retourne toutes les variantes d'un produit
   */
  async findAll(product_id: number): Promise<ProductVariant[]> {
    return this.prisma.productVariant.findMany({ where: { product_id } });
  }

  /**
   * Retourne une variante par son ID
   */
  async findOne(id: number): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findUnique({ where: { id } });
  }

  /**
   * Crée une nouvelle variante
   */
  async create(product_id: number, data: Omit<ProductVariant, 'id' | 'product_id'>): Promise<ProductVariant> {
    return this.prisma.productVariant.create({ data: { ...data, product_id } });
  }

  /**
   * Met à jour une variante
   */
  async update(id: number, data: Partial<ProductVariant>): Promise<ProductVariant> {
    return this.prisma.productVariant.update({ where: { id }, data });
  }

  /**
   * Supprime une variante
   */
  async remove(id: number): Promise<ProductVariant> {
    return this.prisma.productVariant.delete({ where: { id } });
  }
}
