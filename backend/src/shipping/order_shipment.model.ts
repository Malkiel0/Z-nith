// order_shipment.model.ts
// Modèle GraphQL OrderShipment pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderShipment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Int)
  shipping_address_id: number;

  @Field(() => Int)
  shipping_method_id: number;

  @Field(() => String)
  status: string; // ex : "pending", "shipped", "delivered", "cancelled"

  @Field(() => String, { nullable: true })
  tracking_number?: string;

  @Field(() => String, { nullable: true })
  shipped_at?: Date;

  @Field(() => String, { nullable: true })
  delivered_at?: Date;
}
