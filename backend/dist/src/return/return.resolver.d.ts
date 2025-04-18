import { ReturnService } from './return.service';
export declare class ReturnResolver {
    private readonly returnService;
    constructor(returnService: ReturnService);
    findAll(order_id: number): Promise<{
        id: number;
        status: string;
        user_id: number;
        order_id: number;
        reason: string;
        refund_amount: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        user_id: number;
        order_id: number;
        reason: string;
        refund_amount: number;
    } | null>;
    createReturn(order_id: number, user_id: number, reason: string, status: string, refund_amount: number): Promise<{
        id: number;
        status: string;
        user_id: number;
        order_id: number;
        reason: string;
        refund_amount: number;
    }>;
    updateReturn(id: number, data: string): Promise<{
        id: number;
        status: string;
        user_id: number;
        order_id: number;
        reason: string;
        refund_amount: number;
    }>;
    removeReturn(id: number): Promise<{
        id: number;
        status: string;
        user_id: number;
        order_id: number;
        reason: string;
        refund_amount: number;
    }>;
}
