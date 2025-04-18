// payment.module.ts
// Module Payment pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentResolver } from './payment.resolver';
import { PrismaService } from '../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

/**
 * Déclaration du module Payment, incluant les controllers et providers nécessaires.
 * L'API est rendue accessible via le PaymentController.
 */
@Module({
  imports: [NotificationsModule], // Import du module pour permettre l'injection du gateway
  controllers: [PaymentController],
  providers: [PaymentService, PaymentResolver, PrismaService],
})
export class PaymentModule {}
