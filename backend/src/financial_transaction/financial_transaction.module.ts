// financial_transaction.module.ts
// Module FinancialTransaction pour Nest.js, clean code, structuré, commenté
import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { FinancialTransactionResolver } from './financial_transaction.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FinancialTransactionService, FinancialTransactionResolver, PrismaService],
})
export class FinancialTransactionModule {}
