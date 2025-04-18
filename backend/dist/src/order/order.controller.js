"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrderController = class OrderController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateOrderStatus(id, body, req) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('Token manquant');
        }
        const token = authHeader.replace('Bearer ', '');
        let payload;
        try {
            const jwt = require('jsonwebtoken');
            payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        }
        catch {
            throw new common_1.BadRequestException('Token invalide');
        }
        if (payload?.role !== 'admin') {
            throw new common_1.BadRequestException('Accès réservé à l’admin');
        }
        if (!body.status)
            throw new common_1.BadRequestException('Statut manquant');
        const order = await this.prisma.order.update({ where: { id: parseInt(id) }, data: { status: body.status } });
        return { success: true, order };
    }
    async refundOrder(id, req) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('Token manquant');
        }
        const token = authHeader.replace('Bearer ', '');
        let payload;
        try {
            const jwt = require('jsonwebtoken');
            payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        }
        catch {
            throw new common_1.BadRequestException('Token invalide');
        }
        if (payload?.role !== 'admin') {
            throw new common_1.BadRequestException('Accès réservé à l’admin');
        }
        const order = await this.prisma.order.update({ where: { id: parseInt(id) }, data: { status: 'refunded', payment_status: 'refunded' } });
        await this.prisma.payment.updateMany({ where: { order_id: parseInt(id) }, data: { status: 'refunded' } });
        return { success: true, order };
    }
    async getMyOrders(req) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('Token manquant');
        }
        const token = authHeader.replace('Bearer ', '');
        let payload;
        try {
            const jwt = require('jsonwebtoken');
            payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        }
        catch (e) {
            throw new common_1.BadRequestException('Token invalide');
        }
        const userId = payload?.sub ? parseInt(payload.sub) : null;
        if (!userId) {
            throw new common_1.BadRequestException('Utilisateur non authentifié');
        }
        const orders = await this.prisma.order.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            include: {
                items: { include: { product: true } },
            },
        });
        return { orders };
    }
    async createOrder(body) {
        if (!body.name || !body.address || !body.city || !body.postal || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
            throw new common_1.BadRequestException('Champs obligatoires manquants.');
        }
        const shipping = await this.prisma.shippingAddress.create({
            data: {
                user: { connect: { id: 1 } },
                full_name: body.name,
                phone: body.phone || '',
                address: body.address,
                city: body.city,
                country: 'France',
                postal_code: body.postal,
            },
        });
        const totalAmount = body.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const order = await this.prisma.order.create({
            data: {
                user: { connect: { id: 1 } },
                status: 'pending',
                total_amount: totalAmount,
                commission_amount: 0,
                payment_method: 'pending',
                payment_status: 'pending',
                items: {
                    create: body.items.map(i => ({
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
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Post)(':id/refund'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "refundOrder", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderController);
//# sourceMappingURL=order.controller.js.map