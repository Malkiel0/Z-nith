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
exports.CommissionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const commission_service_1 = require("./commission.service");
const commission_model_1 = require("./commission.model");
let CommissionResolver = class CommissionResolver {
    commissionService;
    constructor(commissionService) {
        this.commissionService = commissionService;
    }
    findAll(order_id) {
        return this.commissionService.findAll(order_id);
    }
    findOne(id) {
        return this.commissionService.findOne(id);
    }
    createCommission(order_id, amount, collected) {
        return this.commissionService.create(order_id, amount, collected ?? false);
    }
    removeCommission(id) {
        return this.commissionService.remove(id);
    }
};
exports.CommissionResolver = CommissionResolver;
__decorate([
    (0, graphql_1.Query)(() => [commission_model_1.Commission], { name: 'commissions' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommissionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => commission_model_1.Commission, { name: 'commission', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommissionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => commission_model_1.Commission),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('amount', { type: () => graphql_1.Float })),
    __param(2, (0, graphql_1.Args)('collected', { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean]),
    __metadata("design:returntype", void 0)
], CommissionResolver.prototype, "createCommission", null);
__decorate([
    (0, graphql_1.Mutation)(() => commission_model_1.Commission),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommissionResolver.prototype, "removeCommission", null);
exports.CommissionResolver = CommissionResolver = __decorate([
    (0, graphql_1.Resolver)(() => commission_model_1.Commission),
    __metadata("design:paramtypes", [commission_service_1.CommissionService])
], CommissionResolver);
//# sourceMappingURL=commission.resolver.js.map