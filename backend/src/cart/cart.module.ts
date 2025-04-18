// cart.module.ts
// Module Cart pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CartService, CartResolver, PrismaService],
})
export class CartModule {}
