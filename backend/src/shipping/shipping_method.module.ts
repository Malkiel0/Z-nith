// shipping_method.module.ts
// Module ShippingMethod pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ShippingMethodService } from './shipping_method.service';
import { ShippingMethodResolver } from './shipping_method.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ShippingMethodService, ShippingMethodResolver, PrismaService],
})
export class ShippingMethodModule {}
