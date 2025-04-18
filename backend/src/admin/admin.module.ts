// Module Admin pour dashboard/statistiques Zénith
// Clean code, ultra commenté
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AdminController],
  providers: [PrismaService],
})
export class AdminModule {}
