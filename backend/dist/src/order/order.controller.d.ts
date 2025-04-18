import { PrismaService } from '../prisma.service';
export declare class OrderController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateOrderStatus(id: string, body: {
        status: string;
    }, req: any): Promise<{
        success: boolean;
        order: {
            id: number;
            status: string;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            total_amount: number;
            commission_amount: number;
            payment_method: string;
            payment_status: string;
        };
    }>;
    refundOrder(id: string, req: any): Promise<{
        success: boolean;
        order: {
            id: number;
            status: string;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            total_amount: number;
            commission_amount: number;
            payment_method: string;
            payment_status: string;
        };
    }>;
    getMyOrders(req: any): Promise<{
        orders: ({
            items: ({
                product: {
                    id: number;
                    name: string;
                    created_at: Date;
                    updated_at: Date;
                    type: string;
                    slug: string;
                    description: string;
                    image_url: string | null;
                    price: number;
                    discount_price: number | null;
                    stock_quantity: number;
                    sku: string;
                    is_active: boolean;
                };
            } & {
                id: number;
                product_id: number;
                variant_id: number | null;
                quantity: number;
                unit_price: number;
                order_id: number;
                subtotal: number;
            })[];
        } & {
            id: number;
            status: string;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            total_amount: number;
            commission_amount: number;
            payment_method: string;
            payment_status: string;
        })[];
    }>;
    createOrder(body: any): Promise<{
        success: boolean;
        order: {
            items: {
                id: number;
                product_id: number;
                variant_id: number | null;
                quantity: number;
                unit_price: number;
                order_id: number;
                subtotal: number;
            }[];
        } & {
            id: number;
            status: string;
            created_at: Date;
            updated_at: Date;
            user_id: number;
            total_amount: number;
            commission_amount: number;
            payment_method: string;
            payment_status: string;
        };
    }>;
}
