// product_variant.module.ts
// Module ProductVariant pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { ProductVariantResolver } from './product_variant.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductVariantService, ProductVariantResolver, PrismaService],
})
export class ProductVariantModule {}
