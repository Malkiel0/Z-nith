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
exports.ShippingAddressResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const shipping_address_service_1 = require("./shipping_address.service");
const shipping_address_model_1 = require("./shipping_address.model");
let ShippingAddressResolver = class ShippingAddressResolver {
    shippingAddressService;
    constructor(shippingAddressService) {
        this.shippingAddressService = shippingAddressService;
    }
    findAll(user_id, session_id) {
        return this.shippingAddressService.findAll(user_id, session_id);
    }
    findOne(id) {
        return this.shippingAddressService.findOne(id);
    }
    createShippingAddress(data) {
        return this.shippingAddressService.create(JSON.parse(data));
    }
    updateShippingAddress(id, data) {
        return this.shippingAddressService.update(id, JSON.parse(data));
    }
    removeShippingAddress(id) {
        return this.shippingAddressService.remove(id);
    }
};
exports.ShippingAddressResolver = ShippingAddressResolver;
__decorate([
    (0, graphql_1.Query)(() => [shipping_address_model_1.ShippingAddress], { name: 'shippingAddresses' }),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('session_id', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ShippingAddressResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => shipping_address_model_1.ShippingAddress, { name: 'shippingAddress', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingAddressResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_address_model_1.ShippingAddress),
    __param(0, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingAddressResolver.prototype, "createShippingAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_address_model_1.ShippingAddress),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ShippingAddressResolver.prototype, "updateShippingAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => shipping_address_model_1.ShippingAddress),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingAddressResolver.prototype, "removeShippingAddress", null);
exports.ShippingAddressResolver = ShippingAddressResolver = __decorate([
    (0, graphql_1.Resolver)(() => shipping_address_model_1.ShippingAddress),
    __metadata("design:paramtypes", [shipping_address_service_1.ShippingAddressService])
], ShippingAddressResolver);
//# sourceMappingURL=shipping_address.resolver.js.map