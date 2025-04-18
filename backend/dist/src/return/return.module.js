"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnModule = void 0;
const common_1 = require("@nestjs/common");
const return_service_1 = require("./return.service");
const return_resolver_1 = require("./return.resolver");
const prisma_service_1 = require("../prisma.service");
let ReturnModule = class ReturnModule {
};
exports.ReturnModule = ReturnModule;
exports.ReturnModule = ReturnModule = __decorate([
    (0, common_1.Module)({
        providers: [return_service_1.ReturnService, return_resolver_1.ReturnResolver, prisma_service_1.PrismaService],
    })
], ReturnModule);
//# sourceMappingURL=return.module.js.map