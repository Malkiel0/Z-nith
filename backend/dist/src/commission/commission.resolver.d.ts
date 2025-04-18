import { CommissionService } from './commission.service';
export declare class CommissionResolver {
    private readonly commissionService;
    constructor(commissionService: CommissionService);
    findAll(order_id: number): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    } | null>;
    createCommission(order_id: number, amount: number, collected?: boolean): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    }>;
    removeCommission(id: number): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    }>;
}
