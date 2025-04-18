// commission.resolver.ts
// Résolveur GraphQL pour Commission
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CommissionService } from './commission.service';
import { Commission } from './commission.model';

@Resolver(() => Commission)
export class CommissionResolver {
  constructor(private readonly commissionService: CommissionService) {}

  /**
   * Liste toutes les commissions d'une commande
   */
  @Query(() => [Commission], { name: 'commissions' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.commissionService.findAll(order_id);
  }

  /**
   * Récupère une commission par son ID
   */
  @Query(() => Commission, { name: 'commission', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commissionService.findOne(id);
  }

  /**
   * Crée une commission pour une commande
   */
  @Mutation(() => Commission)
  createCommission(
    @Args('order_id', { type: () => Int }) order_id: number,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('collected', { type: () => Boolean, nullable: true }) collected?: boolean
  ) {
    return this.commissionService.create(order_id, amount, collected ?? false);
  }

  /**
   * Supprime une commission
   */
  @Mutation(() => Commission)
  removeCommission(@Args('id', { type: () => Int }) id: number) {
    return this.commissionService.remove(id);
  }
}
