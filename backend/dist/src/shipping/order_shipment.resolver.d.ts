import { OrderShipmentService } from './order_shipment.service';
export declare class OrderShipmentResolver {
    private readonly orderShipmentService;
    constructor(orderShipmentService: OrderShipmentService);
    findAll(order_id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    } | null>;
    createOrderShipment(data: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    }>;
    updateOrderShipment(id: number, data: string): Promise<{
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    }>;
    removeOrderShipment(id: number): Promise<{
        id: number;
        status: string;
        order_id: number;
        shipping_method_id: number;
        tracking_number: string | null;
        shipped_at: Date | null;
        delivered_at: Date | null;
    }>;
}
