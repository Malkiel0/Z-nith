// order_item.resolver.ts
// Résolveur GraphQL pour OrderItem (items de commande)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { OrderItemService } from './order_item.service';
import { OrderItem } from './order_item.model';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  /**
   * Liste tous les items d'une commande
   */
  @Query(() => [OrderItem], { name: 'orderItems' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.orderItemService.findAll(order_id);
  }

  /**
   * Récupère un item par son ID
   */
  @Query(() => OrderItem, { name: 'orderItem', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemService.findOne(id);
  }

  /**
   * Met à jour un item de commande
   */
  @Mutation(() => OrderItem)
  updateOrderItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify({ quantity, unit_price })
  ) {
    return this.orderItemService.update(id, JSON.parse(data));
  }

  /**
   * Supprime un item de commande
   */
  @Mutation(() => OrderItem)
  removeOrderItem(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemService.remove(id);
  }
}
