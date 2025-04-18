// order.resolver.ts
// Résolveur GraphQL pour Order (commande)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Récupère une commande par ID
   */
  @Query(() => Order, { name: 'order', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }

  /**
   * Liste toutes les commandes d'un utilisateur ou d'une session
   */
  @Query(() => [Order], { name: 'orders' })
  findAll(
    @Args('user_id', { type: () => Int, nullable: true }) user_id?: number,
    @Args('session_id', { type: () => String, nullable: true }) session_id?: string
  ) {
    return this.orderService.findAll(user_id, session_id);
  }

  /**
   * Crée une commande à partir d'un panier
   */
  @Mutation(() => Order)
  createOrderFromCart(
    @Args('cart_id', { type: () => Int }) cart_id: number,
    @Args('status', { type: () => String, nullable: true }) status?: string
  ) {
    return this.orderService.createFromCart(cart_id, status || "pending");
  }

  /**
   * Met à jour le statut d'une commande
   */
  @Mutation(() => Order)
  updateOrderStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => String }) status: string
  ) {
    return this.orderService.updateStatus(id, status);
  }

  /**
   * Supprime une commande
   */
  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
