// product.service.ts
// Service pour la gestion des produits et variantes, avec gestion des relations et logique métier
// Clean code, structuré, très commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, ProductVariant } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retourne tous les produits, avec leurs variantes
   */
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { variants: true }
    });
  }

  /**
   * Retourne un produit par son ID, avec variantes
   */
  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { variants: true }
    });
  }

  /**
   * Crée un nouveau produit (sans variantes)
   */
  async create(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  /**
   * Met à jour un produit
   */
  async update(id: number, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data
    });
  }

  /**
   * Supprime un produit
   */
  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  /**
   * Ajoute une variante à un produit
   */
  async addVariant(productId: number, variantData: Omit<ProductVariant, 'id' | 'product_id'>): Promise<ProductVariant> {
    return this.prisma.productVariant.create({
      data: {
        ...variantData,
        product_id: productId
      }
    });
  }

  /**
   * Liste toutes les variantes d'un produit
   */
  async getVariants(productId: number): Promise<ProductVariant[]> {
    return this.prisma.productVariant.findMany({ where: { product_id: productId } });
  }
}
