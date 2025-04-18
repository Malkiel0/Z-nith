import { PrismaService } from '../prisma.service';
import { CartItem } from '@prisma/client';
export declare class CartItemService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(cart_id: number): Promise<CartItem[]>;
    addOrUpdate(cart_id: number, product_id: number, variant_id: number | null, quantity: number, unit_price: number): Promise<CartItem>;
    updateQuantity(id: number, quantity: number): Promise<CartItem>;
    remove(id: number): Promise<CartItem>;
}
