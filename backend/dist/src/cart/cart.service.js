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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id) {
        return this.prisma.cart.findUnique({ where: { id }, include: { items: true } });
    }
    async findByUserOrSession(user_id, session_id) {
        let where = {};
        if (user_id && session_id) {
            where = { OR: [{ user_id }, { session_id }] };
        }
        else if (user_id) {
            where = { user_id };
        }
        else if (session_id) {
            where = { session_id };
        }
        return this.prisma.cart.findFirst({
            where,
            include: { items: true },
        });
    }
    async create(user_id, session_id) {
        return this.prisma.cart.create({ data: { user_id, session_id } });
    }
    async remove(id) {
        return this.prisma.cart.delete({ where: { id } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map