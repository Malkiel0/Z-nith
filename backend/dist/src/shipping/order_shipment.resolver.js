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
exports.OrderShipmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_shipment_service_1 = require("./order_shipment.service");
const order_shipment_model_1 = require("./order_shipment.model");
let OrderShipmentResolver = class OrderShipmentResolver {
    orderShipmentService;
    constructor(orderShipmentService) {
        this.orderShipmentService = orderShipmentService;
    }
    findAll(order_id) {
        return this.orderShipmentService.findAll(order_id);
    }
    findOne(id) {
        return this.orderShipmentService.findOne(id);
    }
    createOrderShipment(data) {
        return this.orderShipmentService.create(JSON.parse(data));
    }
    updateOrderShipment(id, data) {
        return this.orderShipmentService.update(id, JSON.parse(data));
    }
    removeOrderShipment(id) {
        return this.orderShipmentService.remove(id);
    }
};
exports.OrderShipmentResolver = OrderShipmentResolver;
__decorate([
    (0, graphql_1.Query)(() => [order_shipment_model_1.OrderShipment], { name: 'orderShipments' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderShipmentResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => order_shipment_model_1.OrderShipment, { name: 'orderShipment', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderShipmentResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_shipment_model_1.OrderShipment),
    __param(0, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderShipmentResolver.prototype, "createOrderShipment", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_shipment_model_1.OrderShipment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrderShipmentResolver.prototype, "updateOrderShipment", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_shipment_model_1.OrderShipment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderShipmentResolver.prototype, "removeOrderShipment", null);
exports.OrderShipmentResolver = OrderShipmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_shipment_model_1.OrderShipment),
    __metadata("design:paramtypes", [order_shipment_service_1.OrderShipmentService])
], OrderShipmentResolver);
//# sourceMappingURL=order_shipment.resolver.js.map