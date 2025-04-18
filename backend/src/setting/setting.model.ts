// Modèle GraphQL et Prisma pour les paramètres globaux (Setting)
// Clean code, commentaires détaillés, extensible

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Setting {
  @Field(() => Int)
  id: number;

  @Field()
  shopName: string;

  @Field()
  email: string;

  @Field()
  currency: string;

  @Field()
  theme: string;

  @Field()
  maintenance: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
