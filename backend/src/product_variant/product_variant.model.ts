// product_variant.model.ts
// Modèle GraphQL ProductVariant pour Zénith
// Clean code, structuré, commenté, sans enum

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductVariant {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  product_id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock_quantity: number;

  @Field()
  sku: string;
}
