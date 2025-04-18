import { PrismaService } from '../prisma.service';
import { ProductAttributeValue } from '@prisma/client';
export declare class ProductAttributeValueService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(attribute_id: number): Promise<ProductAttributeValue[]>;
    findOne(id: number): Promise<ProductAttributeValue | null>;
    create(attribute_id: number, value: string): Promise<ProductAttributeValue>;
    update(id: number, value: string): Promise<ProductAttributeValue>;
    remove(id: number): Promise<ProductAttributeValue>;
}
