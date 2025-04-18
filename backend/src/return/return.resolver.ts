// return.resolver.ts
// Résolveur GraphQL pour Return (retours produits)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { ReturnService } from './return.service';
import { Return } from './return.model';

@Resolver(() => Return)
export class ReturnResolver {
  constructor(private readonly returnService: ReturnService) {}

  /**
   * Liste tous les retours d'une commande
   */
  @Query(() => [Return], { name: 'returns' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.returnService.findAll(order_id);
  }

  /**
   * Récupère un retour par son ID
   */
  @Query(() => Return, { name: 'return', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.returnService.findOne(id);
  }

  /**
   * Crée un retour pour une commande
   */
  @Mutation(() => Return)
  createReturn(
    @Args('order_id', { type: () => Int }) order_id: number,
    @Args('user_id', { type: () => Int }) user_id: number,
    @Args('reason', { type: () => String }) reason: string,
    @Args('status', { type: () => String }) status: string,
    @Args('refund_amount', { type: () => Float }) refund_amount: number
  ) {
    return this.returnService.create(order_id, user_id, reason, status, refund_amount);
  }

  /**
   * Met à jour un retour
   */
  @Mutation(() => Return)
  updateReturn(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel Return
  ) {
    return this.returnService.update(id, JSON.parse(data));
  }

  /**
   * Supprime un retour
   */
  @Mutation(() => Return)
  removeReturn(@Args('id', { type: () => Int }) id: number) {
    return this.returnService.remove(id);
  }
}
