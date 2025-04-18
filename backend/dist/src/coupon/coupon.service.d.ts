import { PrismaService } from '../prisma.service';
import { Coupon } from '@prisma/client';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllActive(): Promise<Coupon[]>;
    findByCode(code: string): Promise<Coupon | null>;
    create(data: Omit<Coupon, 'id' | 'used_count'>): Promise<Coupon>;
    update(id: number, data: Partial<Coupon>): Promise<Coupon>;
    remove(id: number): Promise<Coupon>;
}
