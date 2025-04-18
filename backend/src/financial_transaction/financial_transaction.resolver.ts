// financial_transaction.resolver.ts
// Résolveur GraphQL pour FinancialTransaction (transactions financières)
// Clean code, structuré, ultra commenté

import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { FinancialTransactionService } from './financial_transaction.service';
import { FinancialTransaction } from './financial_transaction.model';

@Resolver(() => FinancialTransaction)
export class FinancialTransactionResolver {
  constructor(private readonly transactionService: FinancialTransactionService) {}

  /**
   * Liste toutes les transactions d'une commande
   */
  @Query(() => [FinancialTransaction], { name: 'financialTransactions' })
  findAll(@Args('order_id', { type: () => Int }) order_id: number) {
    return this.transactionService.findAll(order_id);
  }

  /**
   * Récupère une transaction par son ID
   */
  @Query(() => FinancialTransaction, { name: 'financialTransaction', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.findOne(id);
  }

  /**
   * Crée une transaction financière
   */
  @Mutation(() => FinancialTransaction)
  createFinancialTransaction(
    @Args('order_id', { type: () => Int }) order_id: number,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('type', { type: () => String }) type: string,
    @Args('status', { type: () => String }) status: string,
    @Args('user_id', { type: () => Int, nullable: true }) user_id?: number
  ) {
    return this.transactionService.create(order_id, amount, type, status, user_id);
  }

  /**
   * Met à jour le statut d'une transaction
   */
  @Mutation(() => FinancialTransaction)
  updateFinancialTransactionStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => String }) status: string
  ) {
    return this.transactionService.updateStatus(id, status);
  }

  /**
   * Supprime une transaction
   */
  @Mutation(() => FinancialTransaction)
  removeFinancialTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.remove(id);
  }
}
