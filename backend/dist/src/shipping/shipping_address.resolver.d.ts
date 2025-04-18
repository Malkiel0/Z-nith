import { ShippingAddressService } from './shipping_address.service';
export declare class ShippingAddressResolver {
    private readonly shippingAddressService;
    constructor(shippingAddressService: ShippingAddressService);
    findAll(user_id?: number, session_id?: string): Promise<{
        id: number;
        phone: string;
        user_id: number;
        full_name: string;
        address: string;
        city: string;
        country: string;
        postal_code: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        phone: string;
        user_id: number;
        full_name: string;
        address: string;
        city: string;
        country: string;
        postal_code: string;
    } | null>;
    createShippingAddress(data: string): Promise<{
        id: number;
        phone: string;
        user_id: number;
        full_name: string;
        address: string;
        city: string;
        country: string;
        postal_code: string;
    }>;
    updateShippingAddress(id: number, data: string): Promise<{
        id: number;
        phone: string;
        user_id: number;
        full_name: string;
        address: string;
        city: string;
        country: string;
        postal_code: string;
    }>;
    removeShippingAddress(id: number): Promise<{
        id: number;
        phone: string;
        user_id: number;
        full_name: string;
        address: string;
        city: string;
        country: string;
        postal_code: string;
    }>;
}
