import { OrderService } from './order.service';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    findOne(id: number): Promise<null>;
    findAll(user_id?: number, session_id?: string): Promise<never[]>;
    createOrderFromCart(cart_id: number, status?: string): Promise<null>;
    updateOrderStatus(id: number, status: string): Promise<null>;
    removeOrder(id: number): Promise<null>;
}
