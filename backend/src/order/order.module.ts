// order.module.ts
// Module Order pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from '../prisma.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderResolver, PrismaService],
})
export class OrderModule {}
