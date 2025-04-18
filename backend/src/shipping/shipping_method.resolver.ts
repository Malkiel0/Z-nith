// shipping_method.resolver.ts
// Résolveur GraphQL pour ShippingMethod (méthode de livraison)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { ShippingMethodService } from './shipping_method.service';
import { ShippingMethod } from './shipping_method.model';

@Resolver(() => ShippingMethod)
export class ShippingMethodResolver {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  /**
   * Liste toutes les méthodes de livraison
   */
  @Query(() => [ShippingMethod], { name: 'shippingMethods' })
  findAll() {
    return this.shippingMethodService.findAll();
  }

  /**
   * Récupère une méthode par son ID
   */
  @Query(() => ShippingMethod, { name: 'shippingMethod', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippingMethodService.findOne(id);
  }

  /**
   * Crée une nouvelle méthode
   */
  @Mutation(() => ShippingMethod)
  createShippingMethod(
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet ShippingMethod sans id
  ) {
    return this.shippingMethodService.create(JSON.parse(data));
  }

  /**
   * Met à jour une méthode
   */
  @Mutation(() => ShippingMethod)
  updateShippingMethod(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel ShippingMethod
  ) {
    return this.shippingMethodService.update(id, JSON.parse(data));
  }

  /**
   * Supprime une méthode
   */
  @Mutation(() => ShippingMethod)
  removeShippingMethod(@Args('id', { type: () => Int }) id: number) {
    return this.shippingMethodService.remove(id);
  }
}
