import { PrismaService } from '../prisma.service';
import { ProductVariant } from '@prisma/client';
export declare class ProductVariantService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(product_id: number): Promise<ProductVariant[]>;
    findOne(id: number): Promise<ProductVariant | null>;
    create(product_id: number, data: Omit<ProductVariant, 'id' | 'product_id'>): Promise<ProductVariant>;
    update(id: number, data: Partial<ProductVariant>): Promise<ProductVariant>;
    remove(id: number): Promise<ProductVariant>;
}
