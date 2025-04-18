// commission.model.ts
// Modèle GraphQL Commission pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Commission {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Boolean)
  collected: boolean;
}
