import { PrismaService } from '../prisma.service';
import { Return } from '@prisma/client';
export declare class ReturnService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(order_id: number): Promise<Return[]>;
    findOne(id: number): Promise<Return | null>;
    create(order_id: number, user_id: number, reason: string, status: string, refund_amount: number): Promise<Return>;
    update(id: number, data: Partial<Return>): Promise<Return>;
    remove(id: number): Promise<Return>;
}
