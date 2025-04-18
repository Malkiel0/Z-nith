// payment.resolver.ts
// Résolveur GraphQL pour Payment (paiement)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.model';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Liste tous les paiements d'une commande
   */
  @Query(() => [Payment], { name: 'payments' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.paymentService.findAll(order_id);
  }

  /**
   * Récupère un paiement par son ID
   */
  @Query(() => Payment, { name: 'payment', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne(id);
  }

  /**
   * Crée un paiement pour une commande
   */
  @Mutation(() => Payment)
  createPayment(
    @Args('order_id', { type: () => Int }) order_id: number,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('method', { type: () => String }) method: string,
    @Args('status', { type: () => String }) status: string,
    @Args('transaction_id', { type: () => String }) transaction_id: string
  ) {
    return this.paymentService.create(order_id, amount, method, status, transaction_id);
  }

  /**
   * Met à jour le statut d'un paiement
   */
  @Mutation(() => Payment)
  updatePaymentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => String }) status: string
  ) {
    return this.paymentService.updateStatus(id, status);
  }

  /**
   * Supprime un paiement
   */
  @Mutation(() => Payment)
  removePayment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.remove(id);
  }
}
