// product_attribute_value.service.ts
// Service pour la gestion des valeurs d'attribut de produit (ex : "XL", "Rouge")
// Clean code, structuré, très commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductAttributeValue } from '@prisma/client';

@Injectable()
export class ProductAttributeValueService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retourne toutes les valeurs pour un attribut donné
   */
  async findAll(attribute_id: number): Promise<ProductAttributeValue[]> {
    return this.prisma.productAttributeValue.findMany({ where: { attribute_id } });
  }

  /**
   * Retourne une valeur par son ID
   */
  async findOne(id: number): Promise<ProductAttributeValue | null> {
    return this.prisma.productAttributeValue.findUnique({ where: { id } });
  }

  /**
   * Crée une nouvelle valeur pour un attribut
   */
  async create(attribute_id: number, value: string): Promise<ProductAttributeValue> {
    return this.prisma.productAttributeValue.create({ data: { attribute_id, value } });
  }

  /**
   * Met à jour une valeur
   */
  async update(id: number, value: string): Promise<ProductAttributeValue> {
    return this.prisma.productAttributeValue.update({ where: { id }, data: { value } });
  }

  /**
   * Supprime une valeur
   */
  async remove(id: number): Promise<ProductAttributeValue> {
    return this.prisma.productAttributeValue.delete({ where: { id } });
  }
}
