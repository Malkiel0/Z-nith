"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let JwtAuthGuard = class JwtAuthGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        let authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (Array.isArray(authHeader))
            authHeader = authHeader[0];
        if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Token manquant');
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
            req.user = payload;
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Token invalide');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map