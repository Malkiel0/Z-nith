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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AdminController = class AdminController {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async getAllCoupons(req) {
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
        return this.prisma.coupon.findMany({
            include: {
                order_coupons: true
            },
            orderBy: { id: 'desc' }
        });
    }
    async getAllShipments(req) {
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
    async getAllTransactions(req) {
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
        return this.prisma.financialTransaction.findMany({ orderBy: { id: 'desc' } });
    }
    async getAllCommissions(req) {
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
        return this.prisma.commission.findMany({ orderBy: { id: 'desc' } });
    }
    async validateCommission(id, req) {
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
        return this.prisma.commission.update({ where: { id: Number(id) }, data: { collected: true } });
    }
    async getStats(req) {
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
    async getSalesStats(req) {
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
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toISOString().slice(0, 10);
        });
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
        const caByDay = {};
        days.forEach(d => (caByDay[d] = 0));
        orders.forEach((o) => {
            const date = o.created_at.toISOString().slice(0, 10);
            if (caByDay[date] !== undefined)
                caByDay[date] += Number(o.total_amount);
        });
        return {
            labels: days,
            data: days.map(d => caByDay[d]),
        };
    }
    async getTopProducts(req) {
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
        const top = await this.prisma.orderItem.groupBy({
            by: ['product_id'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5,
        });
        const productIds = top.map((t) => t.product_id);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true },
        });
        const labels = top.map((t) => products.find((p) => p.id === t.product_id)?.name || 'Inconnu');
        const data = top.map((t) => t._sum.quantity || 0);
        return { labels, data };
    }
    async getPaymentMethods(req) {
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
        const methods = await this.prisma.payment.groupBy({
            by: ['method'],
            _count: { method: true },
            orderBy: { _count: { method: 'desc' } },
        });
        const labels = methods.map((m) => m.method);
        const data = methods.map((m) => m._count.method);
        return { labels, data };
    }
    async getClientsEvolution(req, res) {
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
        const daysEvolution = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toISOString().slice(0, 10);
        });
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
        const clientsByDayEvolution = {};
        daysEvolution.forEach(d => (clientsByDayEvolution[d] = 0));
        clientsEvolution.forEach((c) => {
            const date = c.created_at.toISOString().slice(0, 10);
            if (clientsByDayEvolution[date] !== undefined)
                clientsByDayEvolution[date]++;
        });
        let csv = 'Date;Nouveaux clients\n';
        daysEvolution.forEach(d => {
            csv += `${d};${clientsByDayEvolution[d]}\n`;
        });
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="clients-evolution-zenith.csv"');
        res.send(csv);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('coupons'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCoupons", null);
__decorate([
    (0, common_1.Get)('shipments'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllShipments", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Get)('commissions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCommissions", null);
__decorate([
    (0, common_1.Post)('commissions/:id/validate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "validateCommission", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('sales-stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSalesStats", null);
__decorate([
    (0, common_1.Get)('top-products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('payment-methods'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPaymentMethods", null);
__decorate([
    (0, common_1.Get)('clients-evolution'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getClientsEvolution", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map