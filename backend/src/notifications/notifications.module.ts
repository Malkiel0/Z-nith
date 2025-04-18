// Module Notifications pour WebSocket admin (Socket.io + NestJS)
import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service'; // Service pour historique notifications
import { PrismaService } from '../prisma.service';


@Module({
  providers: [NotificationsGateway, NotificationsService, PrismaService],
  exports: [NotificationsGateway, NotificationsService, PrismaService],
})

export class NotificationsModule {}
