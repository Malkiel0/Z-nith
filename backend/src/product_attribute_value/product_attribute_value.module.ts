// product_attribute_value.module.ts
// Module ProductAttributeValue pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValueResolver } from './product_attribute_value.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductAttributeValueService, ProductAttributeValueResolver, PrismaService],
})
export class ProductAttributeValueModule {}
