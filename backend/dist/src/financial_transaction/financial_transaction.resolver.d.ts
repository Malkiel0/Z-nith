import { FinancialTransactionService } from './financial_transaction.service';
export declare class FinancialTransactionResolver {
    private readonly transactionService;
    constructor(transactionService: FinancialTransactionService);
    findAll(order_id: number): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    } | null>;
    createFinancialTransaction(order_id: number, amount: number, type: string, status: string, user_id?: number): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    }>;
    updateFinancialTransactionStatus(id: number, status: string): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    }>;
    removeFinancialTransaction(id: number): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    }>;
}
