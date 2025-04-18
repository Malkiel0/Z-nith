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
        createdAt: Date;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
    }>;
    getAdminNotifications({ onlyUnread }?: {
        onlyUnread?: boolean;
    }): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
    }[]>;
    markAsRead(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        message: string;
        type: string;
        targetId: number | null;
        read: boolean;
    }>;
}
