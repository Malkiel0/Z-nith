// cart.resolver.ts
// Résolveur GraphQL pour Cart (panier)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './cart.model';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  /**
   * Récupère un panier par ID
   */
  @Query(() => Cart, { name: 'cart', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  /**
   * Récupère le panier d'un utilisateur ou d'une session
   */
  @Query(() => Cart, { name: 'cartByUserOrSession', nullable: true })
  findByUserOrSession(
    @Args('user_id', { type: () => Int, nullable: true }) user_id?: number,
    @Args('session_id', { type: () => String, nullable: true }) session_id?: string
  ) {
    return this.cartService.findByUserOrSession(user_id, session_id);
  }

  /**
   * Crée un nouveau panier
   */
  @Mutation(() => Cart)
  createCart(
    @Args('user_id', { type: () => Int, nullable: true }) user_id?: number,
    @Args('session_id', { type: () => String, nullable: true }) session_id?: string
  ) {
    return this.cartService.create(user_id, session_id);
  }

  /**
   * Supprime un panier
   */
  @Mutation(() => Cart)
  removeCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }
}
