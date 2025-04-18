import { PrismaService } from '../prisma.service';
import { ShippingAddress } from '@prisma/client';
export declare class ShippingAddressService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user_id?: number, session_id?: string): Promise<ShippingAddress[]>;
    findOne(id: number): Promise<ShippingAddress | null>;
    create(data: Omit<ShippingAddress, 'id'>): Promise<ShippingAddress>;
    update(id: number, data: Partial<ShippingAddress>): Promise<ShippingAddress>;
    remove(id: number): Promise<ShippingAddress>;
}
