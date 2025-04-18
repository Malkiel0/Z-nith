import { PrismaService } from '../prisma.service';
import { Payment } from '@prisma/client';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class PaymentService {
    private prisma;
    private notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    findAll(order_id: number): Promise<Payment[]>;
    findAllAll(): Promise<Payment[]>;
    findAllByUser(user_id: number): Promise<Payment[]>;
    findOne(id: number): Promise<Payment | null>;
    create(order_id: number, amount: number, method: string, status: string, transaction_id: string): Promise<Payment>;
    updateStatus(id: number, status: string): Promise<Payment>;
    remove(id: number): Promise<Payment>;
}
