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
exports.ProductAttributeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductAttributeService = class ProductAttributeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.productAttribute.findMany({ include: { values: true } });
    }
    async findOne(id) {
        return this.prisma.productAttribute.findUnique({ where: { id }, include: { values: true } });
    }
    async create(name) {
        return this.prisma.productAttribute.create({ data: { name } });
    }
    async update(id, name) {
        return this.prisma.productAttribute.update({ where: { id }, data: { name } });
    }
    async remove(id) {
        return this.prisma.productAttribute.delete({ where: { id } });
    }
};
exports.ProductAttributeService = ProductAttributeService;
exports.ProductAttributeService = ProductAttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductAttributeService);
//# sourceMappingURL=product_attribute.service.js.map