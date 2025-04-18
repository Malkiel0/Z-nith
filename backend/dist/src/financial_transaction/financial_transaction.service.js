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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let FinancialTransactionService = class FinancialTransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(order_id) {
        return this.prisma.financialTransaction.findMany({ where: { order_id } });
    }
    async findOne(id) {
        return this.prisma.financialTransaction.findUnique({ where: { id } });
    }
    async create(order_id, amount, type, status, user_id) {
        return this.prisma.financialTransaction.create({ data: { order_id, amount, type, status, user_id } });
    }
    async updateStatus(id, status) {
        return this.prisma.financialTransaction.update({ where: { id }, data: { status } });
    }
    async remove(id) {
        return this.prisma.financialTransaction.delete({ where: { id } });
    }
};
exports.FinancialTransactionService = FinancialTransactionService;
exports.FinancialTransactionService = FinancialTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinancialTransactionService);
//# sourceMappingURL=financial_transaction.service.js.map