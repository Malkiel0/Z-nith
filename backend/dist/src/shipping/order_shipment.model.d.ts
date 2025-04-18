export declare class OrderShipment {
    id: number;
    order_id: number;
    shipping_address_id: number;
    shipping_method_id: number;
    status: string;
    tracking_number?: string;
    shipped_at?: Date;
    delivered_at?: Date;
}
