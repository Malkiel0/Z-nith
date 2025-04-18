import { PrismaService } from '../prisma.service';
import { Commission } from '@prisma/client';
export declare class CommissionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(order_id: number): Promise<Commission[]>;
    findOne(id: number): Promise<Commission | null>;
    create(order_id: number, amount: number, collected?: boolean): Promise<Commission>;
    remove(id: number): Promise<Commission>;
}
