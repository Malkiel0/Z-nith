// product_attribute.resolver.ts
// Résolveur GraphQL pour ProductAttribute (attributs dynamiques des produits)
// Clean code, structuré, très commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttribute } from './product_attribute.model';

@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
  constructor(private readonly attributeService: ProductAttributeService) {}

  /**
   * Liste tous les attributs
   */
  @Query(() => [ProductAttribute], { name: 'productAttributes' })
  findAll() {
    return this.attributeService.findAll();
  }

  /**
   * Récupère un attribut par son ID
   */
  @Query(() => ProductAttribute, { name: 'productAttribute', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attributeService.findOne(id);
  }

  /**
   * Crée un nouvel attribut
   */
  @Mutation(() => ProductAttribute)
  createProductAttribute(@Args('name') name: string) {
    return this.attributeService.create(name);
  }

  /**
   * Met à jour un attribut
   */
  @Mutation(() => ProductAttribute)
  updateProductAttribute(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string
  ) {
    return this.attributeService.update(id, name);
  }

  /**
   * Supprime un attribut
   */
  @Mutation(() => ProductAttribute)
  removeProductAttribute(@Args('id', { type: () => Int }) id: number) {
    return this.attributeService.remove(id);
  }
}
