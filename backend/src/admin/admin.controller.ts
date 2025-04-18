// Contrôleur Admin pour dashboard/statistiques Zénith
// Clean code, ultra commenté, sécurisé (JWT admin)
import { Controller, Get, Post, Param, Req, BadRequestException, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * GET /admin/coupons
   * Liste tous les coupons et leur utilisation (admin)
   */
  @Get('coupons')
  async getAllCoupons(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer tous les coupons avec leur nombre d'utilisations
    return this.prisma.coupon.findMany({
      include: {
        order_coupons: true
      },
      orderBy: { id: 'desc' }
    });
  }

  /**
   * GET /admin/shipments
   * Liste toutes les livraisons (OrderShipment + ShippingMethod)
   */
  @Get('shipments')
  async getAllShipments(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer toutes les livraisons avec méthode et statut
    return this.prisma.orderShipment.findMany({
      include: {
        shipping_method: true,
        order: {
          select: { id: true, user_id: true, status: true }
        }
      },
      orderBy: { id: 'desc' }
    });
  }

  /**
   * GET /admin/transactions
   * Liste toutes les transactions financières (admin)
   */
  @Get('transactions')
  async getAllTransactions(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer toutes les transactions (ordre décroissant)
    return this.prisma.financialTransaction.findMany({ orderBy: { id: 'desc' } });
  }

  /**
   * GET /admin/commissions
   * Liste toutes les commissions (admin)
   */
  @Get('commissions')
  async getAllCommissions(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer toutes les commissions (ordre décroissant)
    return this.prisma.commission.findMany({ orderBy: { id: 'desc' } });
  }

  /**
   * POST /admin/commissions/:id/validate
   * Valide une commission (collected -> true)
   */
  @Post('commissions/:id/validate')
  async validateCommission(@Param('id') id: string, @Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Mettre à jour la commission
    return this.prisma.commission.update({ where: { id: Number(id) }, data: { collected: true } });
  }

  /**
   * GET /admin/stats
   * Renvoie les statistiques globales pour le dashboard admin
   */
  @Get('stats')
  async getStats(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer les stats globales
    const orders = await this.prisma.order.count();
    const totalRevenue = await this.prisma.order.aggregate({ _sum: { total_amount: true } });
    const clients = await this.prisma.user.count({ where: { role: 'client' } });
    const ordersCompleted = await this.prisma.order.count({ where: { status: 'completed' } });
    return {
      orders,
      totalRevenue: totalRevenue._sum.total_amount || 0,
      clients,
      ordersCompleted,
    };
  }

  /**
   * GET /admin/sales-stats
   * Renvoie le CA par jour sur les 30 derniers jours pour le dashboard
   */
  @Get('sales-stats')
  async getSalesStats(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Générer les 30 derniers jours (YYYY-MM-DD)
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().slice(0, 10);
    });
    // Récupérer les commandes par jour
    const orders = await this.prisma.order.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 29)),
        },
        status: 'completed',
      },
      select: {
        created_at: true,
        total_amount: true,
      },
    });
    // Calculer le CA par jour
    const caByDay: { [date: string]: number } = {};
    days.forEach(d => (caByDay[d] = 0));
    orders.forEach((o: any) => { // TODO: Remplacer 'any' par le vrai type Order si possible
      const date = o.created_at.toISOString().slice(0, 10);
      if (caByDay[date] !== undefined) caByDay[date] += Number(o.total_amount);
    });
    return {
      labels: days,
      data: days.map(d => caByDay[d]),
    };
  }

  /**
   * GET /admin/top-products
   * Retourne les 5 produits les plus vendus (quantité totale vendue)
   */
  @Get('top-products')
  async getTopProducts(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Récupérer les 5 produits les plus vendus
    const top = await this.prisma.orderItem.groupBy({
      by: ['product_id'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });
    // Récupérer les noms des produits
    const productIds = top.map((t: any) => t.product_id); // TODO: Remplacer 'any' par le vrai type
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });
    // Associer nom et quantité
    const labels = top.map((t: any) => products.find((p: any) => p.id === t.product_id)?.name || 'Inconnu'); // TODO: Remplacer 'any' par le vrai type
    const data = top.map((t: any) => t._sum.quantity || 0); // TODO: Remplacer 'any' par le vrai type
    return { labels, data };
  }

  /**
   * GET /admin/payment-methods
   * Retourne la répartition des paiements par méthode
   */
  @Get('payment-methods')
  async getPaymentMethods(@Req() req: any) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Group by payment method
    const methods = await this.prisma.payment.groupBy({
      by: ['method'],
      _count: { method: true },
      orderBy: { _count: { method: 'desc' } },
    });
    const labels = methods.map((m: any) => m.method); // TODO: Remplacer 'any' par le vrai type
    const data = methods.map((m: any) => m._count.method); // TODO: Remplacer 'any' par le vrai type
    return { labels, data };
  }

  /**
   * GET /admin/clients-evolution
   * Retourne l’évolution du nombre de nouveaux clients par jour sur 30 jours
   */
  @Get('clients-evolution')
  async getClientsEvolution(@Req() req: any, @Res() res: Response) {
    // Vérification JWT admin
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      throw new BadRequestException('Token invalide');
    }
    if (payload?.role !== 'admin') {
      throw new BadRequestException('Accès réservé à l’admin');
    }
    // Générer les 30 derniers jours (YYYY-MM-DD)
    // Générer les 30 derniers jours (YYYY-MM-DD)
    const daysEvolution = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().slice(0, 10);
    });
    // Récupérer les clients créés sur la période
    const clientsEvolution = await this.prisma.user.findMany({
      where: {
        role: 'client',
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 29)),
        },
      },
      select: {
        created_at: true,
      },
    });
    // Compter les nouveaux clients par jour
    // Compter les nouveaux clients par jour
    const clientsByDayEvolution: { [date: string]: number } = {};
    daysEvolution.forEach(d => (clientsByDayEvolution[d] = 0));
    clientsEvolution.forEach((c: any) => { // TODO: Remplacer 'any' par le vrai type ClientEvolution
      const date = c.created_at.toISOString().slice(0, 10);
      if (clientsByDayEvolution[date] !== undefined) clientsByDayEvolution[date]++;
    });
    // Générer le CSV
    let csv = 'Date;Nouveaux clients\n';
    daysEvolution.forEach(d => {
      csv += `${d};${clientsByDayEvolution[d]}\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="clients-evolution-zenith.csv"');
    res.send(csv);
  }
}
