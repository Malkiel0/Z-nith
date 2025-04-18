// return.module.ts
// Module Return pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnResolver } from './return.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ReturnService, ReturnResolver, PrismaService],
})
export class ReturnModule {}
