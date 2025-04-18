import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
export declare class AuthController {
    private readonly userService;
    private readonly prisma;
    constructor(userService: UserService, prisma: PrismaService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: any;
        id: number;
        name: string;
        email: string;
        phone: string | null;
        avatar: string | null;
        role: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    register(body: {
        name: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string | null;
        avatar: string | null;
        role: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getMe(req: any): Promise<any>;
}
