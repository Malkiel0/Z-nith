// product_attribute.model.ts
// Modèle GraphQL ProductAttribute pour Zénith
// Clean code, structuré, commenté, sans enum

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductAttributeValue } from '../product_attribute_value/product_attribute_value.model';

@ObjectType()
export class ProductAttribute {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [ProductAttributeValue], { nullable: true })
  values?: ProductAttributeValue[];
}
