// product.model.ts
// Modèle GraphQL Product pour Zénith
// Clean code, structuré, commenté, sans enum

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ProductVariant } from '../product_variant/product_variant.model';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  discount_price?: number;

  @Field()
  type: string; // simple, variable, bundle (pas d'enum)

  @Field(() => Int)
  stock_quantity: number;

  @Field()
  sku: string;

  @Field()
  is_active: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  // Relations
  @Field(() => [ProductVariant], { nullable: true })
  variants?: ProductVariant[];
}
