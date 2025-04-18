"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const setting_module_1 = require("./setting/setting.module");
const config_1 = require("@nestjs/config");
const notifications_module_1 = require("./notifications/notifications.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma.service");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const product_variant_module_1 = require("./product_variant/product_variant.module");
const product_attribute_module_1 = require("./product_attribute/product_attribute.module");
const product_attribute_value_module_1 = require("./product_attribute_value/product_attribute_value.module");
const cart_module_1 = require("./cart/cart.module");
const cart_item_module_1 = require("./cart_item/cart_item.module");
const order_module_1 = require("./order/order.module");
const order_item_module_1 = require("./order_item/order_item.module");
const payment_module_1 = require("./payment/payment.module");
const shipping_address_module_1 = require("./shipping/shipping_address.module");
const shipping_method_module_1 = require("./shipping/shipping_method.module");
const order_shipment_module_1 = require("./shipping/order_shipment.module");
const commission_module_1 = require("./commission/commission.module");
const coupon_module_1 = require("./coupon/coupon.module");
const return_module_1 = require("./return/return.module");
const financial_transaction_module_1 = require("./financial_transaction/financial_transaction.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            setting_module_1.SettingModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            notifications_module_1.NotificationsModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: true,
                debug: true,
            }),
            user_module_1.UserModule,
            product_module_1.ProductModule,
            product_variant_module_1.ProductVariantModule,
            product_attribute_module_1.ProductAttributeModule,
            product_attribute_value_module_1.ProductAttributeValueModule,
            cart_module_1.CartModule,
            cart_item_module_1.CartItemModule,
            order_module_1.OrderModule,
            order_item_module_1.OrderItemModule,
            payment_module_1.PaymentModule,
            shipping_address_module_1.ShippingAddressModule,
            shipping_method_module_1.ShippingMethodModule,
            order_shipment_module_1.OrderShipmentModule,
            commission_module_1.CommissionModule,
            coupon_module_1.CouponModule,
            return_module_1.ReturnModule,
            financial_transaction_module_1.FinancialTransactionModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map