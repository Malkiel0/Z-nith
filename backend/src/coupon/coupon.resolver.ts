// coupon.resolver.ts
// Résolveur GraphQL pour Coupon
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { Coupon } from './coupon.model';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  /**
   * Liste tous les coupons actifs
   */
  @Query(() => [Coupon], { name: 'activeCoupons' })
  findAllActive() {
    return this.couponService.findAllActive();
  }

  /**
   * Recherche un coupon par code
   */
  @Query(() => Coupon, { name: 'couponByCode', nullable: true })
  findByCode(@Args('code', { type: () => String }) code: string) {
    return this.couponService.findByCode(code);
  }

  /**
   * Crée un nouveau coupon
   */
  @Mutation(() => Coupon)
  createCoupon(
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet Coupon sans id/used_count
  ) {
    return this.couponService.create(JSON.parse(data));
  }

  /**
   * Met à jour un coupon
   */
  @Mutation(() => Coupon)
  updateCoupon(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel Coupon
  ) {
    return this.couponService.update(id, JSON.parse(data));
  }

  /**
   * Supprime un coupon
   */
  @Mutation(() => Coupon)
  removeCoupon(@Args('id', { type: () => Int }) id: number) {
    return this.couponService.remove(id);
  }
}
