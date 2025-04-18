import { CartService } from './cart.service';
export declare class CartResolver {
    private readonly cartService;
    constructor(cartService: CartService);
    findOne(id: number): Promise<{
        id: number;
        user_id: number | null;
        session_id: string | null;
    } | null>;
    findByUserOrSession(user_id?: number, session_id?: string): Promise<{
        id: number;
        user_id: number | null;
        session_id: string | null;
    } | null>;
    createCart(user_id?: number, session_id?: string): Promise<{
        id: number;
        user_id: number | null;
        session_id: string | null;
    }>;
    removeCart(id: number): Promise<{
        id: number;
        user_id: number | null;
        session_id: string | null;
    }>;
}
