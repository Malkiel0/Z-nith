// product_variant.resolver.ts
// Résolveur GraphQL pour ProductVariant
// Clean code, structuré, très commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductVariantService } from './product_variant.service';
import { ProductVariant } from './product_variant.model';

@Resolver(() => ProductVariant)
export class ProductVariantResolver {
  constructor(private readonly variantService: ProductVariantService) {}

  /**
   * Liste toutes les variantes d'un produit
   */
  @Query(() => [ProductVariant], { name: 'productVariantsByProduct' })
  findAll(@Args('product_id', { type: () => Int }) product_id: number) {
    return this.variantService.findAll(product_id);
  }

  /**
   * Récupère une variante par son ID
   */
  @Query(() => ProductVariant, { name: 'productVariant', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.variantService.findOne(id);
  }

  /**
   * Crée une variante pour un produit
   */
  @Mutation(() => ProductVariant)
  createProductVariant(
    @Args('product_id', { type: () => Int }) product_id: number,
    @Args('name') name: string,
    @Args('price', { type: () => Number }) price: number,
    @Args('stock_quantity', { type: () => Int }) stock_quantity: number,
    @Args('sku') sku: string
  ) {
    return this.variantService.create(product_id, { name, price, stock_quantity, sku });
  }

  /**
   * Met à jour une variante
   */
  @Mutation(() => ProductVariant)
  updateProductVariant(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel ProductVariant
  ) {
    return this.variantService.update(id, JSON.parse(data));
  }

  /**
   * Supprime une variante
   */
  @Mutation(() => ProductVariant)
  removeProductVariant(@Args('id', { type: () => Int }) id: number) {
    return this.variantService.remove(id);
  }
}
