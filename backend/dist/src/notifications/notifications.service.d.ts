import { PrismaService } from '../prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createNotification({ title, message, type, targetId }: {
        title: string;
        message: string;
        type: string;
        targetId?: number;
    }): Promise<{
        id: number;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
        createdAt: Date;
    }>;
    getAdminNotifications({ onlyUnread }?: {
        onlyUnread?: boolean;
    }): Promise<{
        id: number;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
        createdAt: Date;
    }[]>;
    markAsRead(id: number): Promise<{
        id: number;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
        createdAt: Date;
    }>;
}
