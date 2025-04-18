import { PrismaService } from '../prisma.service';
import { OrderShipment } from '@prisma/client';
export declare class OrderShipmentService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(order_id: number): Promise<OrderShipment[]>;
    findOne(id: number): Promise<OrderShipment | null>;
    create(data: Omit<OrderShipment, 'id'>): Promise<OrderShipment>;
    update(id: number, data: Partial<OrderShipment>): Promise<OrderShipment>;
    remove(id: number): Promise<OrderShipment>;
}
