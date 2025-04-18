import { ProductAttributeService } from './product_attribute.service';
export declare class ProductAttributeResolver {
    private readonly attributeService;
    constructor(attributeService: ProductAttributeService);
    findAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
    createProductAttribute(name: string): Promise<{
        id: number;
        name: string;
    }>;
    updateProductAttribute(id: number, name: string): Promise<{
        id: number;
        name: string;
    }>;
    removeProductAttribute(id: number): Promise<{
        id: number;
        name: string;
    }>;
}
