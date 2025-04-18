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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CartItemService = class CartItemService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(cart_id) {
        return this.prisma.cartItem.findMany({ where: { cart_id } });
    }
    async addOrUpdate(cart_id, product_id, variant_id, quantity, unit_price) {
        const existing = await this.prisma.cartItem.findFirst({
            where: { cart_id, product_id, variant_id },
        });
        if (existing) {
            return this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
        }
        return this.prisma.cartItem.create({ data: { cart_id, product_id, variant_id, quantity, unit_price } });
    }
    async updateQuantity(id, quantity) {
        return this.prisma.cartItem.update({ where: { id }, data: { quantity } });
    }
    async remove(id) {
        return this.prisma.cartItem.delete({ where: { id } });
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartItemService);
//# sourceMappingURL=cart_item.service.js.map