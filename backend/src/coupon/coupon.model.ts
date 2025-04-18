// coupon.model.ts
// Modèle GraphQL Coupon pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Coupon {
  @Field(() => Int)
  id: number;

  @Field()
  code: string;

  @Field(() => String)
  discount_type: string;

  @Field(() => Float)
  discount_value: number;

  @Field(() => Int)
  max_usage: number;

  @Field(() => Int)
  used_count: number;

  @Field(() => Date, { nullable: true })
  expires_at?: Date;

  @Field(() => Boolean)
  is_active: boolean;
}
