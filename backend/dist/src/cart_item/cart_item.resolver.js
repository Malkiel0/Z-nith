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
exports.CartItemResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cart_item_service_1 = require("./cart_item.service");
const cart_item_model_1 = require("./cart_item.model");
let CartItemResolver = class CartItemResolver {
    cartItemService;
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
    findAll(cart_id) {
        return this.cartItemService.findAll(cart_id);
    }
    addOrUpdateCartItem(cart_id, product_id, variant_id, quantity, unit_price) {
        return this.cartItemService.addOrUpdate(cart_id, product_id, variant_id, quantity, unit_price);
    }
    updateCartItemQuantity(id, quantity) {
        return this.cartItemService.updateQuantity(id, quantity);
    }
    removeCartItem(id) {
        return this.cartItemService.remove(id);
    }
};
exports.CartItemResolver = CartItemResolver;
__decorate([
    (0, graphql_1.Query)(() => [cart_item_model_1.CartItem], { name: 'cartItems' }),
    __param(0, (0, graphql_1.Args)('cart_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartItemResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_item_model_1.CartItem),
    __param(0, (0, graphql_1.Args)('cart_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('product_id', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('variant_id', { type: () => graphql_1.Int, nullable: true })),
    __param(3, (0, graphql_1.Args)('quantity', { type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)('unit_price', { type: () => graphql_1.Float })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Number, Number]),
    __metadata("design:returntype", void 0)
], CartItemResolver.prototype, "addOrUpdateCartItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_item_model_1.CartItem),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('quantity', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CartItemResolver.prototype, "updateCartItemQuantity", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_item_model_1.CartItem),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartItemResolver.prototype, "removeCartItem", null);
exports.CartItemResolver = CartItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => cart_item_model_1.CartItem),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService])
], CartItemResolver);
//# sourceMappingURL=cart_item.resolver.js.map