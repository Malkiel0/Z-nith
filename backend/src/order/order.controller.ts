// Contrôleur de commande Zénith (Nest.js)
// Route POST /order/create pour créer une commande depuis le frontend
// Clean code, structuré, ultra commenté, respecte la base de données
import { Body, Controller, Post, Get, Patch, Req, Param, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('order')
export class OrderController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * PATCH /order/:id/status
   * Change le statut d'une commande (admin seulement)
   * Body: { status }
   */
  @Patch(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() body: { status: string }, @Req() req: any) {
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
    if (!body.status) throw new BadRequestException('Statut manquant');
    const order = await this.prisma.order.update({ where: { id: parseInt(id) }, data: { status: body.status } });
    return { success: true, order };
  }

  /**
   * POST /order/:id/refund
   * Rembourse une commande (statut = refunded, admin seulement)
   */
  @Post(':id/refund')
  async refundOrder(@Param('id') id: string, @Req() req: any) {
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
    // Met à jour le statut de la commande et des paiements liés
    const order = await this.prisma.order.update({ where: { id: parseInt(id) }, data: { status: 'refunded', payment_status: 'refunded' } });
    await this.prisma.payment.updateMany({ where: { order_id: parseInt(id) }, data: { status: 'refunded' } });
    return { success: true, order };
  }

  /**
   * Récupère l’historique des commandes du client connecté (GET /order/my)
   * Pour la démo, user_id = 1 (à remplacer par l’id de l’utilisateur authentifié)
   */
  @Get('my')
  async getMyOrders(@Req() req: any) {
    // Extraction du JWT depuis le header Authorization
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Token manquant');
    }
    const token = authHeader.replace('Bearer ', '');
    // Décoder le JWT (utilise la même clé que NextAuth)
    let payload: any;
    try {
      const jwt = require('jsonwebtoken');
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (e) {
      throw new BadRequestException('Token invalide');
    }
    const userId = payload?.sub ? parseInt(payload.sub) : null;
    if (!userId) {
      throw new BadRequestException('Utilisateur non authentifié');
    }
    // Récupérer les commandes de l’utilisateur authentifié
    const orders = await this.prisma.order.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: {
        items: { include: { product: true } },
      },
    });
    return { orders };
  }

  /**
   * Crée une commande à partir des infos client et du panier
   * Expects: { name, address, city, postal, phone, items: [{ id, name, price, quantity }] }
   */
  @Post('create')
  async createOrder(@Body() body: any) {
    // Validation basique des champs
    if (!body.name || !body.address || !body.city || !body.postal || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      throw new BadRequestException('Champs obligatoires manquants.');
    }
    // Création de l'adresse de livraison
    // À adapter si l'utilisateur est connecté : ici user_id = 1 (démo)
    const shipping = await this.prisma.shippingAddress.create({
      data: {
        user: { connect: { id: 1 } }, // TODO: récupérer l'id utilisateur connecté
        full_name: body.name,
        phone: body.phone || '',
        address: body.address,
        city: body.city,
        country: 'France', // À rendre dynamique si besoin
        postal_code: body.postal,
      },
    });

    // Création de la commande principale
    const totalAmount = (body.items as Array<{ price: number; quantity: number }> ).reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await this.prisma.order.create({
      data: {
        user: { connect: { id: 1 } }, // TODO: récupérer l'id utilisateur connecté
        status: 'pending',
        total_amount: totalAmount,
        commission_amount: 0,
        payment_method: 'pending',
        payment_status: 'pending',
        items: {
          create: (body.items as Array<{ id: number; quantity: number; price: number }>).map(i => ({
            product: { connect: { id: i.id } },
            quantity: i.quantity,
            unit_price: i.price,
            subtotal: i.price * i.quantity,
          })),
        },
      },
      include: { items: true },
    });
    return { success: true, order };
  }
}
