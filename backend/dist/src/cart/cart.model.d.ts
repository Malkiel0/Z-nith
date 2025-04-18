import { CartItem } from '../cart_item/cart_item.model';
export declare class Cart {
    id: number;
    user_id?: number;
    session_id?: string;
    items?: CartItem[];
}
