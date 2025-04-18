import { OrderItem } from '../order_item/order_item.model';
export declare class Order {
    id: number;
    user_id?: number;
    session_id?: string;
    total_amount: number;
    status: string;
    items?: OrderItem[];
    created_at: Date;
    updated_at: Date;
}
