// shipping_address.resolver.ts
// Résolveur GraphQL pour ShippingAddress (adresse de livraison)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddress } from './shipping_address.model';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  /**
   * Liste toutes les adresses d'un utilisateur ou d'une session
   */
  @Query(() => [ShippingAddress], { name: 'shippingAddresses' })
  findAll(
    @Args('user_id', { type: () => Int, nullable: true }) user_id?: number,
    @Args('session_id', { type: () => String, nullable: true }) session_id?: string
  ) {
    return this.shippingAddressService.findAll(user_id, session_id);
  }

  /**
   * Récupère une adresse par son ID
   */
  @Query(() => ShippingAddress, { name: 'shippingAddress', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippingAddressService.findOne(id);
  }

  /**
   * Crée une nouvelle adresse
   */
  @Mutation(() => ShippingAddress)
  createShippingAddress(
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet ShippingAddress sans id
  ) {
    return this.shippingAddressService.create(JSON.parse(data));
  }

  /**
   * Met à jour une adresse
   */
  @Mutation(() => ShippingAddress)
  updateShippingAddress(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel ShippingAddress
  ) {
    return this.shippingAddressService.update(id, JSON.parse(data));
  }

  /**
   * Supprime une adresse
   */
  @Mutation(() => ShippingAddress)
  removeShippingAddress(@Args('id', { type: () => Int }) id: number) {
    return this.shippingAddressService.remove(id);
  }
}
