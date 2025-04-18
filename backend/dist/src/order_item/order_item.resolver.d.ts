import { OrderItemService } from './order_item.service';
export declare class OrderItemResolver {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    findAll(order_id: number): Promise<{
        id: number;
        product_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
        order_id: number;
        subtotal: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        product_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
        order_id: number;
        subtotal: number;
    } | null>;
    updateOrderItem(id: number, data: string): Promise<{
        id: number;
        product_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
        order_id: number;
        subtotal: number;
    }>;
    removeOrderItem(id: number): Promise<{
        id: number;
        product_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
        order_id: number;
        subtotal: number;
    }>;
}
