export declare class Coupon {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number;
    max_usage: number;
    used_count: number;
    expires_at?: Date;
    is_active: boolean;
}
