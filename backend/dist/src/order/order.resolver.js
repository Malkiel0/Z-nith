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
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_service_1 = require("./order.service");
const order_model_1 = require("./order.model");
let OrderResolver = class OrderResolver {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    findAll(user_id, session_id) {
        return this.orderService.findAll(user_id, session_id);
    }
    createOrderFromCart(cart_id, status) {
        return this.orderService.createFromCart(cart_id, status || "pending");
    }
    updateOrderStatus(id, status) {
        return this.orderService.updateStatus(id, status);
    }
    removeOrder(id) {
        return this.orderService.remove(id);
    }
};
exports.OrderResolver = OrderResolver;
__decorate([
    (0, graphql_1.Query)(() => order_model_1.Order, { name: 'order', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [order_model_1.Order], { name: 'orders' }),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('session_id', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_model_1.Order),
    __param(0, (0, graphql_1.Args)('cart_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "createOrderFromCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_model_1.Order),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('status', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "updateOrderStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_model_1.Order),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderResolver.prototype, "removeOrder", null);
exports.OrderResolver = OrderResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_model_1.Order),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
//# sourceMappingURL=order.resolver.js.map