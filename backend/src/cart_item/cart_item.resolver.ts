// cart_item.resolver.ts
// Résolveur GraphQL pour CartItem (items du panier)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CartItemService } from './cart_item.service';
import { CartItem } from './cart_item.model';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Liste tous les items d'un panier
   */
  @Query(() => [CartItem], { name: 'cartItems' })
  findAll(@Args('cart_id', { type: () => Int }) cart_id: number) {
    return this.cartItemService.findAll(cart_id);
  }

  /**
   * Ajoute ou met à jour un item dans le panier
   */
  @Mutation(() => CartItem)
  addOrUpdateCartItem(
    @Args('cart_id', { type: () => Int }) cart_id: number,
    @Args('product_id', { type: () => Int }) product_id: number,
    @Args('variant_id', { type: () => Int, nullable: true }) variant_id: number | null,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('unit_price', { type: () => Float }) unit_price: number
  ) {
    return this.cartItemService.addOrUpdate(cart_id, product_id, variant_id, quantity, unit_price);
  }

  /**
   * Modifie la quantité d'un item
   */
  @Mutation(() => CartItem)
  updateCartItemQuantity(
    @Args('id', { type: () => Int }) id: number,
    @Args('quantity', { type: () => Int }) quantity: number
  ) {
    return this.cartItemService.updateQuantity(id, quantity);
  }

  /**
   * Supprime un item du panier
   */
  @Mutation(() => CartItem)
  removeCartItem(@Args('id', { type: () => Int }) id: number) {
    return this.cartItemService.remove(id);
  }
}
