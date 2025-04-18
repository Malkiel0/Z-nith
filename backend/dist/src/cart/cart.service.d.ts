import { PrismaService } from '../prisma.service';
import { Cart } from '@prisma/client';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: number): Promise<Cart | null>;
    findByUserOrSession(user_id?: number, session_id?: string): Promise<Cart | null>;
    create(user_id?: number, session_id?: string): Promise<Cart>;
    remove(id: number): Promise<Cart>;
}
