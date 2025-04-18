// product_attribute.service.ts
// Service pour la gestion des attributs de produit (ex : taille, couleur)
// Clean code, structuré, très commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductAttribute } from '@prisma/client';

@Injectable()
export class ProductAttributeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retourne tous les attributs
   */
  async findAll(): Promise<ProductAttribute[]> {
    return this.prisma.productAttribute.findMany({ include: { values: true } });
  }

  /**
   * Retourne un attribut par son ID
   */
  async findOne(id: number): Promise<ProductAttribute | null> {
    return this.prisma.productAttribute.findUnique({ where: { id }, include: { values: true } });
  }

  /**
   * Crée un nouvel attribut
   */
  async create(name: string): Promise<ProductAttribute> {
    return this.prisma.productAttribute.create({ data: { name } });
  }

  /**
   * Met à jour un attribut
   */
  async update(id: number, name: string): Promise<ProductAttribute> {
    return this.prisma.productAttribute.update({ where: { id }, data: { name } });
  }

  /**
   * Supprime un attribut
   */
  async remove(id: number): Promise<ProductAttribute> {
    return this.prisma.productAttribute.delete({ where: { id } });
  }
}
