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
exports.FinancialTransactionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const financial_transaction_service_1 = require("./financial_transaction.service");
const financial_transaction_model_1 = require("./financial_transaction.model");
let FinancialTransactionResolver = class FinancialTransactionResolver {
    transactionService;
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    findAll(order_id) {
        return this.transactionService.findAll(order_id);
    }
    findOne(id) {
        return this.transactionService.findOne(id);
    }
    createFinancialTransaction(order_id, amount, type, status, user_id) {
        return this.transactionService.create(order_id, amount, type, status, user_id);
    }
    updateFinancialTransactionStatus(id, status) {
        return this.transactionService.updateStatus(id, status);
    }
    removeFinancialTransaction(id) {
        return this.transactionService.remove(id);
    }
};
exports.FinancialTransactionResolver = FinancialTransactionResolver;
__decorate([
    (0, graphql_1.Query)(() => [financial_transaction_model_1.FinancialTransaction], { name: 'financialTransactions' }),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancialTransactionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => financial_transaction_model_1.FinancialTransaction, { name: 'financialTransaction', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancialTransactionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => financial_transaction_model_1.FinancialTransaction),
    __param(0, (0, graphql_1.Args)('order_id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('amount', { type: () => graphql_1.Float })),
    __param(2, (0, graphql_1.Args)('type', { type: () => String })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String })),
    __param(4, (0, graphql_1.Args)('user_id', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Number]),
    __metadata("design:returntype", void 0)
], FinancialTransactionResolver.prototype, "createFinancialTransaction", null);
__decorate([
    (0, graphql_1.Mutation)(() => financial_transaction_model_1.FinancialTransaction),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('status', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], FinancialTransactionResolver.prototype, "updateFinancialTransactionStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => financial_transaction_model_1.FinancialTransaction),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancialTransactionResolver.prototype, "removeFinancialTransaction", null);
exports.FinancialTransactionResolver = FinancialTransactionResolver = __decorate([
    (0, graphql_1.Resolver)(() => financial_transaction_model_1.FinancialTransaction),
    __metadata("design:paramtypes", [financial_transaction_service_1.FinancialTransactionService])
], FinancialTransactionResolver);
//# sourceMappingURL=financial_transaction.resolver.js.map