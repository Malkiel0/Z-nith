import { ShippingMethodService } from './shipping_method.service';
export declare class ShippingMethodResolver {
    private readonly shippingMethodService;
    constructor(shippingMethodService: ShippingMethodService);
    findAll(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        price: number;
    } | null>;
    createShippingMethod(data: string): Promise<{
        id: number;
        name: string;
        price: number;
    }>;
    updateShippingMethod(id: number, data: string): Promise<{
        id: number;
        name: string;
        price: number;
    }>;
    removeShippingMethod(id: number): Promise<{
        id: number;
        name: string;
        price: number;
    }>;
}
