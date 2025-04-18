// order_item.module.ts
// Module OrderItem pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItemResolver } from './order_item.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [OrderItemService, OrderItemResolver, PrismaService],
})
export class OrderItemModule {}
