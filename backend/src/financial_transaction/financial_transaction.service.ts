// financial_transaction.service.ts
// Service pour la gestion des transactions financières (FinancialTransaction)
// Clean code, structuré, ultra commenté

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FinancialTransaction } from '@prisma/client';

@Injectable()
export class FinancialTransactionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les transactions d'une commande
   */
  async findAll(order_id: number): Promise<FinancialTransaction[]> {
    return this.prisma.financialTransaction.findMany({ where: { order_id } });
  }

  /**
   * Récupère une transaction par son ID
   */
  async findOne(id: number): Promise<FinancialTransaction | null> {
    return this.prisma.financialTransaction.findUnique({ where: { id } });
  }

  /**
   * Crée une transaction financière
   */
  async create(order_id: number, amount: number, type: string, status: string, user_id?: number): Promise<FinancialTransaction> {
    // Le champ transaction_id n'existe pas dans le modèle Prisma
    return this.prisma.financialTransaction.create({ data: { order_id, amount, type, status, user_id } });
  }

  /**
   * Met à jour le statut d'une transaction
   */
  async updateStatus(id: number, status: string): Promise<FinancialTransaction> {
    return this.prisma.financialTransaction.update({ where: { id }, data: { status } });
  }

  /**
   * Supprime une transaction
   */
  async remove(id: number): Promise<FinancialTransaction> {
    return this.prisma.financialTransaction.delete({ where: { id } });
  }
}
