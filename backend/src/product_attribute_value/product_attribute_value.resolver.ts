// product_attribute_value.resolver.ts
// Résolveur GraphQL pour ProductAttributeValue (valeurs dynamiques des attributs)
// Clean code, structuré, très commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValue } from './product_attribute_value.model';

@Resolver(() => ProductAttributeValue)
export class ProductAttributeValueResolver {
  constructor(private readonly valueService: ProductAttributeValueService) {}

  /**
   * Liste toutes les valeurs pour un attribut
   */
  @Query(() => [ProductAttributeValue], { name: 'productAttributeValuesByAttribute' })
  findAll(@Args('attribute_id', { type: () => Int }) attribute_id: number) {
    return this.valueService.findAll(attribute_id);
  }

  /**
   * Récupère une valeur par son ID
   */
  @Query(() => ProductAttributeValue, { name: 'productAttributeValue', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.valueService.findOne(id);
  }

  /**
   * Crée une nouvelle valeur pour un attribut
   */
  @Mutation(() => ProductAttributeValue)
  createProductAttributeValue(
    @Args('attribute_id', { type: () => Int }) attribute_id: number,
    @Args('value') value: string
  ) {
    return this.valueService.create(attribute_id, value);
  }

  /**
   * Met à jour une valeur
   */
  @Mutation(() => ProductAttributeValue)
  updateProductAttributeValue(
    @Args('id', { type: () => Int }) id: number,
    @Args('value') value: string
  ) {
    return this.valueService.update(id, value);
  }

  /**
   * Supprime une valeur
   */
  @Mutation(() => ProductAttributeValue)
  removeProductAttributeValue(@Args('id', { type: () => Int }) id: number) {
    return this.valueService.remove(id);
  }
}
