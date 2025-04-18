import { PrismaService } from '../prisma.service';
import { Product, ProductVariant } from '@prisma/client';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    create(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product>;
    update(id: number, data: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<Product>;
    addVariant(productId: number, variantData: Omit<ProductVariant, 'id' | 'product_id'>): Promise<ProductVariant>;
    getVariants(productId: number): Promise<ProductVariant[]>;
}
