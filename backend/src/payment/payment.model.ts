// payment.model.ts
// Modèle GraphQL Payment pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  method: string; // ex : "card", "paypal", "mobile_money", etc.

  @Field(() => String)
  status: string; // ex : "pending", "paid", "failed", etc.

  @Field(() => String)
  transaction_id: string;

  @Field(() => String)
  created_at: Date;
}
