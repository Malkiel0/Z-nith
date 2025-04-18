import { PrismaService } from '../prisma.service';
import { OrderItem } from '@prisma/client';
export declare class OrderItemService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(order_id: number): Promise<OrderItem[]>;
    findOne(id: number): Promise<OrderItem | null>;
    update(id: number, data: Partial<OrderItem>): Promise<OrderItem>;
    remove(id: number): Promise<OrderItem>;
}
