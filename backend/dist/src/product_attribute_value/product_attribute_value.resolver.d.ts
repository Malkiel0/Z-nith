import { ProductAttributeValueService } from './product_attribute_value.service';
export declare class ProductAttributeValueResolver {
    private readonly valueService;
    constructor(valueService: ProductAttributeValueService);
    findAll(attribute_id: number): Promise<{
        id: number;
        attribute_id: number;
        value: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        attribute_id: number;
        value: string;
    } | null>;
    createProductAttributeValue(attribute_id: number, value: string): Promise<{
        id: number;
        attribute_id: number;
        value: string;
    }>;
    updateProductAttributeValue(id: number, value: string): Promise<{
        id: number;
        attribute_id: number;
        value: string;
    }>;
    removeProductAttributeValue(id: number): Promise<{
        id: number;
        attribute_id: number;
        value: string;
    }>;
}
