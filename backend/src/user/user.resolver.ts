// user.resolver.ts
// Résolveur GraphQL pour le modèle User
// Clean code, structuré, commenté

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Récupère tous les utilisateurs
   */
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Récupère un utilisateur par son ID
   */
  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }
}
