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
exports.Product = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_variant_model_1 = require("../product_variant/product_variant.model");
let Product = class Product {
    id;
    name;
    slug;
    description;
    price;
    discount_price;
    type;
    stock_quantity;
    sku;
    is_active;
    created_at;
    updated_at;
    variants;
};
exports.Product = Product;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "discount_price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "stock_quantity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Product.prototype, "is_active", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => [product_variant_model_1.ProductVariant], { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
exports.Product = Product = __decorate([
    (0, graphql_1.ObjectType)()
], Product);
//# sourceMappingURL=product.model.js.map