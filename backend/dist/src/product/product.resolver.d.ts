import { ProductService } from './product.service';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        slug: string;
        description: string;
        image_url: string | null;
        price: number;
        discount_price: number | null;
        stock_quantity: number;
        sku: string;
        is_active: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        slug: string;
        description: string;
        image_url: string | null;
        price: number;
        discount_price: number | null;
        stock_quantity: number;
        sku: string;
        is_active: boolean;
    } | null>;
    createProduct(name: string, slug: string, description: string, price: number, discount_price: number, type: string, stock_quantity: number, sku: string, is_active: boolean, image_url: string | null): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        slug: string;
        description: string;
        image_url: string | null;
        price: number;
        discount_price: number | null;
        stock_quantity: number;
        sku: string;
        is_active: boolean;
    }>;
    updateProduct(id: number, data: string): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        slug: string;
        description: string;
        image_url: string | null;
        price: number;
        discount_price: number | null;
        stock_quantity: number;
        sku: string;
        is_active: boolean;
    }>;
    removeProduct(id: number): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        slug: string;
        description: string;
        image_url: string | null;
        price: number;
        discount_price: number | null;
        stock_quantity: number;
        sku: string;
        is_active: boolean;
    }>;
    addVariant(productId: number, name: string, price: number, stock_quantity: number, sku: string): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }>;
    getVariants(productId: number): Promise<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
        sku: string;
        product_id: number;
    }[]>;
}
