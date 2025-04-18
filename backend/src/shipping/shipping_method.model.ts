// shipping_method.model.ts
// Modèle GraphQL ShippingMethod pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ShippingMethod {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  estimated_delay: string; // ex : "48h", "3-5 jours", etc.
}
