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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let PaymentService = class PaymentService {
    prisma;
    notificationsGateway;
    constructor(prisma, notificationsGateway) {
        this.prisma = prisma;
        this.notificationsGateway = notificationsGateway;
    }
    async findAll(order_id) {
        return this.prisma.payment.findMany({ where: { order_id } });
    }
    async findAllAll() {
        return this.prisma.payment.findMany();
    }
    async findAllByUser(user_id) {
        return this.prisma.payment.findMany({
            where: {
                order: { user_id },
            },
        });
    }
    async findOne(id) {
        return this.prisma.payment.findUnique({ where: { id } });
    }
    async create(order_id, amount, method, status, transaction_id) {
        const payment = await this.prisma.payment.create({ data: { order_id, amount, method, status, transaction_id } });
        this.notificationsGateway.sendAdminNotification('payment_created', `Paiement reçu pour la commande #${order_id} (${amount} €) [${method}]`, {
            payment_id: payment.id,
            order_id,
            amount,
            method,
            status,
            paidAt: payment.paid_at,
        });
        return payment;
    }
    async updateStatus(id, status) {
        return this.prisma.payment.update({ where: { id }, data: { status } });
    }
    async remove(id) {
        return this.prisma.payment.delete({ where: { id } });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], PaymentService);
//# sourceMappingURL=payment.service.js.map