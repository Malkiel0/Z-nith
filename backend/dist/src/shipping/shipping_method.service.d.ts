import { PrismaService } from '../prisma.service';
import { ShippingMethod } from '@prisma/client';
export declare class ShippingMethodService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ShippingMethod[]>;
    findOne(id: number): Promise<ShippingMethod | null>;
    create(data: Omit<ShippingMethod, 'id'>): Promise<ShippingMethod>;
    update(id: number, data: Partial<ShippingMethod>): Promise<ShippingMethod>;
    remove(id: number): Promise<ShippingMethod>;
}
