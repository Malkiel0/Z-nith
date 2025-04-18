// order_item.model.ts
// Modèle GraphQL OrderItem pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int, { nullable: true })
  variant_id?: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unit_price: number;
}
