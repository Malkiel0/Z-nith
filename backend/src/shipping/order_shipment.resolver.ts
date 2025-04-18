// order_shipment.resolver.ts
// Résolveur GraphQL pour OrderShipment (expédition de commande)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderShipmentService } from './order_shipment.service';
import { OrderShipment } from './order_shipment.model';

@Resolver(() => OrderShipment)
export class OrderShipmentResolver {
  constructor(private readonly orderShipmentService: OrderShipmentService) {}

  /**
   * Liste toutes les expéditions d'une commande
   */
  @Query(() => [OrderShipment], { name: 'orderShipments' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.orderShipmentService.findAll(order_id);
  }

  /**
   * Récupère une expédition par son ID
   */
  @Query(() => OrderShipment, { name: 'orderShipment', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderShipmentService.findOne(id);
  }

  /**
   * Crée une expédition pour une commande
   */
  @Mutation(() => OrderShipment)
  createOrderShipment(
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet OrderShipment sans id
  ) {
    return this.orderShipmentService.create(JSON.parse(data));
  }

  /**
   * Met à jour une expédition
   */
  @Mutation(() => OrderShipment)
  updateOrderShipment(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel OrderShipment
  ) {
    return this.orderShipmentService.update(id, JSON.parse(data));
  }

  /**
   * Supprime une expédition
   */
  @Mutation(() => OrderShipment)
  removeOrderShipment(@Args('id', { type: () => Int }) id: number) {
    return this.orderShipmentService.remove(id);
  }
}
