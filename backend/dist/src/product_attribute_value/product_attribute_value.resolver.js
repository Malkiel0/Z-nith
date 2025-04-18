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
exports.ProductAttributeValueResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_attribute_value_service_1 = require("./product_attribute_value.service");
const product_attribute_value_model_1 = require("./product_attribute_value.model");
let ProductAttributeValueResolver = class ProductAttributeValueResolver {
    valueService;
    constructor(valueService) {
        this.valueService = valueService;
    }
    findAll(attribute_id) {
        return this.valueService.findAll(attribute_id);
    }
    findOne(id) {
        return this.valueService.findOne(id);
    }
    createProductAttributeValue(attribute_id, value) {
        return this.valueService.create(attribute_id, value);
    }
    updateProductAttributeValue(id, value) {
        return this.valueService.update(id, value);
    }
    removeProductAttributeValue(id) {
        return this.valueService.remove(id);
    }
};
exports.ProductAttributeValueResolver = ProductAttributeValueResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_attribute_value_model_1.ProductAttributeValue], { name: 'productAttributeValuesByAttribute' }),
    __param(0, (0, graphql_1.Args)('attribute_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAttributeValueResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => product_attribute_value_model_1.ProductAttributeValue, { name: 'productAttributeValue', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAttributeValueResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_value_model_1.ProductAttributeValue),
    __param(0, (0, graphql_1.Args)('attribute_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProductAttributeValueResolver.prototype, "createProductAttributeValue", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_value_model_1.ProductAttributeValue),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProductAttributeValueResolver.prototype, "updateProductAttributeValue", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_attribute_value_model_1.ProductAttributeValue),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAttributeValueResolver.prototype, "removeProductAttributeValue", null);
exports.ProductAttributeValueResolver = ProductAttributeValueResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_attribute_value_model_1.ProductAttributeValue),
    __metadata("design:paramtypes", [product_attribute_value_service_1.ProductAttributeValueService])
], ProductAttributeValueResolver);
//# sourceMappingURL=product_attribute_value.resolver.js.map