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
exports.CouponResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const coupon_service_1 = require("./coupon.service");
const coupon_model_1 = require("./coupon.model");
let CouponResolver = class CouponResolver {
    couponService;
    constructor(couponService) {
        this.couponService = couponService;
    }
    findAllActive() {
        return this.couponService.findAllActive();
    }
    findByCode(code) {
        return this.couponService.findByCode(code);
    }
    createCoupon(data) {
        return this.couponService.create(JSON.parse(data));
    }
    updateCoupon(id, data) {
        return this.couponService.update(id, JSON.parse(data));
    }
    removeCoupon(id) {
        return this.couponService.remove(id);
    }
};
exports.CouponResolver = CouponResolver;
__decorate([
    (0, graphql_1.Query)(() => [coupon_model_1.Coupon], { name: 'activeCoupons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CouponResolver.prototype, "findAllActive", null);
__decorate([
    (0, graphql_1.Query)(() => coupon_model_1.Coupon, { name: 'couponByCode', nullable: true }),
    __param(0, (0, graphql_1.Args)('code', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CouponResolver.prototype, "findByCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => coupon_model_1.Coupon),
    __param(0, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CouponResolver.prototype, "createCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => coupon_model_1.Coupon),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CouponResolver.prototype, "updateCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => coupon_model_1.Coupon),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponResolver.prototype, "removeCoupon", null);
exports.CouponResolver = CouponResolver = __decorate([
    (0, graphql_1.Resolver)(() => coupon_model_1.Coupon),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponResolver);
//# sourceMappingURL=coupon.resolver.js.map