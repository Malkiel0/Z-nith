"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeModule = void 0;
const common_1 = require("@nestjs/common");
const product_attribute_service_1 = require("./product_attribute.service");
const product_attribute_resolver_1 = require("./product_attribute.resolver");
const prisma_service_1 = require("../prisma.service");
let ProductAttributeModule = class ProductAttributeModule {
};
exports.ProductAttributeModule = ProductAttributeModule;
exports.ProductAttributeModule = ProductAttributeModule = __decorate([
    (0, common_1.Module)({
        providers: [product_attribute_service_1.ProductAttributeService, product_attribute_resolver_1.ProductAttributeResolver, prisma_service_1.PrismaService],
    })
], ProductAttributeModule);
//# sourceMappingURL=product_attribute.module.js.map