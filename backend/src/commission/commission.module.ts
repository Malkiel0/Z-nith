// commission.module.ts
// Module Commission pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CommissionResolver } from './commission.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CommissionService, CommissionResolver, PrismaService],
})
export class CommissionModule {}
