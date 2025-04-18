// cart_item.module.ts
// Module CartItem pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemResolver } from './cart_item.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CartItemService, CartItemResolver, PrismaService],
})
export class CartItemModule {}
