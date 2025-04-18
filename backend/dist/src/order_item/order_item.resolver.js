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
exports.OrderItemResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_item_service_1 = require("./order_item.service");
const order_item_model_1 = require("./order_item.model");
let OrderItemResolver = class OrderItemResolver {
    orderItemService;
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }
    findAll(order_id) {
        return this.orderItemService.findAll(order_id);
    }
    findOne(id) {
        return this.orderItemService.findOne(id);
    }
    updateOrderItem(id, data) {
        return this.orderItemService.update(id, JSON.parse(data));
    }
    removeOrderItem(id) {
        return this.orderItemService.remove(id);
    }
};
exports.OrderItemResolver = OrderItemResolver;
__decorate([
    (0, graphql_1.Query)(() => [order_item_model_1.OrderItem], { name: 'orderItems' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => order_item_model_1.OrderItem, { name: 'orderItem', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_item_model_1.OrderItem),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrderItemResolver.prototype, "updateOrderItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_item_model_1.OrderItem),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemResolver.prototype, "removeOrderItem", null);
exports.OrderItemResolver = OrderItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_item_model_1.OrderItem),
    __metadata("design:paramtypes", [order_item_service_1.OrderItemService])
], OrderItemResolver);
//# sourceMappingURL=order_item.resolver.js.map