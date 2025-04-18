// product.resolver.ts
// Résolveur GraphQL pour le modèle Product
// Clean code, structuré, très commenté

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ProductVariant } from '../product_variant/product_variant.model';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * Récupère tous les produits (avec variantes)
   */
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  /**
   * Récupère un produit par son ID (avec variantes)
   */
  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  /**
   * Crée un produit
   */
  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('slug') slug: string,
    @Args('description') description: string,
    @Args('price', { type: () => Number }) price: number,
    @Args('discount_price', { type: () => Number, nullable: true }) discount_price: number,
    @Args('type') type: string,
    @Args('stock_quantity', { type: () => Int }) stock_quantity: number,
    @Args('sku') sku: string,
    @Args('is_active') is_active: boolean,
    @Args('image_url', { type: () => String, nullable: true }) image_url: string | null, // Champ optionnel, type GraphQL explicite
  ) {
    return this.productService.create({
      name,
      slug,
      description,
      price,
      discount_price,
      type,
      stock_quantity,
      sku,
      is_active,
      image_url: image_url ?? null, // Champ requis par Prisma, même si null
    });
  }

  /**
   * Met à jour un produit
   */
  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => String }) data: string // JSON.stringify d'un objet partiel Product
  ) {
    // On attend ici un string JSON pour l'update partiel
    return this.productService.update(id, JSON.parse(data));
  }

  /**
   * Supprime un produit
   */
  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }

  /**
   * Ajoute une variante à un produit
   */
  @Mutation(() => ProductVariant)
  addVariant(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('name') name: string,
    @Args('price', { type: () => Number }) price: number,
    @Args('stock_quantity', { type: () => Int }) stock_quantity: number,
    @Args('sku') sku: string
  ) {
    return this.productService.addVariant(productId, {
      name,
      price,
      stock_quantity,
      sku
    });
  }

  /**
   * Liste toutes les variantes d'un produit
   */
  @Query(() => [ProductVariant], { name: 'productVariants' })
  getVariants(@Args('productId', { type: () => Int }) productId: number) {
    return this.productService.getVariants(productId);
  }
}
