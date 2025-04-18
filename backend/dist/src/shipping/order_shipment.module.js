"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderShipmentModule = void 0;
const common_1 = require("@nestjs/common");
const order_shipment_service_1 = require("./order_shipment.service");
const order_shipment_resolver_1 = require("./order_shipment.resolver");
const prisma_service_1 = require("../prisma.service");
let OrderShipmentModule = class OrderShipmentModule {
};
exports.OrderShipmentModule = OrderShipmentModule;
exports.OrderShipmentModule = OrderShipmentModule = __decorate([
    (0, common_1.Module)({
        providers: [order_shipment_service_1.OrderShipmentService, order_shipment_resolver_1.OrderShipmentResolver, prisma_service_1.PrismaService],
    })
], OrderShipmentModule);
//# sourceMappingURL=order_shipment.module.js.map