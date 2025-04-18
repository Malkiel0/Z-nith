// payment.controller.ts
// Contrôleur REST pour la gestion des paiements (Payment)
// Clean code, structuré, ultra commenté

import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Liste les paiements de l'utilisateur connecté (ou tous si admin)
   */
  @Get()
  async findAll(@Query('order_id') order_id: string, @Req() req: Request & { user?: any }) {
    const user = req.user;
    if (!user) throw new ForbiddenException('Non authentifié');
    // Si admin, accès à tous les paiements d’une commande
    if (user.role === 'admin') {
      if (order_id && order_id !== 'all') {
        return this.paymentService.findAll(Number(order_id));
      } else {
        // Admin : tous les paiements
        return this.paymentService.findAllAll();
      }
    }
    // Client : accès uniquement à ses paiements
    return this.paymentService.findAllByUser(user.id);
  }

  /**
   * Récupère un paiement par son ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(Number(id));
  }

  /**
   * Crée un paiement pour une commande
   */
  @Post()
  async create(@Body() body: { order_id: number; amount: number; method: string; status: string; transaction_id: string }) {
    const { order_id, amount, method, status, transaction_id } = body;
    return this.paymentService.create(order_id, amount, method, status, transaction_id);
  }

  /**
   * Met à jour le statut d’un paiement
   */
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.paymentService.updateStatus(Number(id), body.status);
  }

  /**
   * Supprime un paiement
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentService.remove(Number(id));
  }
}
