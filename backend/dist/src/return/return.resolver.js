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
exports.ReturnResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const return_service_1 = require("./return.service");
const return_model_1 = require("./return.model");
let ReturnResolver = class ReturnResolver {
    returnService;
    constructor(returnService) {
        this.returnService = returnService;
    }
    findAll(order_id) {
        return this.returnService.findAll(order_id);
    }
    findOne(id) {
        return this.returnService.findOne(id);
    }
    createReturn(order_id, user_id, reason, status, refund_amount) {
        return this.returnService.create(order_id, user_id, reason, status, refund_amount);
    }
    updateReturn(id, data) {
        return this.returnService.update(id, JSON.parse(data));
    }
    removeReturn(id) {
        return this.returnService.remove(id);
    }
};
exports.ReturnResolver = ReturnResolver;
__decorate([
    (0, graphql_1.Query)(() => [return_model_1.Return], { name: 'returns' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => return_model_1.Return, { name: 'return', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => return_model_1.Return),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('reason', { type: () => String })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String })),
    __param(4, (0, graphql_1.Args)('refund_amount', { type: () => graphql_1.Float })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Number]),
    __metadata("design:returntype", void 0)
], ReturnResolver.prototype, "createReturn", null);
__decorate([
    (0, graphql_1.Mutation)(() => return_model_1.Return),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ReturnResolver.prototype, "updateReturn", null);
__decorate([
    (0, graphql_1.Mutation)(() => return_model_1.Return),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReturnResolver.prototype, "removeReturn", null);
exports.ReturnResolver = ReturnResolver = __decorate([
    (0, graphql_1.Resolver)(() => return_model_1.Return),
    __metadata("design:paramtypes", [return_service_1.ReturnService])
], ReturnResolver);
//# sourceMappingURL=return.resolver.js.map