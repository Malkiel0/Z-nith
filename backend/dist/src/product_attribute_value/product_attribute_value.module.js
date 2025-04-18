"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeValueModule = void 0;
const common_1 = require("@nestjs/common");
const product_attribute_value_service_1 = require("./product_attribute_value.service");
const product_attribute_value_resolver_1 = require("./product_attribute_value.resolver");
const prisma_service_1 = require("../prisma.service");
let ProductAttributeValueModule = class ProductAttributeValueModule {
};
exports.ProductAttributeValueModule = ProductAttributeValueModule;
exports.ProductAttributeValueModule = ProductAttributeValueModule = __decorate([
    (0, common_1.Module)({
        providers: [product_attribute_value_service_1.ProductAttributeValueService, product_attribute_value_resolver_1.ProductAttributeValueResolver, prisma_service_1.PrismaService],
    })
], ProductAttributeValueModule);
//# sourceMappingURL=product_attribute_value.module.js.map