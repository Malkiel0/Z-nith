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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async findOne(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async createUser(data) {
        const bcrypt = await Promise.resolve().then(() => require('bcrypt'));
        const hashed = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
                phone: data.phone,
                role: data.role || 'client',
                status: data.status || 'active',
            },
        });
    }
    async updateAvatar(userId, file) {
        if (!file)
            throw new Error('Aucun fichier envoyé.');
        const fs = await Promise.resolve().then(() => require('fs'));
        const path = await Promise.resolve().then(() => require('path'));
        const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
        if (!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, { recursive: true });
        const ext = path.extname(file.originalname || file.name || '');
        const filename = `avatar_${userId}_${Date.now()}${ext}`;
        const filepath = path.join(uploadDir, filename);
        if (file.buffer) {
            fs.writeFileSync(filepath, file.buffer);
        }
        else if (file.data) {
            fs.writeFileSync(filepath, file.data);
        }
        else {
            throw new Error('Format de fichier non supporté.');
        }
        const avatarUrl = `/uploads/avatars/${filename}`;
        await this.prisma.user.update({
            where: { id: userId },
            data: { avatar: avatarUrl },
        });
        return avatarUrl;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new Error('Utilisateur introuvable.');
        const bcrypt = await Promise.resolve().then(() => require('bcrypt'));
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid)
            throw new Error('Mot de passe actuel incorrect.');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
    }
    async updateProfile(userId, data) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing && existing.id !== userId) {
            throw new Error('Cet email est déjà utilisé par un autre compte.');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                email: data.email,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map