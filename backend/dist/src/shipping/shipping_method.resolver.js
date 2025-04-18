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
exports.ShippingMethodResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const shipping_method_service_1 = require("./shipping_method.service");
const shipping_method_model_1 = require("./shipping_method.model");
let ShippingMethodResolver = class ShippingMethodResolver {
    shippingMethodService;
    constructor(shippingMethodService) {
        this.shippingMethodService = shippingMethodService;
    }
    findAll() {
        return this.shippingMethodService.findAll();
    }
    findOne(id) {
        return this.shippingMethodService.findOne(id);
    }
    createShippingMethod(data) {
        return this.shippingMethodService.create(JSON.parse(data));
    }
    updateShippingMethod(id, data) {
        return this.shippingMethodService.update(id, JSON.parse(data));
    }
    removeShippingMethod(id) {
        return this.shippingMethodService.remove(id);
    }
};
exports.ShippingMethodResolver = ShippingMethodResolver;
__decorate([
    (0, graphql_1.Query)(() => [shipping_method_model_1.ShippingMethod], { name: 'shippingMethods' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingMethodResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => shipping_method_model_1.ShippingMethod, { name: 'shippingMethod', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingMethodResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_method_model_1.ShippingMethod),
    __param(0, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingMethodResolver.prototype, "createShippingMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_method_model_1.ShippingMethod),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ShippingMethodResolver.prototype, "updateShippingMethod", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_method_model_1.ShippingMethod),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingMethodResolver.prototype, "removeShippingMethod", null);
exports.ShippingMethodResolver = ShippingMethodResolver = __decorate([
    (0, graphql_1.Resolver)(() => shipping_method_model_1.ShippingMethod),
    __metadata("design:paramtypes", [shipping_method_service_1.ShippingMethodService])
], ShippingMethodResolver);
//# sourceMappingURL=shipping_method.resolver.js.map