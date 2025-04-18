// cart.model.ts
// Modèle GraphQL Cart pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CartItem } from '../cart_item/cart_item.model';

@ObjectType()
export class Cart {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  user_id?: number;

  @Field({ nullable: true })
  session_id?: string;

  @Field(() => [CartItem], { nullable: true })
  items?: CartItem[];
}
