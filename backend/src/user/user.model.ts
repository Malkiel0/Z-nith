// user.model.ts
// Définition du modèle GraphQL User pour Zénith
// Clean code, structuré, commenté

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  role: string;

  @Field()
  status: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
