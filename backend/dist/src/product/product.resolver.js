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
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_service_1 = require("./product.service");
const product_model_1 = require("./product.model");
const product_variant_model_1 = require("../product_variant/product_variant.model");
let ProductResolver = class ProductResolver {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    findAll() {
        return this.productService.findAll();
    }
    findOne(id) {
        return this.productService.findOne(id);
    }
    createProduct(name, slug, description, price, discount_price, type, stock_quantity, sku, is_active, image_url) {
        return this.productService.create({
            name,
            slug,
            description,
            price,
            discount_price,
            type,
            stock_quantity,
            sku,
            is_active,
            image_url: image_url ?? null,
        });
    }
    updateProduct(id, data) {
        return this.productService.update(id, JSON.parse(data));
    }
    removeProduct(id) {
        return this.productService.remove(id);
    }
    addVariant(productId, name, price, stock_quantity, sku) {
        return this.productService.addVariant(productId, {
            name,
            price,
            stock_quantity,
            sku
        });
    }
    getVariants(productId) {
        return this.productService.getVariants(productId);
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.Product], { name: 'products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => product_model_1.Product, { name: 'product', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.Product),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('slug')),
    __param(2, (0, graphql_1.Args)('description')),
    __param(3, (0, graphql_1.Args)('price', { type: () => Number })),
    __param(4, (0, graphql_1.Args)('discount_price', { type: () => Number, nullable: true })),
    __param(5, (0, graphql_1.Args)('type')),
    __param(6, (0, graphql_1.Args)('stock_quantity', { type: () => graphql_1.Int })),
    __param(7, (0, graphql_1.Args)('sku')),
    __param(8, (0, graphql_1.Args)('is_active')),
    __param(9, (0, graphql_1.Args)('image_url', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number, String, Number, String, Boolean, Object]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.Product),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_model_1.Product),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "removeProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_variant_model_1.ProductVariant),
    __param(0, (0, graphql_1.Args)('productId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('name')),
    __param(2, (0, graphql_1.Args)('price', { type: () => Number })),
    __param(3, (0, graphql_1.Args)('stock_quantity', { type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "addVariant", null);
__decorate([
    (0, graphql_1.Query)(() => [product_variant_model_1.ProductVariant], { name: 'productVariants' }),
    __param(0, (0, graphql_1.Args)('productId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "getVariants", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_model_1.Product),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map