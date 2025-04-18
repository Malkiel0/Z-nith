// product_attribute.module.ts
// Module ProductAttribute pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeResolver } from './product_attribute.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductAttributeService, ProductAttributeResolver, PrismaService],
})
export class ProductAttributeModule {}
