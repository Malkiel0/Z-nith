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
exports.ProductVariantResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_variant_service_1 = require("./product_variant.service");
const product_variant_model_1 = require("./product_variant.model");
let ProductVariantResolver = class ProductVariantResolver {
    variantService;
    constructor(variantService) {
        this.variantService = variantService;
    }
    findAll(product_id) {
        return this.variantService.findAll(product_id);
    }
    findOne(id) {
        return this.variantService.findOne(id);
    }
    createProductVariant(product_id, name, price, stock_quantity, sku) {
        return this.variantService.create(product_id, { name, price, stock_quantity, sku });
    }
    updateProductVariant(id, data) {
        return this.variantService.update(id, JSON.parse(data));
    }
    removeProductVariant(id) {
        return this.variantService.remove(id);
    }
};
exports.ProductVariantResolver = ProductVariantResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_variant_model_1.ProductVariant], { name: 'productVariantsByProduct' }),
    __param(0, (0, graphql_1.Args)('product_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductVariantResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => product_variant_model_1.ProductVariant, { name: 'productVariant', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductVariantResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_variant_model_1.ProductVariant),
    __param(0, (0, graphql_1.Args)('product_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('name')),
    __param(2, (0, graphql_1.Args)('price', { type: () => Number })),
    __param(3, (0, graphql_1.Args)('stock_quantity', { type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], ProductVariantResolver.prototype, "createProductVariant", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_variant_model_1.ProductVariant),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProductVariantResolver.prototype, "updateProductVariant", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_variant_model_1.ProductVariant),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductVariantResolver.prototype, "removeProductVariant", null);
exports.ProductVariantResolver = ProductVariantResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_variant_model_1.ProductVariant),
    __metadata("design:paramtypes", [product_variant_service_1.ProductVariantService])
], ProductVariantResolver);
//# sourceMappingURL=product_variant.resolver.js.map