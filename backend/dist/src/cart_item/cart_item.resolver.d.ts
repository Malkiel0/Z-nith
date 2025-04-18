import { CartItemService } from './cart_item.service';
export declare class CartItemResolver {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    findAll(cart_id: number): Promise<{
        id: number;
        product_id: number;
        cart_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
    }[]>;
    addOrUpdateCartItem(cart_id: number, product_id: number, variant_id: number | null, quantity: number, unit_price: number): Promise<{
        id: number;
        product_id: number;
        cart_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
    }>;
    updateCartItemQuantity(id: number, quantity: number): Promise<{
        id: number;
        product_id: number;
        cart_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
    }>;
    removeCartItem(id: number): Promise<{
        id: number;
        product_id: number;
        cart_id: number;
        variant_id: number | null;
        quantity: number;
        unit_price: number;
    }>;
}
