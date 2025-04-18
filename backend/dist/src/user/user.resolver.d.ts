import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        role: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        avatar: string | null;
        role: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    } | null>;
}
