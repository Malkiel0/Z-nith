// order_shipment.module.ts
// Module OrderShipment pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { OrderShipmentService } from './order_shipment.service';
import { OrderShipmentResolver } from './order_shipment.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [OrderShipmentService, OrderShipmentResolver, PrismaService],
})
export class OrderShipmentModule {}
