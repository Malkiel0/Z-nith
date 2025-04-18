// shipping_address.module.ts
// Module ShippingAddress pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressResolver } from './shipping_address.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ShippingAddressService, ShippingAddressResolver, PrismaService],
})
export class ShippingAddressModule {}
