// product.module.ts
// Module Product pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductService, ProductResolver, PrismaService],
})
export class ProductModule {}
