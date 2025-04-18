// shipping_address.model.ts
// Modèle GraphQL ShippingAddress pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ShippingAddress {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  user_id?: number;

  @Field({ nullable: true })
  session_id?: string;

  @Field()
  full_name: string;

  @Field()
  phone: string;

  @Field()
  address_line1: string;

  @Field({ nullable: true })
  address_line2?: string;

  @Field()
  city: string;

  @Field()
  postal_code: string;

  @Field()
  country: string;
}
