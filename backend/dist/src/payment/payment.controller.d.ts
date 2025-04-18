import { PaymentService } from './payment.service';
import { Request } from 'express';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    findAll(order_id: string, req: Request & {
        user?: any;
    }): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    } | null>;
    create(body: {
        order_id: number;
        amount: number;
        method: string;
        status: string;
        transaction_id: string;
    }): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
}
