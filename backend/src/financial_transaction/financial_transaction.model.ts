// financial_transaction.model.ts
// Modèle GraphQL FinancialTransaction pour Zénith (transactions financières)
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class FinancialTransaction {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  type: string; // ex : "payment", "refund", "commission", etc.

  @Field(() => String)
  status: string; // ex : "pending", "completed", "failed"

  @Field(() => String)
  transaction_id: string;

  @Field(() => String)
  created_at: Date;
}
