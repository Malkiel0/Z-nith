// product_attribute_value.model.ts
// Modèle GraphQL ProductAttributeValue pour Zénith
// Clean code, structuré, commenté, sans enum

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductAttributeValue {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  attribute_id: number;

  @Field()
  value: string;
}
