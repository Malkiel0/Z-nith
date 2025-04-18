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
exports.ProductAttributeValueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductAttributeValueService = class ProductAttributeValueService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(attribute_id) {
        return this.prisma.productAttributeValue.findMany({ where: { attribute_id } });
    }
    async findOne(id) {
        return this.prisma.productAttributeValue.findUnique({ where: { id } });
    }
    async create(attribute_id, value) {
        return this.prisma.productAttributeValue.create({ data: { attribute_id, value } });
    }
    async update(id, value) {
        return this.prisma.productAttributeValue.update({ where: { id }, data: { value } });
    }
    async remove(id) {
        return this.prisma.productAttributeValue.delete({ where: { id } });
    }
};
exports.ProductAttributeValueService = ProductAttributeValueService;
exports.ProductAttributeValueService = ProductAttributeValueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductAttributeValueService);
//# sourceMappingURL=product_attribute_value.service.js.map