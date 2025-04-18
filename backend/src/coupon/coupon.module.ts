// coupon.module.ts
// Module Coupon pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CouponService, CouponResolver, PrismaService],
})
export class CouponModule {}
