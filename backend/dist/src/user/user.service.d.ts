import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(data: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role?: string;
        status?: string;
    }): Promise<User>;
    updateAvatar(userId: number, file: any): Promise<string>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void>;
    updateProfile(userId: number, data: {
        name: string;
        email: string;
    }): Promise<User>;
}
