import { CouponService } from './coupon.service';
export declare class CouponResolver {
    private readonly couponService;
    constructor(couponService: CouponService);
    findAllActive(): Promise<{
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    }[]>;
    findByCode(code: string): Promise<{
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    } | null>;
    createCoupon(data: string): Promise<{
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    }>;
    updateCoupon(id: number, data: string): Promise<{
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    }>;
    removeCoupon(id: number): Promise<{
        id: number;
        is_active: boolean;
        code: string;
        discount_type: string;
        discount_value: number;
        max_usage: number;
        used_count: number;
        expires_at: Date | null;
    }>;
}
