import { ProductVariant } from '../product_variant/product_variant.model';
export declare class Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discount_price?: number;
    type: string;
    stock_quantity: number;
    sku: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    variants?: ProductVariant[];
}
