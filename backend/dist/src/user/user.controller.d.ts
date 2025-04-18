import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateMe(req: Request & {
        user?: any;
    }, body: {
        name: string;
        email: string;
    }): Promise<{
        success: boolean;
        user: {
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
        };
    }>;
    changePassword(req: Request & {
        user?: any;
    }, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    updateAvatar(req: Request & {
        user?: any;
    }): Promise<{
        success: boolean;
        avatarUrl: string;
    }>;
}
