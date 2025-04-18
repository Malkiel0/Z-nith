import { PrismaService } from '../prisma.service';
import { ProductAttribute } from '@prisma/client';
export declare class ProductAttributeService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ProductAttribute[]>;
    findOne(id: number): Promise<ProductAttribute | null>;
    create(name: string): Promise<ProductAttribute>;
    update(id: number, name: string): Promise<ProductAttribute>;
    remove(id: number): Promise<ProductAttribute>;
}
