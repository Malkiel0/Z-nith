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
exports.PaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_service_1 = require("./payment.service");
const payment_model_1 = require("./payment.model");
let PaymentResolver = class PaymentResolver {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    findAll(order_id) {
        return this.paymentService.findAll(order_id);
    }
    findOne(id) {
        return this.paymentService.findOne(id);
    }
    createPayment(order_id, amount, method, status, transaction_id) {
        return this.paymentService.create(order_id, amount, method, status, transaction_id);
    }
    updatePaymentStatus(id, status) {
        return this.paymentService.updateStatus(id, status);
    }
    removePayment(id) {
        return this.paymentService.remove(id);
    }
};
exports.PaymentResolver = PaymentResolver;
__decorate([
    (0, graphql_1.Query)(() => [payment_model_1.Payment], { name: 'payments' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => payment_model_1.Payment, { name: 'payment', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_model_1.Payment),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('amount', { type: () => graphql_1.Float })),
    __param(2, (0, graphql_1.Args)('method', { type: () => String })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String })),
    __param(4, (0, graphql_1.Args)('transaction_id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], PaymentResolver.prototype, "createPayment", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_model_1.Payment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('status', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PaymentResolver.prototype, "updatePaymentStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_model_1.Payment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentResolver.prototype, "removePayment", null);
exports.PaymentResolver = PaymentResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_model_1.Payment),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentResolver);
//# sourceMappingURL=payment.resolver.js.map