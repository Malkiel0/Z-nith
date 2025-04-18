import { ProductVariantService } from './product_variant.service';
export declare class ProductVariantResolver {
    private readonly variantService;
    constructor(variantService: ProductVariantService);
    findAll(product_id: number): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    } | null>;
    createProductVariant(product_id: number, name: string, price: number, stock_quantity: number, sku: string): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }>;
    updateProductVariant(id: number, data: string): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }>;
    removeProductVariant(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }>;
}
