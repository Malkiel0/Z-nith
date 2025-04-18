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
exports.ProductAttributeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_attribute_service_1 = require("./product_attribute.service");
const product_attribute_model_1 = require("./product_attribute.model");
let ProductAttributeResolver = class ProductAttributeResolver {
    attributeService;
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    findAll() {
        return this.attributeService.findAll();
    }
    findOne(id) {
        return this.attributeService.findOne(id);
    }
    createProductAttribute(name) {
        return this.attributeService.create(name);
    }
    updateProductAttribute(id, name) {
        return this.attributeService.update(id, name);
    }
    removeProductAttribute(id) {
        return this.attributeService.remove(id);
    }
};
exports.ProductAttributeResolver = ProductAttributeResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_attribute_model_1.ProductAttribute], { name: 'productAttributes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductAttributeResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => product_attribute_model_1.ProductAttribute, { name: 'productAttribute', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAttributeResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_model_1.ProductAttribute),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductAttributeResolver.prototype, "createProductAttribute", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_model_1.ProductAttribute),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProductAttributeResolver.prototype, "updateProductAttribute", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_model_1.ProductAttribute),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAttributeResolver.prototype, "removeProductAttribute", null);
exports.ProductAttributeResolver = ProductAttributeResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_attribute_model_1.ProductAttribute),
    __metadata("design:paramtypes", [product_attribute_service_1.ProductAttributeService])
], ProductAttributeResolver);
//# sourceMappingURL=product_attribute.resolver.js.map