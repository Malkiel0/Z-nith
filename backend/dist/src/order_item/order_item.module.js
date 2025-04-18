"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModule = void 0;
const common_1 = require("@nestjs/common");
const order_item_service_1 = require("./order_item.service");
const order_item_resolver_1 = require("./order_item.resolver");
const prisma_service_1 = require("../prisma.service");
let OrderItemModule = class OrderItemModule {
};
exports.OrderItemModule = OrderItemModule;
exports.OrderItemModule = OrderItemModule = __decorate([
    (0, common_1.Module)({
        providers: [order_item_service_1.OrderItemService, order_item_resolver_1.OrderItemResolver, prisma_service_1.PrismaService],
    })
], OrderItemModule);
//# sourceMappingURL=order_item.module.js.map