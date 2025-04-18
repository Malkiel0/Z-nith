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
exports.ShippingAddress = void 0;
const graphql_1 = require("@nestjs/graphql");
let ShippingAddress = class ShippingAddress {
    id;
    user_id;
    session_id;
    full_name;
    phone;
    address_line1;
    address_line2;
    city;
    postal_code;
    country;
};
exports.ShippingAddress = ShippingAddress;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ShippingAddress.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ShippingAddress.prototype, "session_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "full_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "address_line1", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ShippingAddress.prototype, "address_line2", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "postal_code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ShippingAddress.prototype, "country", void 0);
exports.ShippingAddress = ShippingAddress = __decorate([
    (0, graphql_1.ObjectType)()
], ShippingAddress);
//# sourceMappingURL=shipping_address.model.js.map