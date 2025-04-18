// return.model.ts
// Modèle GraphQL Return pour Zénith (gestion des retours produits)
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Return {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  reason: string;

  @Field(() => String)
  status: string; // ex : "pending", "accepted", "rejected", "refunded"

  @Field(() => Float)
  refund_amount: number;
}
