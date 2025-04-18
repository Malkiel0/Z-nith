import { PrismaService } from '../prisma.service';
import { FinancialTransaction } from '@prisma/client';
export declare class FinancialTransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(order_id: number): Promise<FinancialTransaction[]>;
    findOne(id: number): Promise<FinancialTransaction | null>;
    create(order_id: number, amount: number, type: string, status: string, user_id?: number): Promise<FinancialTransaction>;
    updateStatus(id: number, status: string): Promise<FinancialTransaction>;
    remove(id: number): Promise<FinancialTransaction>;
}
