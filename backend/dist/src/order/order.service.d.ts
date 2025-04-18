export declare class OrderService {
    findOne(id: number): Promise<null>;
    findAll(user_id?: number, session_id?: string): Promise<never[]>;
    createFromCart(cart_id: number, status: string): Promise<null>;
    updateStatus(id: number, status: string): Promise<null>;
    remove(id: number): Promise<null>;
}
