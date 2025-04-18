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
exports.CartResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cart_service_1 = require("./cart.service");
const cart_model_1 = require("./cart.model");
let CartResolver = class CartResolver {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    findOne(id) {
        return this.cartService.findOne(id);
    }
    findByUserOrSession(user_id, session_id) {
        return this.cartService.findByUserOrSession(user_id, session_id);
    }
    createCart(user_id, session_id) {
        return this.cartService.create(user_id, session_id);
    }
    removeCart(id) {
        return this.cartService.remove(id);
    }
};
exports.CartResolver = CartResolver;
__decorate([
    (0, graphql_1.Query)(() => cart_model_1.Cart, { name: 'cart', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => cart_model_1.Cart, { name: 'cartByUserOrSession', nullable: true }),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('session_id', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CartResolver.prototype, "findByUserOrSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_model_1.Cart),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('session_id', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CartResolver.prototype, "createCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => cart_model_1.Cart),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartResolver.prototype, "removeCart", null);
exports.CartResolver = CartResolver = __decorate([
    (0, graphql_1.Resolver)(() => cart_model_1.Cart),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartResolver);
//# sourceMappingURL=cart.resolver.js.map