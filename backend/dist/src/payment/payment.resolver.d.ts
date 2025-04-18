import { PaymentService } from './payment.service';
export declare class PaymentResolver {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    findAll(order_id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    } | null>;
    createPayment(order_id: number, amount: number, method: string, status: string, transaction_id: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
    updatePaymentStatus(id: number, status: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
    removePayment(id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        amount: number;
        method: string;
        transaction_id: string;
        paid_at: Date | null;
    }>;
}
