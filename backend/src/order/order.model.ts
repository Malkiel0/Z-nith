// order.model.ts
// Modèle GraphQL Order pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrderItem } from '../order_item/order_item.model';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  user_id?: number;

  @Field({ nullable: true })
  session_id?: string;

  @Field(() => Float)
  total_amount: number;

  @Field(() => String)
  status: string;

  @Field(() => [OrderItem], { nullable: true })
  items?: OrderItem[];

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
