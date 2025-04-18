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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma.service");
let AuthController = class AuthController {
    userService;
    prisma;
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async login(body) {
        const user = await this.userService.findByEmail(body.email);
        if (!user)
            throw new common_1.BadRequestException('Email ou mot de passe incorrect');
        const bcrypt = await Promise.resolve().then(() => require('bcrypt'));
        const valid = await bcrypt.compare(body.password, user.password);
        if (!valid)
            throw new common_1.BadRequestException('Email ou mot de passe incorrect');
        const { password, ...safeUser } = user;
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.NEXTAUTH_SECRET, { expiresIn: '7d' });
        return { ...safeUser, accessToken: token };
    }
    async register(body) {
        const exists = await this.userService.findByEmail(body.email);
        if (exists)
            throw new common_1.BadRequestException('Cet email est déjà utilisé');
        const user = await this.userService.createUser({
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
            role: 'client',
        });
        const { password, ...safeUser } = user;
        return safeUser;
    }
    async getMe(req) {
        if (!req.user) {
            throw new common_1.BadRequestException('Utilisateur non authentifié');
        }
        const { password, ...safeUser } = req.user;
        return safeUser;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(require('./jwt-auth.guard').JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService, prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map