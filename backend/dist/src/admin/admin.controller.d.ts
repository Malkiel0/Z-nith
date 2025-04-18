import { Response } from 'express';
import { PrismaService } from '../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AdminController {
    private readonly prisma;
    private readonly notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    getAllCoupons(req: any): Promise<({
        order_coupons: {
            id: number;
            order_id: number;
            coupon_id: number;
            discount_applied: number;
        }[];
    } & {
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    })[]>;
    getAllShipments(req: any): Promise<({
        order: {
            id: number;
            status: string;
            user_id: number;
        };
        shipping_method: {
            id: number;
            name: string;
            price: number;
        };
    } & {
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    })[]>;
    getAllTransactions(req: any): Promise<{
        id: number;
        status: string;
        created_at: Date;
        type: string;
        user_id: number | null;
        order_id: number | null;
        amount: number;
    }[]>;
    getAllCommissions(req: any): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    }[]>;
    validateCommission(id: string, req: any): Promise<{
        id: number;
        order_id: number;
        amount: number;
        collected: boolean;
    }>;
    getStats(req: any): Promise<{
        orders: number;
        totalRevenue: number;
        clients: number;
        ordersCompleted: number;
    }>;
    getSalesStats(req: any): Promise<{
        labels: string[];
        data: number[];
    }>;
    getTopProducts(req: any): Promise<{
        labels: string[];
        data: any[];
    }>;
    getPaymentMethods(req: any): Promise<{
        labels: any[];
        data: any[];
    }>;
    getClientsEvolution(req: any, res: Response): Promise<void>;
}
