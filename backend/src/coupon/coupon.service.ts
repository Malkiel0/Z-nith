// coupon.service.ts
// Service pour la gestion des coupons (Coupon)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Coupon } from '@prisma/client';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste tous les coupons actifs
   */
  async findAllActive(): Promise<Coupon[]> {
    return this.prisma.coupon.findMany({ where: { is_active: true } });
  }

  /**
   * Recherche un coupon par code
   */
  async findByCode(code: string): Promise<Coupon | null> {
    return this.prisma.coupon.findUnique({ where: { code } });
  }

  /**
   * Crée un nouveau coupon
   */
  async create(data: Omit<Coupon, 'id' | 'used_count'>): Promise<Coupon> {
    return this.prisma.coupon.create({ data: { ...data, used_count: 0 } });
  }

  /**
   * Met à jour un coupon
   */
  async update(id: number, data: Partial<Coupon>): Promise<Coupon> {
    return this.prisma.coupon.update({ where: { id }, data });
  }

  /**
   * Supprime un coupon
   */
  async remove(id: number): Promise<Coupon> {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
